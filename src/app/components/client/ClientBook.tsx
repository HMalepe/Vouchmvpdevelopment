import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { services, workers } from '../../data/mockData';
import { ArrowLeft, ArrowRight, Check, ChevronRight, Clock, Star, MapPin, Shield } from 'lucide-react';

const AREAS = ['Sandton', 'Rosebank', 'Hyde Park', 'Fourways', 'Bryanston', 'Melville', 'Observatory', 'Rondebosch', 'Berea'];
const TIMES = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
const DURATIONS = [2, 3, 4, 5, 6, 8];

const LEVEL_COLOR: Record<string, string> = {
  'Trusted Pro': '#1D7A50',
  'Job Verified': '#3b82f6',
  'Reliable': '#D4A853',
  'Basic': '#94a3b8',
  'New': '#cbd5e1',
};

export default function ClientBook() {
  const navigate = useNavigate();
  const { bookingData, setBookingData } = useApp();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Step 1: service selection
  // Step 2: date/time/area
  // Step 3: match worker
  // Step 4: confirmation

  const availableWorkers = workers.filter(w => w.available);

  const selectedService = services.find(s => s.name === bookingData.service);
  const selectedWorker = workers.find(w => w.id === bookingData.selectedWorkerId);

  const totalPrice = bookingData.estimatedPrice;

  const goNext = () => {
    if (step === 2) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(3);
      }, 1200);
    } else if (step === 4) {
      navigate('/client/job');
    } else {
      setStep(s => s + 1);
    }
  };

  const canNext =
    (step === 1 && !!bookingData.service) ||
    (step === 2 && !!bookingData.area && !!bookingData.date && !!bookingData.time) ||
    (step === 3 && !!bookingData.selectedWorkerId) ||
    step === 4;

  const stepLabels = ['Service', 'When & Where', 'Match', 'Confirm'];

  return (
    <div className="px-4 pt-14 pb-4 min-h-screen" style={{ background: '#F5F3EE' }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => (step > 1 ? setStep(s => s - 1) : navigate('/client'))}
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm"
        >
          <ArrowLeft size={16} style={{ color: '#0F2B46' }} />
        </button>
        <div>
          <h1 className="font-black text-xl" style={{ color: '#0F2B46' }}>Book a Service</h1>
          <p className="text-xs text-gray-400">Step {step} of 4 — {stepLabels[step - 1]}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-1.5 mb-6">
        {stepLabels.map((_, i) => (
          <div key={i} className="h-1 flex-1 rounded-full transition-all"
            style={{ background: i < step ? '#1D7A50' : 'rgba(0,0,0,0.1)' }} />
        ))}
      </div>

      {/* Step 1: Choose Service */}
      {step === 1 && (
        <div>
          <h2 className="font-bold mb-4" style={{ color: '#0F2B46' }}>What do you need?</h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {services.map(s => (
              <button key={s.id}
                onClick={() => setBookingData({
                  service: s.name,
                  serviceIcon: s.icon,
                  estimatedPrice: s.basePrice * (bookingData.duration || 3),
                })}
                className="relative rounded-2xl p-4 flex flex-col items-start gap-2 transition-all active:scale-95"
                style={{
                  background: bookingData.service === s.name ? '#0F2B46' : '#fff',
                  border: `2px solid ${bookingData.service === s.name ? '#1D7A50' : 'rgba(0,0,0,0.06)'}`,
                }}>
                <span className="text-3xl">{s.icon}</span>
                <div className="text-left">
                  <p className="font-bold text-sm" style={{ color: bookingData.service === s.name ? '#fff' : '#0F2B46' }}>{s.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: bookingData.service === s.name ? 'rgba(255,255,255,0.6)' : '#94a3b8' }}>
                    R{s.basePrice}{s.unit}
                  </p>
                </div>
                {bookingData.service === s.name && (
                  <div className="absolute top-3 right-3">
                    <Check size={14} className="text-[#4ade80]" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Duration */}
          {bookingData.service && (
            <div className="bg-white rounded-2xl p-4 mb-4" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
              <p className="font-bold text-sm mb-3" style={{ color: '#0F2B46' }}>Duration</p>
              <div className="flex gap-2 flex-wrap">
                {DURATIONS.map(d => (
                  <button key={d}
                    onClick={() => setBookingData({
                      duration: d,
                      estimatedPrice: (selectedService?.basePrice || 65) * d,
                    })}
                    className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: bookingData.duration === d ? '#1D7A50' : '#F5F3EE',
                      color: bookingData.duration === d ? '#fff' : '#0F2B46',
                    }}>
                    {d}h
                  </button>
                ))}
              </div>
              {selectedService && bookingData.duration && (
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Estimated total</span>
                  <span className="font-black text-lg" style={{ color: '#0F2B46' }}>
                    R{selectedService.basePrice * bookingData.duration}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Step 2: When & Where */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <p className="font-bold text-sm mb-3" style={{ color: '#0F2B46' }}>
              <MapPin size={14} className="inline mr-1.5 text-[#1D7A50]" />Area
            </p>
            <div className="flex flex-wrap gap-2">
              {AREAS.map(a => (
                <button key={a}
                  onClick={() => setBookingData({ area: a })}
                  className="px-3 py-1.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: bookingData.area === a ? '#1D7A50' : '#F5F3EE',
                    color: bookingData.area === a ? '#fff' : '#0F2B46',
                  }}>
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <p className="font-bold text-sm mb-3" style={{ color: '#0F2B46' }}>
              📅 Date
            </p>
            <input type="date"
              value={bookingData.date}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => setBookingData({ date: e.target.value })}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none"
              style={{ background: '#F5F3EE', color: '#0F2B46', border: '1px solid rgba(0,0,0,0.08)' }}
            />
          </div>

          <div className="bg-white rounded-2xl p-4" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <p className="font-bold text-sm mb-3" style={{ color: '#0F2B46' }}>
              <Clock size={14} className="inline mr-1.5 text-[#1D7A50]" />Start time
            </p>
            <div className="flex flex-wrap gap-2">
              {TIMES.map(t => (
                <button key={t}
                  onClick={() => setBookingData({ time: t })}
                  className="px-3 py-1.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: bookingData.time === t ? '#1D7A50' : '#F5F3EE',
                    color: bookingData.time === t ? '#fff' : '#0F2B46',
                  }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <p className="font-bold text-sm mb-2" style={{ color: '#0F2B46' }}>Special instructions (optional)</p>
            <textarea
              placeholder="E.g. Focus on kitchen, dog on premises, use back entrance..."
              value={bookingData.notes}
              onChange={e => setBookingData({ notes: e.target.value })}
              rows={3}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
              style={{ background: '#F5F3EE', color: '#0F2B46', border: '1px solid rgba(0,0,0,0.08)' }}
            />
          </div>
        </div>
      )}

      {/* Step 3: Match Worker */}
      {step === 3 && (
        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 animate-pulse"
                style={{ background: 'rgba(29,122,80,0.15)' }}>
                <span className="text-3xl">{bookingData.serviceIcon}</span>
              </div>
              <p className="font-bold text-lg" style={{ color: '#0F2B46' }}>Finding your match…</p>
              <p className="text-sm text-gray-400 mt-1">Checking availability & VouchScore</p>
              <div className="mt-6 flex gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full animate-bounce"
                    style={{ background: '#1D7A50', animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <h2 className="font-bold mb-4" style={{ color: '#0F2B46' }}>
                {availableWorkers.length} providers available near {bookingData.area || 'you'}
              </h2>
              {availableWorkers.map((w, i) => (
                <div key={w.id}
                  onClick={() => setBookingData({ selectedWorkerId: w.id })}
                  className="bg-white rounded-2xl p-4 cursor-pointer transition-all active:scale-98"
                  style={{
                    border: `2px solid ${bookingData.selectedWorkerId === w.id ? '#1D7A50' : 'rgba(0,0,0,0.06)'}`,
                  }}>
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <img src={w.photo} alt={w.name} className="w-14 h-14 rounded-full object-cover" />
                      <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-white text-[9px] font-black"
                        style={{ background: LEVEL_COLOR[w.level] || '#94a3b8' }}>
                        {w.vouchScore}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold" style={{ color: '#0F2B46' }}>{w.name}</p>
                          <p className="text-xs text-gray-500">{w.skills.slice(0, 2).join(' · ')}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-sm" style={{ color: '#0F2B46' }}>R{w.hourlyRate}/hr</p>
                          <p className="text-xs text-gray-400">{w.distance}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1">
                          <Star size={11} fill="#D4A853" className="text-[#D4A853]" />
                          <span className="text-xs font-semibold">{w.rating}</span>
                        </div>
                        <span className="text-gray-300 text-xs">·</span>
                        <span className="text-xs text-gray-500">{w.jobsCompleted} jobs</span>
                        <span className="text-gray-300 text-xs">·</span>
                        <span className="text-xs font-semibold" style={{ color: LEVEL_COLOR[w.level] || '#94a3b8' }}>{w.level}</span>
                      </div>
                      {i === 0 && (
                        <div className="mt-2 px-2 py-1 rounded-lg text-xs font-semibold inline-block"
                          style={{ background: 'rgba(29,122,80,0.1)', color: '#1D7A50' }}>
                          ⭐ Best match for you
                        </div>
                      )}
                    </div>
                    {bookingData.selectedWorkerId === w.id && (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: '#1D7A50' }}>
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 4: Confirm */}
      {step === 4 && selectedWorker && selectedService && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 className="font-bold mb-4" style={{ color: '#0F2B46' }}>Booking Summary</h3>
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              <span className="text-3xl">{bookingData.serviceIcon}</span>
              <div>
                <p className="font-bold" style={{ color: '#0F2B46' }}>{bookingData.service}</p>
                <p className="text-sm text-gray-500">{bookingData.duration}hrs · {bookingData.area}</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Date', val: bookingData.date },
                { label: 'Time', val: bookingData.time },
                { label: 'Provider', val: selectedWorker.name },
                { label: 'Rate', val: `R${selectedWorker.hourlyRate}/hr` },
              ].map(r => (
                <div key={r.label} className="flex justify-between">
                  <span className="text-gray-500">{r.label}</span>
                  <span className="font-semibold" style={{ color: '#0F2B46' }}>{r.val}</span>
                </div>
              ))}
              <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                <span className="text-gray-500">Estimated total</span>
                <span className="font-black text-xl" style={{ color: '#0F2B46' }}>
                  R{selectedWorker.hourlyRate * bookingData.duration}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl"
            style={{ background: 'rgba(29,122,80,0.08)', border: '1px solid rgba(29,122,80,0.2)' }}>
            <Shield size={18} className="text-[#1D7A50] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold" style={{ color: '#1D7A50' }}>Payment protected</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Your payment is held securely and only released to {selectedWorker.name.split(' ')[0]} when the job is complete.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <p className="text-xs text-gray-400 text-center">
              By confirming you agree to VOUCH's Terms of Service. Cancellation is free up to 24hrs before the job.
            </p>
          </div>
        </div>
      )}

      {/* CTA */}
      {!loading && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
          <button
            onClick={goNext}
            disabled={!canNext}
            className="w-full py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-40"
            style={{ background: canNext ? '#1D7A50' : '#94a3b8', boxShadow: canNext ? '0 8px 24px rgba(29,122,80,0.35)' : 'none' }}>
            {step === 4 ? 'Confirm & Pay' : 'Continue'}
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}