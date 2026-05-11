import { useState } from 'react';
import { jobs, workers } from '../../data/mockData';
import { MapPin, Clock, Star, Check, X } from 'lucide-react';

const availableJobs = jobs.filter(j => ['POSTED', 'MATCHING'].includes(j.status));
const myJobs = jobs.filter(j => j.workerId === 'w1');

const tabs = ['Available', 'My Jobs'];

const statusColor: Record<string, string> = {
  IN_PROGRESS: '#1D7A50',
  CONFIRMED: '#D4A853',
  COMPLETED: '#64748b',
  MATCHING: '#3b82f6',
  POSTED: '#94a3b8',
  EN_ROUTE: '#8b5cf6',
};

const statusLabel: Record<string, string> = {
  IN_PROGRESS: 'In Progress',
  CONFIRMED: 'Confirmed',
  COMPLETED: 'Completed',
  MATCHING: 'Finding Match',
  POSTED: 'Open',
  EN_ROUTE: 'En Route',
};

export default function WorkerJobs() {
  const [activeTab, setActiveTab] = useState('Available');
  const [accepted, setAccepted] = useState<string[]>([]);
  const [declined, setDeclined] = useState<string[]>([]);

  const displayJobs = activeTab === 'Available'
    ? availableJobs.filter(j => !declined.includes(j.id))
    : myJobs;

  return (
    <div className="px-4 pt-14 pb-4">
      <div className="mb-5">
        <h1 className="text-2xl font-black" style={{ color: '#0F2B46' }}>Jobs</h1>
        <p className="text-sm text-gray-500">{availableJobs.length} available near you</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {tabs.map(t => (
          <button key={t}
            onClick={() => setActiveTab(t)}
            className="px-5 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: activeTab === t ? '#0F2B46' : '#fff',
              color: activeTab === t ? '#fff' : '#64748b',
              border: `1px solid ${activeTab === t ? 'transparent' : 'rgba(0,0,0,0.08)'}`,
            }}>
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {displayJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📋</p>
            <p className="font-semibold" style={{ color: '#0F2B46' }}>No jobs here</p>
            <p className="text-sm text-gray-400">Check back soon</p>
          </div>
        )}

        {displayJobs.map(job => {
          const isAccepted = accepted.includes(job.id);
          return (
            <div key={job.id}
              className="bg-white rounded-3xl p-5 transition-all"
              style={{
                border: `2px solid ${isAccepted ? '#1D7A50' : 'rgba(0,0,0,0.06)'}`,
                opacity: isAccepted ? 0.7 : 1,
              }}>
              {/* Service */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: '#F5F3EE' }}>
                  {job.serviceIcon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <p className="font-black" style={{ color: '#0F2B46' }}>{job.service}</p>
                    <p className="font-black text-lg" style={{ color: '#1D7A50' }}>R{job.price}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin size={11} />
                      {job.area}, {job.city}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock size={11} />
                      {job.date} · {job.time}
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: 'Duration', val: `${job.duration}hrs` },
                  { label: 'Rate', val: `R${Math.round(job.price / job.duration)}/hr` },
                  { label: 'Status', val: statusLabel[job.status] || job.status },
                ].map((d, i) => (
                  <div key={i} className="rounded-xl p-2.5 text-center" style={{ background: '#F5F3EE' }}>
                    <p className="font-bold text-sm" style={{ color: '#0F2B46' }}>{d.val}</p>
                    <p className="text-xs text-gray-400">{d.label}</p>
                  </div>
                ))}
              </div>

              {/* Notes */}
              {job.notes && (
                <div className="px-3 py-2 rounded-xl mb-4 text-xs text-gray-500"
                  style={{ background: '#F5F3EE' }}>
                  📝 {job.notes}
                </div>
              )}

              {/* Actions for available jobs */}
              {activeTab === 'Available' && !isAccepted && (
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeclined(d => [...d, job.id])}
                    className="flex-1 py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-1.5 transition-all active:scale-95"
                    style={{ background: '#fff', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
                    <X size={15} /> Decline
                  </button>
                  <button
                    onClick={() => setAccepted(a => [...a, job.id])}
                    className="flex-1 py-3 rounded-2xl text-white font-semibold text-sm flex items-center justify-center gap-1.5 transition-all active:scale-95"
                    style={{ background: '#1D7A50' }}>
                    <Check size={15} /> Accept Job
                  </button>
                </div>
              )}

              {isAccepted && (
                <div className="flex items-center justify-center gap-2 py-3 rounded-2xl"
                  style={{ background: 'rgba(29,122,80,0.1)' }}>
                  <Check size={16} className="text-[#1D7A50]" />
                  <span className="font-semibold text-sm" style={{ color: '#1D7A50' }}>Job accepted!</span>
                </div>
              )}

              {/* My jobs status */}
              {activeTab === 'My Jobs' && (
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: `${statusColor[job.status] || '#94a3b8'}15`, color: statusColor[job.status] || '#94a3b8' }}>
                    {statusLabel[job.status] || job.status}
                  </span>
                  <span className="text-xs text-gray-400">
                    {job.paymentStatus === 'released' ? '✅ Payment released' : '🔒 Payment held'}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
