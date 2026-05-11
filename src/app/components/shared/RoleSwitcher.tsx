import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../data/mockData';
import { ChevronDown, X, Globe, User, Briefcase, LayoutDashboard } from 'lucide-react';

const roles: { role: UserRole; label: string; icon: React.ReactNode; path: string; color: string }[] = [
  { role: 'landing', label: 'Landing Page', icon: <Globe size={14} />, path: '/', color: '#64748b' },
  { role: 'client', label: 'Client App', icon: <User size={14} />, path: '/client', color: '#1D7A50' },
  { role: 'worker', label: 'Worker App', icon: <Briefcase size={14} />, path: '/worker', color: '#D4A853' },
  { role: 'admin', label: 'Admin Dashboard', icon: <LayoutDashboard size={14} />, path: '/admin', color: '#0F2B46' },
];

export function RoleSwitcher() {
  const { role, setRole } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const current = roles.find(r => r.role === role) || roles[0];

  const select = (r: typeof roles[0]) => {
    setRole(r.role);
    navigate(r.path);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-4 z-50" style={{ zIndex: 9999 }}>
      {open && (
        <div className="mb-2 rounded-2xl overflow-hidden shadow-2xl border border-white/20"
          style={{ background: '#0F2B46' }}>
          <div className="px-4 py-3 flex items-center justify-between border-b border-white/10">
            <span className="text-white/70 text-xs uppercase tracking-wider">Switch View</span>
            <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white">
              <X size={14} />
            </button>
          </div>
          {roles.map(r => (
            <button
              key={r.role}
              onClick={() => select(r)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all hover:bg-white/10"
              style={{ color: r.role === role ? r.color : 'rgba(255,255,255,0.8)' }}
            >
              <span style={{ color: r.color }}>{r.icon}</span>
              <span className="text-sm">{r.label}</span>
              {r.role === role && (
                <span className="ml-auto w-2 h-2 rounded-full" style={{ background: r.color }} />
              )}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full shadow-2xl text-white text-sm transition-transform hover:scale-105 active:scale-95"
        style={{ background: current.color, boxShadow: `0 4px 24px ${current.color}60` }}
      >
        {current.icon}
        <span>{current.label}</span>
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}
