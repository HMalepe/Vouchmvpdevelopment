import { currentWorker, dailyBookings, payments } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, Clock, Shield, Award } from 'lucide-react';

const myPayouts = payments.filter(p => p.type === 'payout' || (p.type === 'booking' && p.status === 'held'));

export default function WorkerEarnings() {
  const weeklyData = dailyBookings.map(d => ({
    date: d.date,
    earnings: Math.round(d.revenue * 0.15), // ~15% goes to single worker
  }));

  return (
    <div className="px-4 pt-14 pb-4">
      <div className="mb-5">
        <h1 className="text-2xl font-black" style={{ color: '#0F2B46' }}>Earnings</h1>
        <p className="text-sm text-gray-500">Your payment overview</p>
      </div>

      {/* Main card */}
      <div className="rounded-3xl p-6 mb-5 text-center"
        style={{ background: 'linear-gradient(135deg, #1D7A50 0%, #0F2B46 100%)' }}>
        <p className="text-white/60 text-sm mb-1">Total earned all time</p>
        <p className="text-white text-5xl font-black mb-4">R{currentWorker.earnings.toLocaleString()}</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Today', val: `R${currentWorker.todayEarnings}`, icon: '📅' },
            { label: 'This week', val: `R${currentWorker.weekEarnings}`, icon: '📆' },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl p-3"
              style={{ background: 'rgba(255,255,255,0.12)' }}>
              <p className="text-white/60 text-xs mb-1">{s.icon} {s.label}</p>
              <p className="text-white font-black text-xl">{s.val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Platform fee note */}
      <div className="flex items-start gap-3 p-4 rounded-2xl mb-5"
        style={{ background: 'rgba(29,122,80,0.08)', border: '1px solid rgba(29,122,80,0.2)' }}>
        <Shield size={16} className="text-[#1D7A50] flex-shrink-0 mt-0.5" />
        <p className="text-xs text-gray-600">
          VOUCH charges a 10% platform fee. Payments are protected and released directly to your account within 24 hours of job completion.
        </p>
      </div>

      {/* Weekly chart */}
      <div className="bg-white rounded-2xl p-4 mb-5" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
        <p className="font-bold mb-4" style={{ color: '#0F2B46' }}>This week's earnings</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={weeklyData} barSize={18}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              formatter={(val: number) => [`R${val}`, 'Earnings']}
              contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', fontSize: 12 }}
            />
            <Bar dataKey="earnings" fill="#1D7A50" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { icon: <Award size={16} className="text-[#D4A853]" />, label: 'Jobs completed', val: currentWorker.jobsCompleted },
          { icon: <Clock size={16} className="text-[#3b82f6]" />, label: 'Avg per job', val: `R${Math.round(currentWorker.earnings / currentWorker.jobsCompleted)}` },
          { icon: <TrendingUp size={16} className="text-[#1D7A50]" />, label: 'Repeat clients', val: currentWorker.repeatClients },
          { icon: <Shield size={16} className="text-[#8b5cf6]" />, label: 'Disputes', val: 0 },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="mb-2">{s.icon}</div>
            <p className="font-black text-xl" style={{ color: '#0F2B46' }}>{s.val}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent payouts */}
      <h2 className="font-bold mb-3" style={{ color: '#0F2B46' }}>Recent payouts</h2>
      <div className="space-y-3">
        {myPayouts.map(p => (
          <div key={p.id} className="bg-white rounded-2xl p-4 flex items-center justify-between"
            style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <div>
              <p className="font-semibold text-sm" style={{ color: '#0F2B46' }}>{p.description}</p>
              <p className="text-xs text-gray-400">{p.date}</p>
            </div>
            <div className="text-right">
              <p className="font-black" style={{ color: p.status === 'released' ? '#1D7A50' : '#D4A853' }}>
                R{p.amount}
              </p>
              <p className="text-xs" style={{ color: p.status === 'released' ? '#1D7A50' : '#D4A853' }}>
                {p.status === 'released' ? 'Paid out' : 'Held'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
