import { useState } from 'react';
import { useNavigate } from 'react-router';
import { workers } from '../../data/mockData';
import { Star, Search, MapPin, CheckCircle, Filter } from 'lucide-react';

const LEVEL_COLOR: Record<string, string> = {
  'Trusted Pro': '#1D7A50',
  'Job Verified': '#3b82f6',
  'Reliable': '#D4A853',
  'Basic': '#94a3b8',
  'New': '#cbd5e1',
};

const SKILLS = ['All', 'Cleaning', 'Gardening', 'Ironing', 'Painting', 'Moving'];

export default function ClientProviders() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [skill, setSkill] = useState('All');

  const filtered = workers.filter(w => {
    const matchSearch = w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchSkill = skill === 'All' || w.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()));
    return matchSearch && matchSkill;
  });

  return (
    <div className="px-4 pt-14 pb-4">
      <div className="mb-5">
        <h1 className="text-2xl font-black" style={{ color: '#0F2B46' }}>Browse Providers</h1>
        <p className="text-sm text-gray-500">{workers.length} verified professionals</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or skill..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm outline-none"
          style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', color: '#0F2B46' }}
        />
      </div>

      {/* Skill filter */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1 -mx-1 px-1">
        {SKILLS.map(s => (
          <button key={s}
            onClick={() => setSkill(s)}
            className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: skill === s ? '#0F2B46' : '#fff',
              color: skill === s ? '#fff' : '#64748b',
              border: `1px solid ${skill === s ? 'transparent' : 'rgba(0,0,0,0.08)'}`,
            }}>
            {s}
          </button>
        ))}
      </div>

      {/* Provider list */}
      <div className="space-y-4">
        {filtered.map(w => (
          <div key={w.id}
            className="bg-white rounded-3xl p-5 transition-all active:scale-98"
            style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0">
                <img src={w.photo} alt={w.name} className="w-16 h-16 rounded-2xl object-cover" />
                {w.available && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#1D7A50] border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold" style={{ color: '#0F2B46' }}>{w.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Star size={11} fill="#D4A853" className="text-[#D4A853]" />
                      <span className="text-xs font-semibold">{w.rating}</span>
                      <span className="text-xs text-gray-400">({w.jobsCompleted} jobs)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-lg" style={{ color: '#0F2B46' }}>R{w.hourlyRate}</p>
                    <p className="text-xs text-gray-400">/hr</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <MapPin size={11} className="text-gray-400" />
                  <span className="text-xs text-gray-500">{w.area}, {w.city} · {w.distance}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {w.skills.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-lg text-xs font-medium"
                      style={{ background: '#F5F3EE', color: '#64748b' }}>
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1.5">
                    <div className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: `${LEVEL_COLOR[w.level] || '#94a3b8'}15`, color: LEVEL_COLOR[w.level] || '#94a3b8' }}>
                      {w.level}
                    </div>
                    {w.verificationStatus === 'approved' && (
                      <CheckCircle size={12} className="text-[#1D7A50]" />
                    )}
                  </div>
                  <button
                    onClick={() => navigate('/client/book')}
                    className="px-4 py-2 rounded-xl text-white text-xs font-bold transition-all active:scale-95"
                    style={{ background: w.available ? '#1D7A50' : '#94a3b8' }}>
                    {w.available ? 'Book Now' : 'Unavailable'}
                  </button>
                </div>
              </div>
            </div>

            {/* VouchScore */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-400">VouchScore</span>
                <span className="font-bold" style={{ color: '#0F2B46' }}>{w.vouchScore}/100</span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-100">
                <div className="h-full rounded-full"
                  style={{ width: `${w.vouchScore}%`, background: w.vouchScore >= 80 ? '#1D7A50' : w.vouchScore >= 60 ? '#D4A853' : '#94a3b8' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
