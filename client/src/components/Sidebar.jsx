export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-4 hidden md:block">
      <nav className="space-y-2">
        <div className="px-3 py-2 bg-white rounded-md shadow-sm text-gray-700 font-medium cursor-pointer">📥 全部记录</div>
        <div className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-md cursor-pointer transition">🏷️ 标签分类</div>
        <div className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-md cursor-pointer transition">⭐ 收藏夹</div>
        <div className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-md cursor-pointer transition">🗑️ 回收站</div>
      </nav>
      <div className="mt-8 px-3 text-xs text-gray-400">预留菜单区域<br/>后续可扩展</div>
    </aside>
  );
}