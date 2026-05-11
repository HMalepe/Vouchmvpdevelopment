import { useState } from 'react';
import { useNavigate } from 'react-router';
import { jobs } from '../../data/mockData';
import { Clock, ChevronRight, Search } from 'lucide-react';

const statusColor: Record<string, string> = {
  IN_PROGRESS: '#1D7A50',
  CONFIRMED: '#D4A853',
  COMPLETED: '#64748b',
  MATCHING: '#3b82f6',
  POSTED: '#94a3b8',
  DISPUTED: '#ef4444',
  CANCELLED: '#f87171',
  EN_ROUTE: '#8b5cf6',
};

const statusLabel: Record<string, string> = {
  IN_PROGRESS: 'In Progress',
  CONFIRMED: 'Confirmed',
  COMPLETED: 'Completed',
  MATCHING: 'Finding Match',
  POSTED: 'Posted',
  DISPUTED: 'Disputed',
  CANCELLED: 'Cancelled',
  EN_ROUTE: 'En Route',
};

const tabs = ['All', 'Active', 'Completed'];

export default function ClientBookings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = jobs.filter(j => {
    const matchSearch = j.service.toLowerCase().includes(search.toLowerCase()) || j.area.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (activeTab === 'Active') return ['IN_PROGRESS', 'CONFIRMED', 'MATCHING', 'POSTED', 'EN_ROUTE'].includes(j.status);
    if (activeTab === 'Completed') return ['COMPLETED', 'CANCELLED', 'DISPUTED'].includes(j.status);
    return true;
  });

  return (
    <div className="px-4 pt-14 pb-4">
      <div className="mb-5">
        <h1 className="text-2xl font-black" style={{ color: '#0F2B46' }}>My Jobs</h1>
        <p className="text-sm text-gray-500">{jobs.length} total bookings</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search jobs..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm outline-none"
          style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', color: '#0F2B46' }}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {tabs.map(t => (
          <button key={t}
            onClick={() => setActiveTab(t)}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: activeTab === t ? '#0F2B46' : '#fff',
              color: activeTab === t ? '#fff' : '#64748b',
              border: `1px solid ${activeTab === t ? 'transparent' : 'rgba(0,0,0,0.08)'}`,
            }}>
            {t}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📋</p>
            <p className="font-semibold" style={{ color: '#0F2B46' }}>No jobs found</p>
            <p className="text-sm text-gray-400">Try adjusting your filter</p>
          </div>
        )}
        {filtered.map(job => (
          <div key={job.id}
            onClick={() => navigate(job.status === 'IN_PROGRESS' ? '/client/job' : '#')}
            className="bg-white rounded-2xl p-4 cursor-pointer transition-all active:scale-98"
            style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: '#F5F3EE' }}>
                {job.serviceIcon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold text-sm" style={{ color: '#0F2B46' }}>{job.service}</p>
                  <ChevronRight size={14} className="text-gray-300" />
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <Clock size={11} className="text-gray-400" />
                  <p className="text-xs text-gray-400">{job.date} · {job.time} · {job.duration}hrs</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2 py-1 rounded-lg"
                    style={{ background: `${statusColor[job.status] || '#94a3b8'}15`, color: statusColor[job.status] || '#94a3b8' }}>
                    {statusLabel[job.status] || job.status}
                  </span>
                  <span className="font-black text-sm" style={{ color: '#0F2B46' }}>R{job.price}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{job.area}, {job.city}</p>
              </div>
            </div>
            {job.status === 'IN_PROGRESS' && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">In progress</span>
                  <span style={{ color: '#1D7A50' }}>60%</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100">
                  <div className="h-full rounded-full" style={{ width: '60%', background: '#1D7A50' }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
