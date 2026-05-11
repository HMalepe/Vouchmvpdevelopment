import { Outlet, useNavigate, useLocation } from 'react-router';
import { LayoutDashboard, Users, Briefcase, CreditCard, AlertTriangle } from 'lucide-react';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/workers', label: 'Workers', icon: Users },
  { path: '/admin/jobs', label: 'Jobs', icon: Briefcase },
  { path: '/admin/payments', label: 'Payments', icon: CreditCard },
  { path: '/admin/disputes', label: 'Disputes', icon: AlertTriangle },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen" style={{ background: '#F5F3EE' }}>
      {/* Top nav for admin (desktop-friendly) */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center gap-6 px-6 py-3.5"
        style={{ background: '#0F2B46', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-2 mr-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm"
            style={{ background: '#1D7A50' }}>V</div>
          <span className="text-white font-bold tracking-tight">VOUCH</span>
          <span className="text-white/30 text-xs ml-1">Admin</span>
        </div>
        <nav className="flex items-center gap-1 flex-1 overflow-x-auto">
          {navItems.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));
            return (
              <button key={path} onClick={() => navigate(path)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all flex-shrink-0"
                style={{
                  background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                  color: active ? '#fff' : 'rgba(255,255,255,0.55)',
                }}>
                <Icon size={15} />
                {label}
              </button>
            );
          })}
        </nav>
        <div className="flex items-center gap-2 text-white/60 text-xs">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Live
        </div>
      </header>

      <main className="pt-16 pb-4 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
