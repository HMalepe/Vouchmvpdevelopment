import { useNavigate } from 'react-router';
import { currentWorker, jobs } from '../../data/mockData';
import { Bell, ChevronRight, Clock, Shield, Star, TrendingUp, Award } from 'lucide-react';

const myJobs = jobs.filter(j => j.workerId === currentWorker.id);
const activeJob = myJobs.find(j => ['IN_PROGRESS', 'EN_ROUTE', 'CONFIRMED'].includes(j.status));

const statusColor: Record<string, string> = {
  IN_PROGRESS: '#1D7A50',
  CONFIRMED: '#D4A853',
  EN_ROUTE: '#8b5cf6',
};

export default function WorkerHome() {
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = currentWorker.name.split(' ')[0];

  return (
    <div className="px-4 pt-14 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm text-gray-500">{greeting},</p>
          <h1 className="text-2xl font-black" style={{ color: '#0F2B46' }}>{firstName} 👋</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
            style={{ background: 'rgba(29,122,80,0.1)', color: '#1D7A50' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#1D7A50] animate-pulse" />
            Available
          </div>
          <button className="relative w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm">
            <Bell size={18} style={{ color: '#0F2B46' }} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center"
              style={{ background: '#D4A853', fontSize: 9 }}>3</span>
          </button>
        </div>
      </div>

      {/* Today's earnings */}
      <div className="rounded-3xl p-5 mb-5"
        style={{ background: 'linear-gradient(135deg, #0F2B46 0%, #1a3d5c 100%)' }}>
        <p className="text-white/60 text-sm mb-1">Today's earnings</p>
        <p className="text-white text-4xl font-black mb-3">R{currentWorker.todayEarnings}</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'This week', val: `R${currentWorker.weekEarnings}` },
            { label: 'Total earned', val: `R${currentWorker.earnings.toLocaleString()}` },
            { label: 'Jobs done', val: currentWorker.jobsCompleted },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-white text-lg font-black">{s.val}</p>
              <p className="text-white/50 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* VouchScore */}
      <div className="bg-white rounded-2xl p-4 mb-5" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award size={16} className="text-[#D4A853]" />
            <p className="font-bold text-sm" style={{ color: '#0F2B46' }}>VouchScore</p>
          </div>
          <span className="font-black text-xl" style={{ color: '#1D7A50' }}>{currentWorker.vouchScore}/100</span>
        </div>
        <div className="h-2.5 rounded-full bg-gray-100 mb-3">
          <div className="h-full rounded-full" style={{ width: `${currentWorker.vouchScore}%`, background: 'linear-gradient(90deg, #1D7A50, #4ade80)' }} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Punctuality', val: `${currentWorker.punctuality}%` },
            { label: 'Repeat clients', val: currentWorker.repeatClients },
            { label: 'Vouches', val: currentWorker.vouches },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-bold text-sm" style={{ color: '#0F2B46' }}>{s.val}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active job */}
      {activeJob && (
        <div className="mb-5">
          <h2 className="font-bold mb-3" style={{ color: '#0F2B46' }}>Active job</h2>
          <div className="rounded-2xl p-4 cursor-pointer transition-all active:scale-98"
            style={{ background: '#0F2B46' }}
            onClick={() => navigate('/worker/jobs')}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold" style={{ color: '#4ade80' }}>● In Progress</span>
              <ChevronRight size={14} className="text-white/50" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{activeJob.serviceIcon}</span>
              <div>
                <p className="text-white font-bold">{activeJob.service}</p>
                <p className="text-white/60 text-sm">{activeJob.area} · {activeJob.time}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-white font-black">R{activeJob.price}</p>
                <p className="text-white/50 text-xs">{activeJob.duration}hrs</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick stats */}
      <div className="mb-5">
        <h2 className="font-bold mb-3" style={{ color: '#0F2B46' }}>Your stats</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: <Star size={18} fill="#D4A853" className="text-[#D4A853]" />, label: 'Rating', val: currentWorker.rating, sub: `from ${currentWorker.jobsCompleted} reviews` },
            { icon: <TrendingUp size={18} className="text-[#1D7A50]" />, label: 'Level', val: currentWorker.level, sub: 'Verification status' },
            { icon: <Shield size={18} className="text-[#3b82f6]" />, label: 'Cancellations', val: currentWorker.cancellations, sub: 'All time' },
            { icon: <Clock size={18} className="text-[#8b5cf6]" />, label: 'Punctuality', val: `${currentWorker.punctuality}%`, sub: 'On-time rate' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-4" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="mb-2">{s.icon}</div>
              <p className="font-black text-lg" style={{ color: '#0F2B46' }}>{s.val}</p>
              <p className="text-xs font-medium text-gray-600">{s.label}</p>
              <p className="text-xs text-gray-400">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Find jobs CTA */}
      <button onClick={() => navigate('/worker/jobs')}
        className="w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-95"
        style={{ background: '#D4A853', color: '#0F2B46', boxShadow: '0 4px 16px rgba(212,168,83,0.35)' }}>
        Browse available jobs
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
