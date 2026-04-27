import { useState } from 'react';

export default function AIChat() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true); setAnswer('');
    try {
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAnswer(data.answer);
    } catch (err) {
      setAnswer('❌ 请求失败: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-indigo-800 mb-4">💡 AI 知识问答</h2>
      <div className="flex gap-2 mb-4">
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)}
          placeholder="例如：我之前保存过什么关于 Prompt 的技巧？"
          className="flex-1 px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()} />
        <button onClick={handleAsk} disabled={loading}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
          {loading ? '思考中...' : '提问'}
        </button>
      </div>
      {answer && (
        <div className="bg-white p-4 rounded-lg border border-indigo-100 text-gray-700 whitespace-pre-wrap leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}