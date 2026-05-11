import { marketplaceMetrics, dailyBookings, serviceBreakdown, workerLevels, jobs, disputes, safetyIncidents } from '../../data/mockData';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import { Users, Briefcase, CreditCard, AlertTriangle, TrendingUp, Activity, Shield, Clock } from 'lucide-react';

const metricCards = [
  { label: 'Total Jobs', val: marketplaceMetrics.totalJobs.toLocaleString(), sub: `${marketplaceMetrics.activeJobs} active now`, icon: <Briefcase size={20} />, color: '#1D7A50' },
  { label: 'Total Providers', val: marketplaceMetrics.totalWorkers, sub: `${marketplaceMetrics.activeWorkers} active`, icon: <Users size={20} />, color: '#3b82f6' },
  { label: 'Total Clients', val: marketplaceMetrics.totalClients, sub: 'All time', icon: <Activity size={20} />, color: '#8b5cf6' },
  { label: 'Platform Revenue', val: `R${marketplaceMetrics.platformFee.toLocaleString()}`, sub: '10% fee collected', icon: <CreditCard size={20} />, color: '#D4A853' },
  { label: 'Avg Rating', val: `${marketplaceMetrics.averageRating}★`, sub: 'Across all jobs', icon: <TrendingUp size={20} />, color: '#f59e0b' },
  { label: 'Dispute Rate', val: `${marketplaceMetrics.disputeRate}%`, sub: 'Below industry avg', icon: <AlertTriangle size={20} />, color: '#ef4444' },
];

export default function AdminHome() {
  const urgentIncidents = safetyIncidents.filter(i => i.status === 'urgent');
  const openDisputes = disputes.filter(d => d.status === 'open' || d.status === 'under_review');

  return (
    <div className="px-6 py-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-black" style={{ color: '#0F2B46' }}>Marketplace Dashboard</h1>
        <p className="text-gray-500">Live overview — VOUCH SA · Today, May 10 2026</p>
      </div>

      {/* Alerts */}
      {(urgentIncidents.length > 0 || openDisputes.length > 0) && (
        <div className="grid md:grid-cols-2 gap-3 mb-6">
          {urgentIncidents.map(i => (
            <div key={i.id} className="flex items-start gap-3 p-4 rounded-2xl"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
              <Shield size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm text-red-600">🚨 Safety Alert — Urgent</p>
                <p className="text-xs text-gray-600 mt-0.5">{i.description.slice(0, 80)}...</p>
                <p className="text-xs text-gray-400 mt-1">Raised by {i.raisedBy} · {i.createdAt.split('T')[0]}</p>
              </div>
            </div>
          ))}
          {openDisputes.map(d => (
            <div key={d.id} className="flex items-start gap-3 p-4 rounded-2xl"
              style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)' }}>
              <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm text-amber-700">Dispute Under Review</p>
                <p className="text-xs text-gray-600 mt-0.5">{d.reason} — R{d.amount} held</p>
                <p className="text-xs text-gray-400 mt-1">Raised by {d.raisedBy} · {d.createdAt.split('T')[0]}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {metricCards.map((m, i) => (
          <div key={i} className="bg-white rounded-2xl p-5" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${m.color}15`, color: m.color }}>
                {m.icon}
              </div>
              <span className="text-xs text-gray-400">{m.sub}</span>
            </div>
            <p className="text-3xl font-black" style={{ color: '#0F2B46' }}>{m.val}</p>
            <p className="text-sm text-gray-500 mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {/* Daily bookings area chart */}
        <div className="md:col-span-2 bg-white rounded-2xl p-5" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
          <h3 className="font-bold mb-4" style={{ color: '#0F2B46' }}>Weekly Bookings & Revenue</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={dailyBookings}>
              <defs>
                <linearGradient id="bookGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1D7A50" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#1D7A50" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4A853" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#D4A853" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" hide />
              <YAxis yAxisId="right" orientation="right" hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', fontSize: 12 }} />
              <Area yAxisId="left" type="monotone" dataKey="bookings" stroke="#1D7A50" strokeWidth={2} fill="url(#bookGrad)" name="Bookings" />
              <Area yAxisId="right" type="monotone" dataKey="revenue" stroke="#D4A853" strokeWidth={2} fill="url(#revGrad)" name="Revenue (R)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Service breakdown */}
        <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
          <h3 className="font-bold mb-4" style={{ color: '#0F2B46' }}>Services breakdown</h3>
          <div className="space-y-3">
            {serviceBreakdown.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{s.service}</span>
                  <span className="font-semibold" style={{ color: '#0F2B46' }}>{s.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100">
                  <div className="h-full rounded-full"
                    style={{ width: `${s.pct}%`, background: ['#1D7A50', '#3b82f6', '#D4A853', '#8b5cf6', '#f59e0b', '#64748b'][i] }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Worker levels pie + pending payments */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
          <h3 className="font-bold mb-4" style={{ color: '#0F2B46' }}>Provider levels</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={workerLevels} dataKey="count" nameKey="level" cx="50%" cy="50%" outerRadius={70} innerRadius={40}>
                {workerLevels.map((l, i) => <Cell key={i} fill={l.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', fontSize: 12 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
          <h3 className="font-bold mb-4" style={{ color: '#0F2B46' }}>Financial summary</h3>
          <div className="space-y-3">
            {[
              { label: 'Total GMV', val: `R${marketplaceMetrics.totalRevenue.toLocaleString()}`, color: '#0F2B46' },
              { label: 'Platform fees collected', val: `R${marketplaceMetrics.platformFee.toLocaleString()}`, color: '#1D7A50' },
              { label: 'Pending payouts', val: `R${marketplaceMetrics.pendingPayouts.toLocaleString()}`, color: '#D4A853' },
              { label: 'Jobs in escrow', val: `${jobs.filter(j => j.paymentStatus === 'held').length}`, color: '#3b82f6' },
            ].map((f, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-600">{f.label}</span>
                <span className="font-black" style={{ color: f.color }}>{f.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
