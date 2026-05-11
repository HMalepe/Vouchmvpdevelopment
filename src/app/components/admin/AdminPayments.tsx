import { payments, marketplaceMetrics } from '../../data/mockData';
import { Shield, TrendingUp, Clock, DollarSign } from 'lucide-react';

const typeColor: Record<string, string> = {
  booking: '#3b82f6',
  payout: '#1D7A50',
  refund: '#8b5cf6',
  platform_fee: '#D4A853',
};

const statusColor: Record<string, string> = {
  held: '#D4A853',
  released: '#1D7A50',
  pending: '#94a3b8',
  refunded: '#8b5cf6',
};

export default function AdminPayments() {
  const totalHeld = payments.filter(p => p.status === 'held').reduce((s, p) => s + p.amount, 0);
  const totalReleased = payments.filter(p => p.status === 'released').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="px-6 py-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-black" style={{ color: '#0F2B46' }}>Payments</h1>
        <p className="text-gray-500">Escrow & payout ledger</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total GMV', val: `R${marketplaceMetrics.totalRevenue.toLocaleString()}`, icon: <DollarSign size={18} />, color: '#0F2B46' },
          { label: 'Held in escrow', val: `R${totalHeld}`, icon: <Shield size={18} />, color: '#D4A853' },
          { label: 'Released payouts', val: `R${totalReleased}`, icon: <TrendingUp size={18} />, color: '#1D7A50' },
          { label: 'Pending payouts', val: `R${marketplaceMetrics.pendingPayouts.toLocaleString()}`, icon: <Clock size={18} />, color: '#3b82f6' },
        ].map((m, i) => (
          <div key={i} className="bg-white rounded-2xl p-5" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${m.color}15`, color: m.color }}>
              {m.icon}
            </div>
            <p className="text-2xl font-black" style={{ color: '#0F2B46' }}>{m.val}</p>
            <p className="text-sm text-gray-500 mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Transactions table */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold" style={{ color: '#0F2B46' }}>All transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F5F3EE' }}>
                {['ID', 'Description', 'Type', 'Amount', 'Status', 'Date', 'Party'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.map((p, i) => (
                <tr key={p.id} style={{ borderTop: i > 0 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}
                  className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <span className="text-xs font-mono text-gray-400">#{p.id.toUpperCase()}</span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium" style={{ color: '#0F2B46' }}>{p.description}</p>
                    <p className="text-xs text-gray-400">Job {p.jobId.toUpperCase()}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2 py-1 rounded-lg text-xs font-semibold capitalize"
                      style={{ background: `${typeColor[p.type]}15`, color: typeColor[p.type] }}>
                      {p.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-black text-base" style={{ color: '#0F2B46' }}>R{p.amount}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold"
                      style={{ background: `${statusColor[p.status]}15`, color: statusColor[p.status] }}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-500">{p.date}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-xs text-gray-500">{p.worker || p.client || '—'}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
