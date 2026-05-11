import { useState } from 'react';
import { jobs, workers, clients } from '../../data/mockData';
import { Search, Clock, MapPin } from 'lucide-react';

const statusColor: Record<string, string> = {
  IN_PROGRESS: '#1D7A50',
  CONFIRMED: '#D4A853',
  COMPLETED: '#64748b',
  MATCHING: '#3b82f6',
  POSTED: '#94a3b8',
  DISPUTED: '#ef4444',
  CANCELLED: '#f87171',
  EN_ROUTE: '#8b5cf6',
};

const statusLabel: Record<string, string> = {
  IN_PROGRESS: 'In Progress',
  CONFIRMED: 'Confirmed',
  COMPLETED: 'Completed',
  MATCHING: 'Matching',
  POSTED: 'Posted',
  DISPUTED: 'Disputed',
  EN_ROUTE: 'En Route',
};

export default function AdminJobs() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const statuses = ['All', 'In Progress', 'Posted', 'Confirmed', 'Completed', 'Disputed'];

  const filtered = jobs.filter(j => {
    const matchSearch = j.service.toLowerCase().includes(search.toLowerCase()) || j.area.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || statusLabel[j.status] === statusFilter;
    return matchSearch && matchStatus;
  });

  const getWorker = (id: string | null) => id ? workers.find(w => w.id === id) : null;
  const getClient = (id: string) => clients.find(c => c.id === id);

  return (
    <div className="px-6 py-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-black" style={{ color: '#0F2B46' }}>Jobs</h1>
        <p className="text-gray-500">{jobs.length} total · {jobs.filter(j => j.status === 'IN_PROGRESS').length} active</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-48 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search jobs..."
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none bg-white"
            style={{ border: '1px solid rgba(0,0,0,0.08)', color: '#0F2B46' }} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statuses.map(s => (
            <button key={s}
              onClick={() => setStatusFilter(s)}
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: statusFilter === s ? '#0F2B46' : '#fff',
                color: statusFilter === s ? '#fff' : '#64748b',
                border: `1px solid ${statusFilter === s ? 'transparent' : 'rgba(0,0,0,0.08)'}`,
              }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(job => {
          const worker = getWorker(job.workerId);
          const client = getClient(job.clientId);
          return (
            <div key={job.id} className="bg-white rounded-2xl p-5"
              style={{ border: `1px solid ${job.status === 'DISPUTED' ? 'rgba(239,68,68,0.3)' : 'rgba(0,0,0,0.06)'}` }}>
              <div className="flex flex-wrap gap-4 items-start">
                {/* Service icon + basic */}
                <div className="flex items-start gap-3 flex-1 min-w-48">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: '#F5F3EE' }}>
                    {job.serviceIcon}
                  </div>
                  <div>
                    <p className="font-bold" style={{ color: '#0F2B46' }}>{job.service}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                      <MapPin size={11} /> {job.area}, {job.city}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                      <Clock size={11} /> {job.date} · {job.time} · {job.duration}hrs
                    </div>
                  </div>
                </div>

                {/* Client */}
                <div className="flex-1 min-w-32">
                  <p className="text-xs text-gray-400 mb-1">Client</p>
                  {client ? (
                    <div className="flex items-center gap-2">
                      <img src={client.photo} alt={client.name} className="w-7 h-7 rounded-full object-cover" />
                      <p className="text-sm font-semibold" style={{ color: '#0F2B46' }}>{client.name}</p>
                    </div>
                  ) : <p className="text-sm text-gray-400">—</p>}
                </div>

                {/* Worker */}
                <div className="flex-1 min-w-32">
                  <p className="text-xs text-gray-400 mb-1">Provider</p>
                  {worker ? (
                    <div className="flex items-center gap-2">
                      <img src={worker.photo} alt={worker.name} className="w-7 h-7 rounded-full object-cover" />
                      <p className="text-sm font-semibold" style={{ color: '#0F2B46' }}>{worker.name}</p>
                    </div>
                  ) : <p className="text-sm text-gray-400">Unmatched</p>}
                </div>

                {/* Price + status */}
                <div className="text-right">
                  <p className="font-black text-xl" style={{ color: '#0F2B46' }}>R{job.price}</p>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full"
                    style={{ background: `${statusColor[job.status] || '#94a3b8'}15`, color: statusColor[job.status] || '#94a3b8' }}>
                    {statusLabel[job.status] || job.status}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">{job.paymentStatus}</p>
                </div>
              </div>

              {/* Job ID + actions */}
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-400">#{job.id.toUpperCase()}</p>
                <div className="flex gap-2">
                  {job.status === 'DISPUTED' && (
                    <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
                      style={{ background: '#ef4444' }}>
                      Resolve Dispute
                    </button>
                  )}
                  <button className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{ background: '#F5F3EE', color: '#0F2B46' }}>
                    View details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
