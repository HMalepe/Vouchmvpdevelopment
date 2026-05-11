import { useNavigate } from 'react-router';
import { MapPin, Bell, Shield, Star, ChevronRight, Repeat, Clock, CheckCircle } from 'lucide-react';
import { workers, jobs, services, currentClient } from '../../data/mockData';

const savedProviders = workers.slice(0, 3);
const recentJobs = jobs.filter(j => ['COMPLETED', 'IN_PROGRESS', 'CONFIRMED'].includes(j.status)).slice(0, 2);

const trustBadges = [
  { icon: <Shield size={14} />, label: 'Protected payment', color: '#1D7A50' },
  { icon: <Star size={14} />, label: 'Verified reviews', color: '#D4A853' },
  { icon: <CheckCircle size={14} />, label: 'GPS tracked', color: '#0F2B46' },
];

const statusColor: Record<string, string> = {
  IN_PROGRESS: '#1D7A50',
  CONFIRMED: '#D4A853',
  COMPLETED: '#64748b',
  MATCHING: '#3b82f6',
  POSTED: '#94a3b8',
};

const statusLabel: Record<string, string> = {
  IN_PROGRESS: 'In Progress',
  CONFIRMED: 'Confirmed',
  COMPLETED: 'Completed',
  MATCHING: 'Finding Match',
  POSTED: 'Posted',
};

export default function ClientHome() {
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = currentClient.name.split(' ')[0];

  return (
    <div className="px-4 pt-14 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-gray-500">{greeting},</p>
          <h1 className="text-2xl font-black" style={{ color: '#0F2B46' }}>{firstName} 👋</h1>
        </div>
        <button className="relative w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm">
          <Bell size={18} style={{ color: '#0F2B46' }} />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center" style={{ background: '#D4A853', fontSize: 9 }}>2</span>
        </button>
      </div>

      {/* Location Banner */}
      <div className="flex items-center gap-2 mb-6 px-4 py-3 rounded-2xl bg-white" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
        <MapPin size={16} style={{ color: '#1D7A50' }} />
        <span className="text-sm text-gray-600">Sandton, Johannesburg</span>
        <span className="text-xs text-gray-400 ml-auto">Change</span>
      </div>

      {/* Active Job Banner */}
      {recentJobs.filter(j => j.status === 'IN_PROGRESS').map(job => (
        <div key={job.id} onClick={() => navigate('/client/job')}
          className="mb-4 px-4 py-4 rounded-2xl cursor-pointer transition-all active:scale-98"
          style={{ background: 'linear-gradient(135deg, #0F2B46 0%, #1a3d5c 100%)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#4ade80' }}>● Live Job</span>
            <ChevronRight size={14} className="text-white/60" />
          </div>
          <p className="text-white font-bold">{job.service} — {job.area}</p>
          <p className="text-white/60 text-sm mt-1">Nomsa is cleaning your home right now</p>
          <div className="mt-3 h-1.5 rounded-full bg-white/10">
            <div className="h-full rounded-full" style={{ width: '60%', background: '#1D7A50' }} />
          </div>
        </div>
      ))}

      {/* Quick Services */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold" style={{ color: '#0F2B46' }}>Book a service</h2>
          <button onClick={() => navigate('/client/book')} className="text-sm font-medium" style={{ color: '#1D7A50' }}>See all</button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {services.slice(0, 6).map(s => (
            <button key={s.id} onClick={() => navigate('/client/book')}
              className="bg-white rounded-2xl p-3 flex flex-col items-center gap-2 transition-all active:scale-95 hover:shadow-md"
              style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
              <span className="text-2xl">{s.icon}</span>
              <span className="text-xs font-semibold text-center" style={{ color: '#0F2B46' }}>{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 -mx-1 px-1">
        {trustBadges.map((b, i) => (
          <div key={i} className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full bg-white text-xs font-medium"
            style={{ border: '1px solid rgba(0,0,0,0.06)', color: b.color }}>
            <span style={{ color: b.color }}>{b.icon}</span>
            {b.label}
          </div>
        ))}
      </div>

      {/* Recent / Rebook */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold" style={{ color: '#0F2B46' }}>Recent bookings</h2>
          <button onClick={() => navigate('/client/bookings')} className="text-sm font-medium" style={{ color: '#1D7A50' }}>View all</button>
        </div>
        <div className="space-y-3">
          {recentJobs.map(job => (
            <div key={job.id} onClick={() => navigate(job.status === 'IN_PROGRESS' ? '/client/job' : '/client/bookings')}
              className="bg-white rounded-2xl p-4 cursor-pointer transition-all active:scale-98"
              style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: '#F5F3EE' }}>
                    {job.serviceIcon}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#0F2B46' }}>{job.service}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock size={11} className="text-gray-400" />
                      <p className="text-xs text-gray-400">{job.date} at {job.time}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `${statusColor[job.status]}15`, color: statusColor[job.status] }}>
                    {statusLabel[job.status]}
                  </span>
                  <span className="text-sm font-bold" style={{ color: '#0F2B46' }}>R{job.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Providers */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold" style={{ color: '#0F2B46' }}>Saved providers</h2>
          <button onClick={() => navigate('/client/providers')} className="text-sm font-medium" style={{ color: '#1D7A50' }}>Browse all</button>
        </div>
        <div className="space-y-3">
          {savedProviders.map(w => (
            <div key={w.id} onClick={() => navigate('/client/providers')}
              className="bg-white rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition-all active:scale-98"
              style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
              <img src={w.photo} alt={w.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm" style={{ color: '#0F2B46' }}>{w.name}</p>
                <p className="text-xs text-gray-500">{w.skills.slice(0, 2).join(' · ')}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={11} fill="#D4A853" className="text-[#D4A853]" />
                  <span className="text-xs font-semibold">{w.rating}</span>
                  <span className="text-xs text-gray-400">· {w.distance}</span>
                </div>
              </div>
              <button onClick={e => { e.stopPropagation(); navigate('/client/book'); }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-white text-xs font-semibold"
                style={{ background: '#1D7A50' }}>
                <Repeat size={11} /> Rebook
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
