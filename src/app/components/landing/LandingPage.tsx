import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Shield, Star, CreditCard, CheckCircle, ArrowRight, MapPin, Clock, Award, Users, TrendingUp, Heart, ChevronRight } from 'lucide-react';

const HERO_IMG = 'https://images.unsplash.com/photo-1610722840281-7e85407dc120?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80';

const services = [
  { icon: '🧹', name: 'Cleaning', desc: 'Deep, regular & spring cleans' },
  { icon: '👕', name: 'Ironing', desc: 'Shirts, dresses & linen' },
  { icon: '🌿', name: 'Gardening', desc: 'Mowing, trimming & planting' },
  { icon: '📦', name: 'Moving', desc: 'Packing, loading & assembly' },
  { icon: '🎨', name: 'Painting', desc: 'Interior & exterior painting' },
  { icon: '🏠', name: 'Home Support', desc: 'Cooking, errands & general help' },
];

const trustPoints = [
  { icon: <Shield size={20} className="text-[#1D7A50]" />, title: 'Verified Profiles', desc: 'Every provider goes through our multi-step verification — ID, skills, references.' },
  { icon: <CreditCard size={20} className="text-[#1D7A50]" />, title: 'Protected Payments', desc: 'Payment is held securely and only released when the job is complete.' },
  { icon: <CheckCircle size={20} className="text-[#1D7A50]" />, title: 'GPS Check-In/Out', desc: 'Real-time job tracking with check-in and check-out timestamps.' },
  { icon: <Star size={20} className="text-[#1D7A50]" />, title: 'Verified Reviews', desc: 'Only clients who completed jobs can leave reviews. No fake stars.' },
];

const clientSteps = [
  { n: '1', title: 'Choose a service', desc: 'Select what you need from our verified service categories.' },
  { n: '2', title: 'Get a fair price', desc: 'Transparent rates. No bidding, no haggling — just fair pay.' },
  { n: '3', title: 'Track your job', desc: 'Follow along in real time from match to completion.' },
];

const workerSteps = [
  { n: '1', title: 'Build your profile', desc: 'List your skills, get verified, and earn your VouchScore.' },
  { n: '2', title: 'Accept jobs', desc: 'Browse jobs in your area and accept on your terms.' },
  { n: '3', title: 'Get paid safely', desc: 'Protected payment released directly after job completion.' },
];

const testimonials = [
  {
    name: 'Priya N.', area: 'Sandton, JHB', quote: 'VOUCH changed how I manage my home. I trust Nomsa completely — she\'s verified, reliable, and genuinely professional.',
    rating: 5, avatar: '👩🏾',
  },
  {
    name: 'James vdM.', area: 'Rondebosch, CPT', quote: 'As a client, the protected payment gives me peace of mind. I know I\'m only charged for work actually done.',
    rating: 5, avatar: '👨🏼',
  },
  {
    name: 'Nomsa D.', area: 'Provider, Sandton', quote: 'VOUCH treats us like professionals. Fair rates, protected pay, and clients who actually respect our work.',
    rating: 5, avatar: '👩🏿',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { setRole } = useApp();

  const goClient = () => { setRole('client'); navigate('/client'); };
  const goWorker = () => { setRole('worker'); navigate('/worker'); };

  return (
    <div className="min-h-screen" style={{ background: '#F5F3EE', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4"
        style={{ background: 'rgba(15,43,70,0.97)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm"
            style={{ background: '#1D7A50' }}>V</div>
          <span className="text-white text-xl font-bold tracking-tight">VOUCH</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-white/70 hover:text-white text-sm transition-colors">How it works</a>
          <a href="#services" className="text-white/70 hover:text-white text-sm transition-colors">Services</a>
          <a href="#trust" className="text-white/70 hover:text-white text-sm transition-colors">Trust & Safety</a>
          <button onClick={goWorker} className="text-white/70 hover:text-white text-sm transition-colors">Become a provider</button>
        </nav>
        <button onClick={goClient}
          className="px-5 py-2.5 rounded-full text-white text-sm font-semibold transition-all hover:scale-105"
          style={{ background: '#1D7A50' }}>
          Book now
        </button>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center" style={{ background: '#0F2B46' }}>
        <div className="absolute inset-0 overflow-hidden">
          <img src={HERO_IMG} alt="Professional home service" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0F2B46 0%, #0F2B46cc 60%, transparent 100%)' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mb-6"
              style={{ background: 'rgba(29,122,80,0.2)', color: '#4ade80', border: '1px solid rgba(29,122,80,0.3)' }}>
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
              South Africa's trust-first work marketplace
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Book trusted<br />
              <span style={{ color: '#D4A853' }}>help near you.</span>
            </h1>
            <p className="text-white/70 text-lg mb-8 leading-relaxed max-w-lg">
              Connect with verified, professional service providers for cleaning, gardening, painting and more — with protected payments and real reviews.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button onClick={goClient}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-lg transition-all hover:scale-105 active:scale-95"
                style={{ background: '#1D7A50', boxShadow: '0 8px 32px rgba(29,122,80,0.4)' }}>
                Book a service
                <ArrowRight size={18} />
              </button>
              <button onClick={goWorker}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:scale-105 active:scale-95"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                Become a provider
              </button>
            </div>

            <div className="flex items-center gap-6">
              {[
                { icon: <Shield size={16} />, text: 'Verified providers' },
                { icon: <CreditCard size={16} />, text: 'Protected payments' },
                { icon: <Star size={16} />, text: 'Real reviews' },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-white/60 text-sm">
                  <span style={{ color: '#D4A853' }}>{t.icon}</span>
                  {t.text}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:grid grid-cols-2 gap-4">
            {[
              { n: '1,847', label: 'Jobs completed', icon: <CheckCircle size={20} /> },
              { n: '4.74★', label: 'Average rating', icon: <Star size={20} /> },
              { n: '342', label: 'Verified providers', icon: <Award size={20} /> },
              { n: '891', label: 'Happy clients', icon: <Users size={20} /> },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="mb-2" style={{ color: '#D4A853' }}>{s.icon}</div>
                <div className="text-white text-3xl font-black">{s.n}</div>
                <div className="text-white/50 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div className="py-6" style={{ background: '#1D7A50' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-8">
          {['ID Verified', 'Skills Assessed', 'Reference Checked', 'Payment Protected', 'GPS Tracked', 'Review Verified'].map((t, i) => (
            <div key={i} className="flex items-center gap-2 text-white/90 text-sm font-medium">
              <CheckCircle size={14} className="text-white" />
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#1D7A50' }}>What we offer</span>
          <h2 className="text-4xl font-black mt-2" style={{ color: '#0F2B46' }}>Professional home services</h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">Every service delivered by verified, skilled professionals at transparent, fair rates.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <div key={i} onClick={goClient}
              className="group cursor-pointer rounded-2xl p-6 bg-white transition-all hover:shadow-xl hover:-translate-y-1"
              style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="font-bold text-lg mb-1" style={{ color: '#0F2B46' }}>{s.name}</h3>
              <p className="text-gray-500 text-sm mb-3">{s.desc}</p>
              <div className="flex items-center gap-1 text-sm font-semibold transition-colors group-hover:text-[#1D7A50]" style={{ color: '#1D7A50' }}>
                Book now <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20" style={{ background: '#0F2B46' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#D4A853' }}>Simple process</span>
            <h2 className="text-4xl font-black text-white mt-2">How VOUCH works</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Client */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="px-3 py-1 rounded-full text-sm font-semibold" style={{ background: 'rgba(29,122,80,0.2)', color: '#4ade80' }}>
                  For Clients
                </div>
              </div>
              <div className="space-y-6">
                {clientSteps.map((s, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                      style={{ background: '#1D7A50' }}>{s.n}</div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{s.title}</h4>
                      <p className="text-white/60 text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={goClient} className="mt-8 flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all hover:scale-105"
                style={{ background: '#1D7A50' }}>
                Book your first job <ArrowRight size={16} />
              </button>
            </div>

            {/* Worker */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="px-3 py-1 rounded-full text-sm font-semibold" style={{ background: 'rgba(212,168,83,0.2)', color: '#D4A853' }}>
                  For Providers
                </div>
              </div>
              <div className="space-y-6">
                {workerSteps.map((s, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-[#0F2B46] flex-shrink-0"
                      style={{ background: '#D4A853' }}>{s.n}</div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{s.title}</h4>
                      <p className="text-white/60 text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={goWorker} className="mt-8 flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                style={{ background: '#D4A853', color: '#0F2B46' }}>
                Start earning <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST & SAFETY ── */}
      <section id="trust" className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#1D7A50' }}>Our promise</span>
          <h2 className="text-4xl font-black mt-2" style={{ color: '#0F2B46' }}>Built on trust & safety</h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">VOUCH protects every job from first click to final payment.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {trustPoints.map((t, i) => (
            <div key={i} className="rounded-2xl p-6 bg-white flex gap-4" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(29,122,80,0.1)' }}>{t.icon}</div>
              <div>
                <h4 className="font-bold mb-1" style={{ color: '#0F2B46' }}>{t.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DIGNITY SECTION ── */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #1D7A50 0%, #0F2B46 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Heart size={40} className="mx-auto mb-6 text-white/80" />
          <h2 className="text-4xl font-black text-white mb-6">Professionals, not cheap labour.</h2>
          <p className="text-white/80 text-lg leading-relaxed mb-8">
            Every person on VOUCH is a skilled professional who deserves dignity, fair pay, and safe working conditions. We set fair minimum rates, protect every payment, and actively fight exploitation in informal work.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: <TrendingUp size={16} />, text: 'Fair minimum rates' },
              { icon: <Shield size={16} />, text: 'Payment protection' },
              { icon: <Award size={16} />, text: 'Skills recognition' },
              { icon: <Users size={16} />, text: 'Worker rights' },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-white/90 text-sm bg-white/10 px-4 py-2 rounded-full">
                {t.icon} {t.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#1D7A50' }}>Real voices</span>
          <h2 className="text-4xl font-black mt-2" style={{ color: '#0F2B46' }}>What people say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-6" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} fill="#D4A853" className="text-[#D4A853]" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{ background: '#F5F3EE' }}>{t.avatar}</div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: '#0F2B46' }}>{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.area}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-20 mx-6 rounded-3xl mb-12" style={{ background: '#0F2B46' }}>
        <div className="text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to get started?</h2>
          <p className="text-white/60 mb-8">Join thousands of South Africans who trust VOUCH every day.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={goClient} className="px-8 py-4 rounded-2xl text-white font-semibold text-lg transition-all hover:scale-105" style={{ background: '#1D7A50' }}>
              Book a service
            </button>
            <button onClick={goWorker} className="px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:scale-105" style={{ background: '#D4A853', color: '#0F2B46' }}>
              Become a provider
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0F2B46' }} className="px-6 pt-12 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm" style={{ background: '#1D7A50' }}>V</div>
                <span className="text-white text-xl font-bold">VOUCH</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">Trust-first. Dignity-first. South Africa's professional home services marketplace.</p>
            </div>
            {[
              { title: 'Clients', links: ['Book a service', 'How it works', 'Pricing', 'Disputes'] },
              { title: 'Providers', links: ['Apply now', 'VouchScore', 'Earnings', 'Safety'] },
              { title: 'Company', links: ['About VOUCH', 'Trust & Safety', 'Blog', 'Contact'] },
            ].map((col, i) => (
              <div key={i}>
                <h5 className="text-white font-semibold mb-4 text-sm">{col.title}</h5>
                <ul className="space-y-2">
                  {col.links.map((l, j) => (
                    <li key={j}><a href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-sm">© 2026 VOUCH Technologies (Pty) Ltd. All rights reserved.</p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((l, i) => (
                <a key={i} href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
