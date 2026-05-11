import { useState } from 'react';
import { useNavigate } from 'react-router';
import { jobs, workers } from '../../data/mockData';
import { ArrowLeft, Phone, MessageCircle, MapPin, Clock, Shield, Star, CheckCircle } from 'lucide-react';

const activeJob = jobs.find(j => j.status === 'IN_PROGRESS')!;
const worker = workers.find(w => w.id === activeJob?.workerId);

const statusSteps = [
  { key: 'ACCEPTED', label: 'Accepted', icon: '✅' },
  { key: 'PAYMENT_HELD', label: 'Payment Held', icon: '🔒' },
  { key: 'EN_ROUTE', label: 'En Route', icon: '🚶' },
  { key: 'CHECKED_IN', label: 'Checked In', icon: '📍' },
  { key: 'IN_PROGRESS', label: 'In Progress', icon: '⚡' },
  { key: 'COMPLETED', label: 'Completed', icon: '🎉' },
];

export default function ClientJob() {
  const navigate = useNavigate();
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  if (!activeJob || !worker) return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <p className="text-5xl mb-4">📋</p>
      <p className="font-bold" style={{ color: '#0F2B46' }}>No active job</p>
      <button onClick={() => navigate('/client/book')}
        className="mt-4 px-6 py-3 rounded-2xl text-white font-semibold"
        style={{ background: '#1D7A50' }}>
        Book a service
      </button>
    </div>
  );

  const currentStepIndex = statusSteps.findIndex(s => s.key === activeJob.status);

  return (
    <div className="px-4 pt-14 pb-24" style={{ background: '#F5F3EE', minHeight: '100vh' }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => navigate('/client')}
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
          <ArrowLeft size={16} style={{ color: '#0F2B46' }} />
        </button>
        <div>
          <h1 className="font-black text-lg" style={{ color: '#0F2B46' }}>Live Job Tracker</h1>
          <p className="text-xs text-gray-400">Job #{activeJob.id.toUpperCase()}</p>
        </div>
        <div className="ml-auto px-3 py-1 rounded-full text-xs font-bold"
          style={{ background: 'rgba(29,122,80,0.15)', color: '#1D7A50' }}>
          ● Live
        </div>
      </div>

      {/* Worker Card */}
      <div className="bg-white rounded-3xl p-5 mb-4 shadow-sm" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={worker.photo} alt={worker.name} className="w-16 h-16 rounded-full object-cover" />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#1D7A50] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-black text-lg" style={{ color: '#0F2B46' }}>{worker.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <Star size={12} fill="#D4A853" className="text-[#D4A853]" />
              <span className="text-xs font-semibold">{worker.rating}</span>
              <span className="text-xs text-gray-400">· VouchScore {worker.vouchScore}</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{worker.level}</p>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#F5F3EE]">
              <MessageCircle size={18} style={{ color: '#0F2B46' }} />
            </button>
            <button className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: '#1D7A50' }}>
              <Phone size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Job Info */}
      <div className="bg-white rounded-2xl p-4 mb-4" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
          <span className="text-3xl">{activeJob.serviceIcon}</span>
          <div>
            <p className="font-bold" style={{ color: '#0F2B46' }}>{activeJob.service}</p>
            <p className="text-xs text-gray-500">{activeJob.duration}hrs · R{activeJob.price}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-[#1D7A50]" />
            <div>
              <p className="text-xs text-gray-400">Location</p>
              <p className="text-sm font-semibold" style={{ color: '#0F2B46' }}>{activeJob.area}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-[#1D7A50]" />
            <div>
              <p className="text-xs text-gray-400">Started</p>
              <p className="text-sm font-semibold" style={{ color: '#0F2B46' }}>{activeJob.time}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="bg-white rounded-2xl p-4 mb-4" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
        <p className="font-bold mb-4" style={{ color: '#0F2B46' }}>Job Progress</p>
        <div className="space-y-1">
          {statusSteps.map((s, i) => {
            const done = i <= currentStepIndex;
            const current = i === currentStepIndex;
            return (
              <div key={s.key} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all"
                    style={{
                      background: done ? '#1D7A50' : '#F5F3EE',
                      border: current ? '2px solid #4ade80' : 'none',
                    }}>
                    {done ? <CheckCircle size={14} className="text-white" /> : <span className="text-xs">{s.icon}</span>}
                  </div>
                  {i < statusSteps.length - 1 && (
                    <div className="w-0.5 h-6 my-0.5"
                      style={{ background: done ? '#1D7A50' : '#e2e8f0' }} />
                  )}
                </div>
                <div className="flex-1 pb-1">
                  <p className="text-sm font-semibold" style={{ color: done ? '#0F2B46' : '#94a3b8' }}>{s.label}</p>
                  {current && (
                    <p className="text-xs" style={{ color: '#1D7A50' }}>Happening now</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-500">Estimated completion</span>
            <span style={{ color: '#0F2B46' }} className="font-semibold">~60% done</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100">
            <div className="h-full rounded-full transition-all" style={{ width: '60%', background: 'linear-gradient(90deg, #1D7A50, #4ade80)' }} />
          </div>
        </div>
      </div>

      {/* Payment Protection */}
      <div className="flex items-center gap-3 p-4 rounded-2xl mb-4"
        style={{ background: 'rgba(29,122,80,0.08)', border: '1px solid rgba(29,122,80,0.2)' }}>
        <Shield size={18} className="text-[#1D7A50] flex-shrink-0" />
        <div>
          <p className="text-sm font-bold" style={{ color: '#1D7A50' }}>R{activeJob.price} held securely</p>
          <p className="text-xs text-gray-500">Released to {worker.name.split(' ')[0]} only when you approve</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowReview(true)}
          className="flex-1 py-4 rounded-2xl text-white font-bold transition-all active:scale-95"
          style={{ background: '#1D7A50', boxShadow: '0 4px 16px rgba(29,122,80,0.3)' }}>
          ✓ Complete & Pay
        </button>
        <button className="px-4 py-4 rounded-2xl font-semibold text-sm transition-all active:scale-95"
          style={{ background: '#fff', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
          Dispute
        </button>
      </div>

      {/* Review Modal */}
      {showReview && (
        <div className="fixed inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full bg-white rounded-t-3xl p-6">
            <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-6" />
            <p className="font-black text-xl mb-1" style={{ color: '#0F2B46' }}>Rate your experience</p>
            <p className="text-sm text-gray-500 mb-5">How was {worker.name.split(' ')[0]} today?</p>
            <div className="flex justify-center gap-3 mb-5">
              {[1, 2, 3, 4, 5].map(s => (
                <button key={s} onClick={() => setRating(s)}>
                  <Star size={36} fill={s <= rating ? '#D4A853' : 'none'}
                    className={s <= rating ? 'text-[#D4A853]' : 'text-gray-300'}
                    strokeWidth={1.5} />
                </button>
              ))}
            </div>
            <textarea
              placeholder="Share more about your experience..."
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              rows={3}
              className="w-full rounded-2xl px-4 py-3 text-sm outline-none resize-none mb-4"
              style={{ background: '#F5F3EE', border: '1px solid rgba(0,0,0,0.08)', color: '#0F2B46' }}
            />
            <button
              onClick={() => { setShowReview(false); }}
              disabled={rating === 0}
              className="w-full py-4 rounded-2xl text-white font-bold transition-all active:scale-95 disabled:opacity-40"
              style={{ background: '#1D7A50' }}>
              Submit & Release Payment
            </button>
            <button onClick={() => setShowReview(false)}
              className="w-full py-3 mt-2 text-sm text-gray-400">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
