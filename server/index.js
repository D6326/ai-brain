const express = require('express');
const cors = require('cors');
const db = require('./db');
const { callAI, callAIChat } = require('./ai');

const app = express();
const path = require('path');

// 告诉 Express 去哪里找前端打包好的文件
app.use(express.static(path.join(__dirname, '../client/dist')));

// 让所有非 API 的请求都返回前端的 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 🔍 获取记录列表（支持关键词搜索）
app.get('/api/records', async (req, res) => {
  try {
    const query = req.query.q || '';
    let sql = 'SELECT * FROM records ORDER BY created_at DESC';
    let params = [];

    if (query) {
      sql = 'SELECT * FROM records WHERE title LIKE ? OR content LIKE ? ORDER BY created_at DESC';
      params = [`%${query}%`, `%${query}%`];
    }

    const rows = await db.allAsync(sql, params);
    // 解析 tags JSON 字符串
    const records = rows.map(r => ({ ...r, tags: JSON.parse(r.tags || '[]') }));
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➕ 新增记录（自动触发 AI 处理）
app.post('/api/records', async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: '标题和内容不能为空' });

  try {
    // 1. 调用 AI 生成摘要和标签
    const { summary, tags } = await callAI(content);
    
    // 2. 存入数据库
    const sql = `INSERT INTO records (title, content, summary, tags, created_at) VALUES (?, ?, ?, ?, datetime('now', 'localtime'))`;
    const info = await db.runAsync(sql, [title, content, summary, JSON.stringify(tags)]);

    res.json({
      id: info.lastID,
      title, content, summary, tags,
      created_at: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: '保存或AI处理失败: ' + err.message });
  }
});

// 💬 AI 问答接口
app.post('/api/chat', async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: '问题不能为空' });

  try {
    // 获取所有记录作为上下文
    const rows = await db.allAsync('SELECT title, content FROM records ORDER BY created_at DESC');
    const context = rows.map(r => `[${r.title}]: ${r.content}`).join('\n---\n');
    
    // 调用 AI 问答
    const answer = await callAIChat(question, context);
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: '问答失败: ' + err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ 后端服务已启动: http://localhost:${PORT}`);
});