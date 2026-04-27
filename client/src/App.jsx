import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import RecordForm from './components/RecordForm';
import RecordList from './components/RecordList';
import AIChat from './components/AIChat';

const API_URL = 'http://localhost:3001/api';

export default function App() {
  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 获取记录列表
  const fetchRecords = async (query = '') => {
    try {
      const url = query ? `${API_URL}/records?q=${encodeURIComponent(query)}` : `${API_URL}/records`;
      const res = await fetch(url);
      setRecords(await res.json());
    } catch (err) {
      console.error('获取记录失败:', err);
    }
  };

  useEffect(() => { fetchRecords(); }, []);

  const handleSearch = (q) => { setSearchQuery(q); fetchRecords(q); };

  const handleAddRecord = async (newRecord) => {
    const res = await fetch(`${API_URL}/records`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecord)
    });
    if (!res.ok) throw new Error('保存失败');
    fetchRecords(searchQuery); // 刷新列表
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">知识时间流</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm flex items-center gap-2"
              >
                {showForm ? '✕ 取消' : '＋ 新增记录'}
              </button>
            </div>

            {showForm && <RecordForm onSubmit={handleAddRecord} onClose={() => setShowForm(false)} />}
            <SearchBar onSearch={handleSearch} />
            <RecordList records={records} />
            <AIChat />
          </div>
        </main>
      </div>
    </div>
  );
}