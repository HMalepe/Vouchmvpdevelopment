import { payments } from '../../data/mockData';
import { Shield, TrendingUp, Clock } from 'lucide-react';

const typeColor: Record<string, string> = {
  booking: '#3b82f6',
  payout: '#1D7A50',
  refund: '#8b5cf6',
  platform_fee: '#94a3b8',
};

const statusColor: Record<string, string> = {
  held: '#D4A853',
  released: '#1D7A50',
  pending: '#94a3b8',
  refunded: '#8b5cf6',
};

const typeLabel: Record<string, string> = {
  booking: 'Payment Held',
  payout: 'Payout',
  refund: 'Refund',
  platform_fee: 'Platform Fee',
};

export default function ClientPayments() {
  const totalSpent = payments.filter(p => p.type === 'booking' && p.status !== 'refunded').reduce((s, p) => s + p.amount, 0);
  const held = payments.filter(p => p.status === 'held').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="px-4 pt-14 pb-4">
      <div className="mb-5">
        <h1 className="text-2xl font-black" style={{ color: '#0F2B46' }}>Payments</h1>
        <p className="text-sm text-gray-500">Transaction history</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="rounded-2xl p-4 bg-white" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
          <TrendingUp size={18} className="mb-2 text-[#1D7A50]" />
          <p className="text-2xl font-black" style={{ color: '#0F2B46' }}>R{totalSpent}</p>
          <p className="text-xs text-gray-500 mt-1">Total spent</p>
        </div>
        <div className="rounded-2xl p-4 bg-white" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
          <Clock size={18} className="mb-2 text-[#D4A853]" />
          <p className="text-2xl font-black" style={{ color: '#0F2B46' }}>R{held}</p>
          <p className="text-xs text-gray-500 mt-1">Held in escrow</p>
        </div>
      </div>

      {/* Protection notice */}
      <div className="flex items-center gap-3 p-4 rounded-2xl mb-6"
        style={{ background: 'rgba(29,122,80,0.08)', border: '1px solid rgba(29,122,80,0.2)' }}>
        <Shield size={18} className="text-[#1D7A50] flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold" style={{ color: '#1D7A50' }}>All payments are protected</p>
          <p className="text-xs text-gray-500">Funds are held securely until job completion</p>
        </div>
      </div>

      {/* Transactions */}
      <h2 className="font-bold mb-3" style={{ color: '#0F2B46' }}>Transactions</h2>
      <div className="space-y-3">
        {payments.map(p => (
          <div key={p.id} className="bg-white rounded-2xl p-4" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm" style={{ color: '#0F2B46' }}>{p.description}</p>
                <p className="text-xs text-gray-400 mt-0.5">{p.date}</p>
                {p.worker && <p className="text-xs text-gray-400">Provider: {p.worker}</p>}
                {p.client && <p className="text-xs text-gray-400">Client: {p.client}</p>}
              </div>
              <div className="text-right ml-3">
                <p className="font-black" style={{
                  color: p.type === 'payout' ? '#1D7A50' : p.type === 'refund' ? '#8b5cf6' : '#0F2B46',
                }}>
                  {p.type === 'payout' || p.type === 'refund' ? '+' : ''}R{p.amount}
                </p>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${statusColor[p.status]}15`, color: statusColor[p.status] }}>
                  {p.status}
                </span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between">
              <span className="text-xs font-medium px-2 py-0.5 rounded-lg"
                style={{ background: `${typeColor[p.type]}10`, color: typeColor[p.type] }}>
                {typeLabel[p.type]}
              </span>
              <span className="text-xs text-gray-400">#{p.jobId.toUpperCase()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
