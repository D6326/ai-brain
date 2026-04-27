export default function SearchBar({ onSearch }) {
  return (
    <div className="relative mb-6">
      <input
        type="text"
        placeholder="🔍 搜索标题或内容..."
        className="w-full px-4 py-3 pl-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}