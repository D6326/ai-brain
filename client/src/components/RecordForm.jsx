import { useState } from 'react';

export default function RecordForm({ onSubmit, onClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return alert('请填写标题和内容');
    setLoading(true);
    try {
      await onSubmit({ title, content });
      setTitle(''); setContent(''); onClose();
    } catch (err) {
      alert('保存失败: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">✨ 新增记录</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder="标题 (例如: Midjourney 提示词技巧)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        <textarea value={content} onChange={(e) => setContent(e.target.value)}
          placeholder="粘贴内容、Prompt、链接或笔记..." rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y" />
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">取消</button>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
            {loading ? 'AI处理中...' : '保存并AI分析'}
          </button>
        </div>
      </form>
    </div>
  );
}