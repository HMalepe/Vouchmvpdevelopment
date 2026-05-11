import { useState } from 'react';
import { workers } from '../../data/mockData';
import { Search, Star, Shield, CheckCircle, XCircle, Clock } from 'lucide-react';

const LEVEL_COLOR: Record<string, string> = {
  'Trusted Pro': '#1D7A50',
  'Job Verified': '#3b82f6',
  'Reliable': '#D4A853',
  'Basic': '#94a3b8',
  'New': '#cbd5e1',
};

const verifyColors: Record<string, string> = {
  approved: '#1D7A50',
  pending: '#D4A853',
  rejected: '#ef4444',
};

export default function AdminWorkers() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');

  const filtered = workers.filter(w => {
    const matchSearch = w.name.toLowerCase().includes(search.toLowerCase()) || w.area.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || w.verificationStatus === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="px-6 py-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black" style={{ color: '#0F2B46' }}>Providers</h1>
          <p className="text-gray-500">{workers.length} registered · {workers.filter(w => w.verificationStatus === 'pending').length} pending approval</p>
        </div>
        <div className="px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: '#1D7A50' }}>
          + Invite Provider
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search providers..."
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none bg-white"
            style={{ border: '1px solid rgba(0,0,0,0.08)', color: '#0F2B46' }} />
        </div>
        {(['all', 'approved', 'pending'] as const).map(f => (
          <button key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize"
            style={{
              background: filter === f ? '#0F2B46' : '#fff',
              color: filter === f ? '#fff' : '#64748b',
              border: `1px solid ${filter === f ? 'transparent' : 'rgba(0,0,0,0.08)'}`,
            }}>
            {f}
          </button>
        ))}
      </div>

      {/* Table-like grid */}
      <div className="space-y-3">
        {/* Header */}
        <div className="hidden md:grid grid-cols-7 gap-4 px-5 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          <span className="col-span-2">Provider</span>
          <span>Location</span>
          <span>Level</span>
          <span>Rating</span>
          <span>VouchScore</span>
          <span>Status</span>
        </div>

        {filtered.map(w => (
          <div key={w.id} className="bg-white rounded-2xl p-5"
            style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="md:grid md:grid-cols-7 md:gap-4 md:items-center flex flex-col gap-3">
              {/* Provider info */}
              <div className="col-span-2 flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <img src={w.photo} alt={w.name} className="w-12 h-12 rounded-full object-cover" />
                  {w.available && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#1D7A50] border-2 border-white" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: '#0F2B46' }}>{w.name}</p>
                  <p className="text-xs text-gray-400">{w.skills.slice(0, 2).join(' · ')}</p>
                  <p className="text-xs text-gray-400">{w.jobsCompleted} jobs · R{w.hourlyRate}/hr</p>
                </div>
              </div>

              {/* Location */}
              <div>
                <p className="text-sm font-medium" style={{ color: '#0F2B46' }}>{w.area}</p>
                <p className="text-xs text-gray-400">{w.city}</p>
              </div>

              {/* Level */}
              <div>
                <span className="px-2 py-1 rounded-lg text-xs font-semibold"
                  style={{ background: `${LEVEL_COLOR[w.level] || '#94a3b8'}15`, color: LEVEL_COLOR[w.level] || '#94a3b8' }}>
                  {w.level}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star size={12} fill="#D4A853" className="text-[#D4A853]" />
                <span className="text-sm font-bold" style={{ color: '#0F2B46' }}>{w.rating}</span>
              </div>

              {/* VouchScore */}
              <div>
                <p className="text-sm font-black" style={{ color: '#0F2B46' }}>{w.vouchScore}/100</p>
                <div className="h-1 rounded-full bg-gray-100 mt-1 w-16">
                  <div className="h-full rounded-full"
                    style={{ width: `${w.vouchScore}%`, background: w.vouchScore >= 80 ? '#1D7A50' : '#D4A853' }} />
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold"
                  style={{ background: `${verifyColors[w.verificationStatus]}15`, color: verifyColors[w.verificationStatus] }}>
                  {w.verificationStatus === 'approved' ? <CheckCircle size={10} /> : w.verificationStatus === 'pending' ? <Clock size={10} /> : <XCircle size={10} />}
                  {w.verificationStatus}
                </span>
                {w.verificationStatus === 'pending' && (
                  <button className="px-2 py-1 rounded-lg text-xs font-semibold text-white"
                    style={{ background: '#1D7A50' }}>
                    Approve
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
