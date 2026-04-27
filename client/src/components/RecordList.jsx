export default function RecordList({ records }) {
  if (records.length === 0) return <div className="text-center py-12 text-gray-400">暂无记录，点击右上角新增 📝</div>;

  return (
    <div className="space-y-4">
      {records.map((item) => (
        <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition duration-200">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
            <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
              {new Date(item.created_at).toLocaleString('zh-CN')}
            </span>
          </div>
          <p className="text-gray-600 mb-3 line-clamp-3 whitespace-pre-wrap">{item.content}</p>
          {item.summary && (
            <div className="bg-blue-50 text-blue-800 text-sm p-3 rounded-lg mb-3">
              <span className="font-medium">🤖 AI摘要:</span> {item.summary}
            </div>
          )}
          {item.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}