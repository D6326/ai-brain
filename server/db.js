const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 数据库文件路径（自动创建）
const DB_PATH = path.join(__dirname, 'brain.db');
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) console.error('❌ 数据库连接失败:', err.message);
  else console.log('✅ SQLite 数据库已连接');
});

// 初始化表结构
db.run(`CREATE TABLE IF NOT EXISTS records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  tags TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
  if (err) console.error('❌ 建表失败:', err.message);
});

// 封装 Promise 方法，方便 async/await 使用
db.allAsync = (sql, params = []) => new Promise((resolve, reject) => {
  db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows));
});
db.runAsync = (sql, params = []) => new Promise((resolve, reject) => {
  db.run(sql, params, function(err) { err ? reject(err) : resolve(this); });
});

module.exports = db;