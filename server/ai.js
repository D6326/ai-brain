const OpenAI = require('openai');

// 从环境变量读取 Key，保护安全
const client = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
});

/**
 * 1. 自动处理新增记录：让千问生成摘要 + 标签
 */
async function callAI(content) {
  try {
    const response = await client.chat.completions.create({
      model: "qwen-plus", // 通义千问主流模型
      messages: [
        {
          role: "system",
          content: "你是一个智能笔记助手。请为用户提供的内容生成一段100字以内的摘要，并提取3-5个简短的关键词标签。请严格按 JSON 格式返回：{\"summary\": \"...\", \"tags\": [\"...\", \"...\"]}"
        },
        { role: "user", content: content }
      ],
      response_format: { type: "json_object" } // 强制输出 JSON
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("千问摘要生成失败:", error);
    // 报错时的兜底处理，保证数据库不崩
    return { summary: content.slice(0, 50) + "...", tags: ["自动生成"] };
  }
}

/**
 * 2. AI 问答接口：基于全量记录上下文回答
 */
async function callAIChat(question, context) {
  try {
    const response = await client.chat.completions.create({
      model: "qwen-plus",
      messages: [
        {
          role: "system",
          content: `你是一个基于个人知识库的AI助手。我会给你一些笔记内容作为背景信息，请根据这些信息回答问题。如果信息中没有相关内容，请礼貌地告知。背景信息如下：\n\n${context}`
        },
        { role: "user", content: question }
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("千问对话失败:", error);
    return "🤖 抱歉，AI 大脑暂时卡壳了，请稍后再试。";
  }
}

module.exports = { callAI, callAIChat };