import { disputes, safetyIncidents, jobs } from '../../data/mockData';
import { AlertTriangle, Shield, CheckCircle, Clock, XCircle } from 'lucide-react';

const disputeStatusColor: Record<string, string> = {
  open: '#ef4444',
  under_review: '#D4A853',
  resolved: '#1D7A50',
  escalated: '#8b5cf6',
};

const incidentStatusColor: Record<string, string> = {
  urgent: '#ef4444',
  under_review: '#D4A853',
  resolved: '#1D7A50',
};

const incidentTypeLabel: Record<string, string> = {
  unsafe_feeling: 'Felt Unsafe',
  no_show: 'No Show',
  harassment: 'Harassment',
  property_damage: 'Property Damage',
  other: 'Other',
};

export default function AdminDisputes() {
  const getJob = (id: string) => jobs.find(j => j.id === id);

  return (
    <div className="px-6 py-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-black" style={{ color: '#0F2B46' }}>Disputes & Safety</h1>
        <p className="text-gray-500">{disputes.length} disputes · {safetyIncidents.length} safety incidents</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Open disputes', val: disputes.filter(d => d.status === 'open').length, color: '#ef4444', icon: <AlertTriangle size={18} /> },
          { label: 'Under review', val: disputes.filter(d => d.status === 'under_review').length, color: '#D4A853', icon: <Clock size={18} /> },
          { label: 'Resolved', val: disputes.filter(d => d.status === 'resolved').length, color: '#1D7A50', icon: <CheckCircle size={18} /> },
          { label: 'Safety alerts', val: safetyIncidents.filter(i => i.status === 'urgent').length, color: '#8b5cf6', icon: <Shield size={18} /> },
        ].map((m, i) => (
          <div key={i} className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${m.color}30` }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${m.color}15`, color: m.color }}>
              {m.icon}
            </div>
            <p className="text-3xl font-black" style={{ color: m.color }}>{m.val}</p>
            <p className="text-sm text-gray-500 mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Safety Incidents — urgent first */}
      {safetyIncidents.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold mb-4 flex items-center gap-2" style={{ color: '#0F2B46' }}>
            <Shield size={18} className="text-red-500" />
            Safety Incidents
          </h2>
          <div className="space-y-3">
            {safetyIncidents.map(incident => {
              const job = getJob(incident.jobId);
              return (
                <div key={incident.id} className="bg-white rounded-2xl p-5"
                  style={{ border: `2px solid ${incidentStatusColor[incident.status]}40` }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 rounded-full text-xs font-bold"
                          style={{ background: `${incidentStatusColor[incident.status]}15`, color: incidentStatusColor[incident.status] }}>
                          {incident.status === 'urgent' ? '🚨' : '👁'} {incident.status.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className="text-xs font-medium px-2 py-1 rounded-lg"
                          style={{ background: '#F5F3EE', color: '#64748b' }}>
                          {incidentTypeLabel[incident.type]}
                        </span>
                      </div>
                      <p className="font-bold text-sm mb-1" style={{ color: '#0F2B46' }}>
                        Raised by {incident.raisedBy} ({incident.raisedByType})
                      </p>
                      <p className="text-sm text-gray-600 mb-2">{incident.description}</p>
                      {job && (
                        <p className="text-xs text-gray-400">
                          Job #{job.id.toUpperCase()} · {job.service} · {job.area} · {incident.createdAt.split('T')[0]}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
                        style={{ background: '#ef4444' }}>
                        Escalate
                      </button>
                      <button className="px-4 py-2 rounded-xl text-sm font-semibold"
                        style={{ background: '#F5F3EE', color: '#0F2B46' }}>
                        Resolve
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Disputes */}
      <h2 className="font-bold mb-4 flex items-center gap-2" style={{ color: '#0F2B46' }}>
        <AlertTriangle size={18} className="text-amber-500" />
        Disputes
      </h2>
      <div className="space-y-3">
        {disputes.map(dispute => {
          const job = getJob(dispute.jobId);
          return (
            <div key={dispute.id} className="bg-white rounded-2xl p-5"
              style={{ border: `1px solid ${disputeStatusColor[dispute.status]}30` }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold capitalize"
                      style={{ background: `${disputeStatusColor[dispute.status]}15`, color: disputeStatusColor[dispute.status] }}>
                      {dispute.status.replace('_', ' ')}
                    </span>
                    <span className="text-sm font-bold" style={{ color: '#0F2B46' }}>R{dispute.amount} in dispute</span>
                  </div>
                  <p className="font-bold text-sm mb-1" style={{ color: '#0F2B46' }}>{dispute.reason}</p>
                  <p className="text-sm text-gray-600 mb-2">{dispute.description}</p>
                  <p className="text-xs text-gray-400">
                    Raised by {dispute.raisedBy} ({dispute.raisedByType}) · {dispute.createdAt.split('T')[0]}
                  </p>
                  {job && (
                    <p className="text-xs text-gray-400">
                      Job #{job.id.toUpperCase()} · {job.service} · {job.area}
                    </p>
                  )}
                  {dispute.resolution && (
                    <div className="mt-3 p-3 rounded-xl text-xs"
                      style={{ background: 'rgba(29,122,80,0.08)', color: '#1D7A50', border: '1px solid rgba(29,122,80,0.2)' }}>
                      ✅ {dispute.resolution}
                    </div>
                  )}
                </div>
                {dispute.status !== 'resolved' && (
                  <div className="flex flex-col gap-2">
                    <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white whitespace-nowrap"
                      style={{ background: '#1D7A50' }}>
                      Resolve in favour of client
                    </button>
                    <button className="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap"
                      style={{ background: '#D4A853', color: '#0F2B46' }}>
                      Resolve in favour of provider
                    </button>
                    <button className="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap"
                      style={{ background: '#F5F3EE', color: '#0F2B46' }}>
                      Split payment
                    </button>
                  </div>
                )}
                {dispute.status === 'resolved' && (
                  <div className="flex items-center justify-center w-10 h-10 rounded-full"
                    style={{ background: 'rgba(29,122,80,0.1)' }}>
                    <CheckCircle size={20} className="text-[#1D7A50]" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
