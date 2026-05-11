import { Outlet, useNavigate, useLocation } from 'react-router';
import { Home, Plus, ClipboardList, User, CreditCard } from 'lucide-react';

const navItems = [
  { path: '/client', label: 'Home', icon: Home },
  { path: '/client/book', label: 'Book', icon: Plus },
  { path: '/client/bookings', label: 'My Jobs', icon: ClipboardList },
  { path: '/client/payments', label: 'Payments', icon: CreditCard },
  { path: '/client/profile', label: 'Profile', icon: User },
];

export default function ClientLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center" style={{ background: '#F5F3EE' }}>
      <div className="w-full max-w-md min-h-screen flex flex-col relative" style={{ background: '#F5F3EE' }}>
        <main className="flex-1 pb-24 overflow-y-auto">
          <Outlet />
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40"
          style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 -4px 24px rgba(0,0,0,0.08)' }}>
          <div className="flex items-center justify-around px-2 py-2">
            {navItems.map(({ path, label, icon: Icon }) => {
              const active = location.pathname === path || (path !== '/client' && location.pathname.startsWith(path));
              return (
                <button key={path} onClick={() => navigate(path)}
                  className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all"
                  style={{ color: active ? '#1D7A50' : '#94a3b8' }}>
                  <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
                  <span className="text-xs font-medium">{label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
