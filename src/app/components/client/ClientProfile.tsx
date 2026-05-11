import { useNavigate } from 'react-router';
import { currentClient, jobs, reviews } from '../../data/mockData';
import { Star, Shield, Award, ChevronRight, LogOut, CreditCard, Bell, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const clientReviews = reviews.filter(r => r.type === 'worker_to_client');

export default function ClientProfile() {
  const navigate = useNavigate();
  const { setRole } = useApp();
  const completedJobs = jobs.filter(j => j.status === 'COMPLETED').length;
  const totalSpent = jobs.filter(j => j.paymentStatus === 'released').reduce((s, j) => s + j.price, 0);

  const menuItems = [
    { icon: <CreditCard size={18} />, label: 'Payment methods', sublabel: 'Visa ending 4242', action: () => {} },
    { icon: <Bell size={18} />, label: 'Notifications', sublabel: 'All notifications on', action: () => {} },
    { icon: <Lock size={18} />, label: 'Privacy & Security', sublabel: 'Account secured', action: () => {} },
    { icon: <Shield size={18} />, label: 'Trust & Safety', sublabel: 'Learn how we keep you safe', action: () => {} },
  ];

  return (
    <div className="px-4 pt-14 pb-4">
      {/* Profile header */}
      <div className="bg-white rounded-3xl p-6 mb-5 text-center" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
        <img src={currentClient.photo} alt={currentClient.name}
          className="w-20 h-20 rounded-full object-cover mx-auto mb-3" />
        <h2 className="text-xl font-black" style={{ color: '#0F2B46' }}>{currentClient.name}</h2>
        <p className="text-sm text-gray-500 mb-3">{currentClient.area}</p>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold"
          style={{ background: 'rgba(29,122,80,0.1)', color: '#1D7A50' }}>
          <Shield size={13} />
          Trust Score: {currentClient.trustScore}/100
        </div>
        <p className="text-xs text-gray-400 mt-2">Member since {currentClient.memberSince}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Jobs done', val: completedJobs, icon: '✅' },
          { label: 'Spent', val: `R${totalSpent}`, icon: '💳' },
          { label: 'Reviews', val: `${clientReviews.length}`, icon: '⭐' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-3 text-center" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <span className="text-2xl">{s.icon}</span>
            <p className="font-black text-lg mt-1" style={{ color: '#0F2B46' }}>{s.val}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Reviews received */}
      {clientReviews.length > 0 && (
        <div className="mb-5">
          <h3 className="font-bold mb-3" style={{ color: '#0F2B46' }}>Reviews from providers</h3>
          <div className="space-y-3">
            {clientReviews.map(r => (
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

      {/* Menu */}
      <div className="bg-white rounded-2xl overflow-hidden mb-5" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
        {menuItems.map((item, i) => (
          <button key={i} onClick={item.action}
            className="w-full flex items-center gap-4 px-5 py-4 text-left transition-all hover:bg-gray-50"
            style={{ borderBottom: i < menuItems.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
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

      {/* Logout */}
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
