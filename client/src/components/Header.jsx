export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🧠</span>
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">AI Brain</h1>
      </div>
      <div className="text-sm text-gray-500">个人AI知识中枢</div>
    </header>
  );
}