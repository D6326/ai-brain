/**
 * AI 伪接口模块
 * 后期只需替换此文件内的逻辑为真实 LLM API（如 OpenAI、通义千问、Kimi 等）
 */

// 1. 自动处理新增记录：生成摘要 + 标签
function callAI(content) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟 AI 分析过程
      const summary = content.length > 60 ? content.slice(0, 60) + '...' : content;
      const tags = ['AI工具', '效率提升', 'Prompt', '知识库', '灵感'].slice(0, 3 + Math.floor(Math.random() * 3));
      resolve({ summary, tags });
    }, 800); // 模拟网络延迟
  });
}

// 2. AI 问答接口：基于全量记录上下文回答
function callAIChat(question, context) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟 AI 结合知识库回答
      const answer = `🤖 AI模拟回答：\n针对你的问题“${question}”，我检索了你的知识库。\n\n📖 参考上下文片段：\n${context.slice(0, 300)}...\n\n💡 提示：当前为伪接口。替换为真实 LLM API 后，将支持真正的语义理解与精准问答。`;
      resolve(answer);
    }, 1200);
  });
}

module.exports = { callAI, callAIChat };