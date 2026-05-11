import { useNavigate } from 'react-router';
import { currentWorker, reviews } from '../../data/mockData';
import { Star, Shield, Award, ChevronRight, LogOut, Bell, Lock, Phone } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const workerReviews = reviews.filter(r => r.type === 'client_to_worker');

const LEVEL_COLOR: Record<string, string> = {
  'Trusted Pro': '#1D7A50',
  'Job Verified': '#3b82f6',
  'Reliable': '#D4A853',
  'Basic': '#94a3b8',
  'New': '#cbd5e1',
};

export default function WorkerProfile() {
  const navigate = useNavigate();
  const { setRole } = useApp();

  return (
    <div className="px-4 pt-14 pb-4">
      {/* Profile header */}
      <div className="bg-white rounded-3xl p-6 mb-5 text-center" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="relative inline-block mb-3">
          <img src={currentWorker.photo} alt={currentWorker.name}
            className="w-24 h-24 rounded-full object-cover mx-auto" />
          {currentWorker.verificationStatus === 'approved' && (
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: '#1D7A50', border: '2px solid #fff' }}>
              <Shield size={12} className="text-white" />
            </div>
          )}
        </div>
        <h2 className="text-xl font-black" style={{ color: '#0F2B46' }}>{currentWorker.name}</h2>
        <p className="text-sm text-gray-500 mb-3">{currentWorker.area}, {currentWorker.city}</p>
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="px-3 py-1.5 rounded-full text-sm font-bold"
            style={{ background: `${LEVEL_COLOR[currentWorker.level] || '#94a3b8'}15`, color: LEVEL_COLOR[currentWorker.level] || '#94a3b8' }}>
            {currentWorker.level}
          </span>
          <div className="flex items-center gap-1">
            <Star size={14} fill="#D4A853" className="text-[#D4A853]" />
            <span className="font-bold text-sm" style={{ color: '#0F2B46' }}>{currentWorker.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">{currentWorker.bio}</p>
        <div className="flex items-center justify-center gap-1 text-sm" style={{ color: '#64748b' }}>
          <Phone size={14} />
          {currentWorker.phone}
        </div>
      </div>

      {/* VouchScore card */}
      <div className="rounded-2xl p-5 mb-5"
        style={{ background: 'linear-gradient(135deg, #0F2B46 0%, #1a3d5c 100%)' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award size={18} className="text-[#D4A853]" />
            <p className="font-bold text-white">VouchScore</p>
          </div>
          <span className="text-3xl font-black" style={{ color: '#D4A853' }}>{currentWorker.vouchScore}</span>
        </div>
        <div className="h-2.5 rounded-full mb-4" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div className="h-full rounded-full" style={{ width: `${currentWorker.vouchScore}%`, background: 'linear-gradient(90deg, #D4A853, #f0c060)' }} />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Punctuality', val: `${currentWorker.punctuality}%` },
            { label: 'Repeat', val: currentWorker.repeatClients },
            { label: 'Vouches', val: currentWorker.vouches },
            { label: 'Cancels', val: currentWorker.cancellations },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-white font-black text-lg">{s.val}</p>
              <p className="text-white/50 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-2xl p-4 mb-5" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
        <p className="font-bold mb-3" style={{ color: '#0F2B46' }}>Skills & Services</p>
        <div className="flex flex-wrap gap-2">
          {currentWorker.skills.map((s, i) => (
            <span key={i} className="px-3 py-1.5 rounded-xl text-sm font-medium"
              style={{ background: '#F5F3EE', color: '#0F2B46' }}>
              {s}
            </span>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-sm">
          <span className="text-gray-500">Rate</span>
          <span className="font-bold" style={{ color: '#0F2B46' }}>R{currentWorker.hourlyRate}/hr</span>
        </div>
      </div>

      {/* Reviews */}
      {workerReviews.length > 0 && (
        <div className="mb-5">
          <h3 className="font-bold mb-3" style={{ color: '#0F2B46' }}>Client reviews</h3>
          <div className="space-y-3">
            {workerReviews.map(r => (
              <div key={r.id} className="bg-white rounded-2xl p-4" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="flex items-center gap-3 mb-2">
                  <img src={r.fromPhoto} alt={r.fromName} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#0F2B46' }}>{r.fromName}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} size={10} fill="#D4A853" className="text-[#D4A853]" />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-xs text-gray-400">{r.date}</span>
                </div>
                <p className="text-sm text-gray-600 italic">"{r.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings */}
      <div className="bg-white rounded-2xl overflow-hidden mb-5" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
        {[
          { icon: <Bell size={18} />, label: 'Notifications', sublabel: 'Push and SMS alerts on' },
          { icon: <Lock size={18} />, label: 'Privacy & Security', sublabel: 'All secure' },
          { icon: <Shield size={18} />, label: 'Safety Centre', sublabel: 'Report an incident' },
        ].map((item, i, arr) => (
          <button key={i}
            className="w-full flex items-center gap-4 px-5 py-4 text-left transition-all hover:bg-gray-50"
            style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: '#F5F3EE', color: '#0F2B46' }}>
              {item.icon}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm" style={{ color: '#0F2B46' }}>{item.label}</p>
              <p className="text-xs text-gray-400">{item.sublabel}</p>
            </div>
            <ChevronRight size={14} className="text-gray-300" />
          </button>
        ))}
      </div>

      <button
        onClick={() => { setRole('landing'); navigate('/'); }}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold transition-all active:scale-95"
        style={{ background: '#fff', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
        <LogOut size={16} />
        Sign out
      </button>
    </div>
  );
}
