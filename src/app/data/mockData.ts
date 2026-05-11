// VOUCH Mock Data — South African Informal Labour Marketplace

export type UserRole = 'landing' | 'client' | 'worker' | 'admin';

export type JobStatus =
  | 'DRAFT' | 'POSTED' | 'MATCHING' | 'ACCEPTED' | 'CONFIRMED'
  | 'PAYMENT_HELD' | 'EN_ROUTE' | 'CHECKED_IN' | 'IN_PROGRESS'
  | 'CHECKED_OUT' | 'REVIEW' | 'COMPLETED' | 'CANCELLED'
  | 'NO_SHOW' | 'DISPUTED' | 'REFUNDED' | 'SAFETY_ESCALATED';

export type VerificationLevel = 'New' | 'Basic' | 'Reliable' | 'Job Verified' | 'Trusted Pro';

export interface Worker {
  id: string;
  name: string;
  photo: string;
  rating: number;
  jobsCompleted: number;
  vouchScore: number;
  skills: string[];
  area: string;
  city: string;
  distance: string;
  level: VerificationLevel;
  available: boolean;
  hourlyRate: number;
  bio: string;
  phone: string;
  joinedDate: string;
  punctuality: number;
  repeatClients: number;
  cancellations: number;
  vouches: number;
  earnings: number;
  todayEarnings: number;
  weekEarnings: number;
  verificationStatus: 'pending' | 'approved' | 'rejected';
}

export interface Client {
  id: string;
  name: string;
  photo: string;
  area: string;
  trustScore: number;
  bookings: number;
  disputes: number;
  payments: number;
  cancellations: number;
  memberSince: string;
}

export interface JobEvent {
  id: string;
  status: JobStatus;
  timestamp: string;
  note?: string;
}

export interface Job {
  id: string;
  service: string;
  serviceIcon: string;
  status: JobStatus;
  clientId: string;
  workerId: string | null;
  area: string;
  city: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  notes: string;
  events: JobEvent[];
  matchScore?: number;
  paymentStatus: 'pending' | 'held' | 'released' | 'refunded';
}

export interface Review {
  id: string;
  jobId: string;
  fromName: string;
  fromPhoto: string;
  rating: number;
  comment: string;
  date: string;
  type: 'client_to_worker' | 'worker_to_client';
}

export interface Dispute {
  id: string;
  jobId: string;
  raisedBy: string;
  raisedByType: 'client' | 'worker';
  reason: string;
  description: string;
  status: 'open' | 'under_review' | 'resolved' | 'escalated';
  createdAt: string;
  amount: number;
  resolution?: string;
}

export interface SafetyIncident {
  id: string;
  jobId: string;
  raisedBy: string;
  raisedByType: 'client' | 'worker';
  type: 'unsafe_feeling' | 'no_show' | 'harassment' | 'property_damage' | 'other';
  description: string;
  status: 'urgent' | 'under_review' | 'resolved';
  createdAt: string;
}

export interface PaymentEntry {
  id: string;
  jobId: string;
  amount: number;
  type: 'booking' | 'payout' | 'refund' | 'platform_fee';
  status: 'pending' | 'held' | 'released' | 'refunded';
  date: string;
  description: string;
  worker?: string;
  client?: string;
}

// ── WORKERS ──────────────────────────────────────────────────────────────────

export const workers: Worker[] = [
  {
    id: 'w1',
    name: 'Nomsa Dlamini',
    photo: 'https://images.unsplash.com/photo-1741874570282-633b9187be3b?w=200&h=200&fit=crop&crop=face',
    rating: 4.9,
    jobsCompleted: 234,
    vouchScore: 96,
    skills: ['Deep Cleaning', 'Ironing', 'Laundry'],
    area: 'Sandton',
    city: 'Johannesburg',
    distance: '2.3 km',
    level: 'Trusted Pro',
    available: true,
    hourlyRate: 85,
    bio: 'Professional cleaner with 6 years of experience. Meticulous, reliable, and always on time.',
    phone: '+27 71 234 5678',
    joinedDate: '2021-03-15',
    punctuality: 98,
    repeatClients: 45,
    cancellations: 2,
    vouches: 38,
    earnings: 18420,
    todayEarnings: 340,
    weekEarnings: 1190,
    verificationStatus: 'approved',
  },
  {
    id: 'w2',
    name: 'Sipho Mkhize',
    photo: 'https://images.unsplash.com/photo-1651001525995-b7171e96eef8?w=200&h=200&fit=crop&crop=face',
    rating: 4.8,
    jobsCompleted: 187,
    vouchScore: 91,
    skills: ['Gardening', 'Landscaping', 'Tree Trimming'],
    area: 'Rondebosch',
    city: 'Cape Town',
    distance: '1.8 km',
    level: 'Trusted Pro',
    available: true,
    hourlyRate: 75,
    bio: 'Passionate gardener who transforms outdoor spaces. Expert in indigenous plants and water-wise gardens.',
    phone: '+27 82 345 6789',
    joinedDate: '2021-07-20',
    punctuality: 95,
    repeatClients: 32,
    cancellations: 4,
    vouches: 29,
    earnings: 14050,
    todayEarnings: 225,
    weekEarnings: 975,
    verificationStatus: 'approved',
  },
  {
    id: 'w3',
    name: 'Thandi Nkosi',
    photo: 'https://images.unsplash.com/photo-1610722840281-7e85407dc120?w=200&h=200&fit=crop&crop=face',
    rating: 4.7,
    jobsCompleted: 142,
    vouchScore: 85,
    skills: ['Cleaning', 'Ironing', 'Childminding'],
    area: 'Berea',
    city: 'Durban',
    distance: '3.1 km',
    level: 'Job Verified',
    available: true,
    hourlyRate: 70,
    bio: 'Caring and thorough home support specialist. Great with families and pets.',
    phone: '+27 73 456 7890',
    joinedDate: '2022-01-10',
    punctuality: 92,
    repeatClients: 21,
    cancellations: 6,
    vouches: 17,
    earnings: 9940,
    todayEarnings: 0,
    weekEarnings: 560,
    verificationStatus: 'approved',
  },
  {
    id: 'w4',
    name: 'Bongani Sithole',
    photo: 'https://images.unsplash.com/photo-1688372198189-de6a51777a81?w=200&h=200&fit=crop&crop=face',
    rating: 4.6,
    jobsCompleted: 98,
    vouchScore: 79,
    skills: ['Painting', 'Plastering', 'Tiling'],
    area: 'Centurion',
    city: 'Pretoria',
    distance: '4.2 km',
    level: 'Reliable',
    available: false,
    hourlyRate: 90,
    bio: 'Skilled painter and handyman. Quality finishes, no shortcuts. 8 years in the trade.',
    phone: '+27 84 567 8901',
    joinedDate: '2022-05-03',
    punctuality: 88,
    repeatClients: 14,
    cancellations: 8,
    vouches: 12,
    earnings: 8820,
    todayEarnings: 0,
    weekEarnings: 270,
    verificationStatus: 'approved',
  },
  {
    id: 'w5',
    name: 'Lerato Mokoena',
    photo: 'https://images.unsplash.com/photo-1651001525995-b7171e96eef8?w=200&h=200&fit=crop&crop=face',
    rating: 4.5,
    jobsCompleted: 63,
    vouchScore: 71,
    skills: ['Moving', 'Packing', 'Furniture Assembly'],
    area: 'Braamfontein',
    city: 'Johannesburg',
    distance: '5.7 km',
    level: 'Reliable',
    available: true,
    hourlyRate: 80,
    bio: 'Strong, careful, and efficient. I handle your belongings like my own.',
    phone: '+27 76 678 9012',
    joinedDate: '2022-09-14',
    punctuality: 90,
    repeatClients: 9,
    cancellations: 5,
    vouches: 8,
    earnings: 5040,
    todayEarnings: 160,
    weekEarnings: 480,
    verificationStatus: 'pending',
  },
  {
    id: 'w6',
    name: 'Ayanda Cele',
    photo: 'https://images.unsplash.com/photo-1741874570282-633b9187be3b?w=200&h=200&fit=crop&crop=face',
    rating: 4.3,
    jobsCompleted: 28,
    vouchScore: 58,
    skills: ['Cleaning', 'Cooking', 'Grocery Shopping'],
    area: 'Observatory',
    city: 'Cape Town',
    distance: '2.9 km',
    level: 'Basic',
    available: true,
    hourlyRate: 65,
    bio: 'Friendly and hardworking home support provider. Building my reputation one job at a time.',
    phone: '+27 79 789 0123',
    joinedDate: '2023-04-22',
    punctuality: 85,
    repeatClients: 5,
    cancellations: 3,
    vouches: 4,
    earnings: 1820,
    todayEarnings: 0,
    weekEarnings: 195,
    verificationStatus: 'approved',
  },
];

// ── CLIENTS ───────────────────────────────────────────────────────────────────

export const clients: Client[] = [
  {
    id: 'c1',
    name: 'Priya Naidoo',
    photo: 'https://images.unsplash.com/photo-1610722840281-7e85407dc120?w=200&h=200&fit=crop&crop=face',
    area: 'Sandton, JHB',
    trustScore: 94,
    bookings: 31,
    disputes: 0,
    payments: 31,
    cancellations: 1,
    memberSince: '2021-06-01',
  },
  {
    id: 'c2',
    name: 'James van der Merwe',
    photo: 'https://images.unsplash.com/photo-1651001525995-b7171e96eef8?w=200&h=200&fit=crop&crop=face',
    area: 'Rondebosch, CPT',
    trustScore: 87,
    bookings: 18,
    disputes: 1,
    payments: 17,
    cancellations: 2,
    memberSince: '2022-01-14',
  },
  {
    id: 'c3',
    name: 'Fatima Osman',
    photo: 'https://images.unsplash.com/photo-1741874570282-633b9187be3b?w=200&h=200&fit=crop&crop=face',
    area: 'Berea, DBN',
    trustScore: 91,
    bookings: 24,
    disputes: 0,
    payments: 24,
    cancellations: 0,
    memberSince: '2021-11-08',
  },
];

// ── JOBS ──────────────────────────────────────────────────────────────────────

export const jobs: Job[] = [
  {
    id: 'j1',
    service: 'Deep Cleaning',
    serviceIcon: '🧹',
    status: 'IN_PROGRESS',
    clientId: 'c1',
    workerId: 'w1',
    area: 'Sandton',
    city: 'Johannesburg',
    date: '2026-05-10',
    time: '09:00',
    duration: 4,
    price: 340,
    notes: 'Please focus on kitchen and bathrooms. Dog on premises, very friendly.',
    paymentStatus: 'held',
    events: [
      { id: 'e1', status: 'POSTED', timestamp: '2026-05-09T14:00:00', note: 'Job posted by client' },
      { id: 'e2', status: 'ACCEPTED', timestamp: '2026-05-09T15:30:00', note: 'Nomsa accepted the job' },
      { id: 'e3', status: 'PAYMENT_HELD', timestamp: '2026-05-09T16:00:00', note: 'Payment of R340 held securely' },
      { id: 'e4', status: 'EN_ROUTE', timestamp: '2026-05-10T08:30:00', note: 'Nomsa is on her way' },
      { id: 'e5', status: 'CHECKED_IN', timestamp: '2026-05-10T09:05:00', note: 'Nomsa checked in at the property' },
      { id: 'e6', status: 'IN_PROGRESS', timestamp: '2026-05-10T09:05:00', note: 'Job in progress' },
    ],
  },
  {
    id: 'j2',
    service: 'Gardening',
    serviceIcon: '🌿',
    status: 'CONFIRMED',
    clientId: 'c2',
    workerId: 'w2',
    area: 'Rondebosch',
    city: 'Cape Town',
    date: '2026-05-12',
    time: '08:00',
    duration: 5,
    price: 375,
    notes: 'Lawn needs mowing, hedges trimming, and weeding in the vegetable garden.',
    paymentStatus: 'held',
    events: [
      { id: 'e7', status: 'POSTED', timestamp: '2026-05-08T10:00:00' },
      { id: 'e8', status: 'ACCEPTED', timestamp: '2026-05-08T11:00:00', note: 'Sipho accepted' },
      { id: 'e9', status: 'PAYMENT_HELD', timestamp: '2026-05-08T11:30:00' },
      { id: 'e10', status: 'CONFIRMED', timestamp: '2026-05-08T11:30:00', note: 'Booking confirmed for Monday' },
    ],
  },
  {
    id: 'j3',
    service: 'Painting',
    serviceIcon: '🎨',
    status: 'POSTED',
    clientId: 'c3',
    workerId: null,
    area: 'Berea',
    city: 'Durban',
    date: '2026-05-15',
    time: '07:00',
    duration: 8,
    price: 720,
    notes: '2 bedroom walls. Client has own paint. Need preparation and 2 coats.',
    paymentStatus: 'pending',
    events: [
      { id: 'e11', status: 'POSTED', timestamp: '2026-05-10T08:00:00', note: 'Job posted — matching in progress' },
    ],
  },
  {
    id: 'j4',
    service: 'Moving Help',
    serviceIcon: '📦',
    status: 'COMPLETED',
    clientId: 'c1',
    workerId: 'w5',
    area: 'Braamfontein',
    city: 'Johannesburg',
    date: '2026-05-05',
    time: '07:00',
    duration: 6,
    price: 480,
    notes: '2-bedroom flat. Everything packed, just need help loading and unloading.',
    paymentStatus: 'released',
    events: [
      { id: 'e12', status: 'POSTED', timestamp: '2026-05-03T09:00:00' },
      { id: 'e13', status: 'ACCEPTED', timestamp: '2026-05-03T09:45:00' },
      { id: 'e14', status: 'PAYMENT_HELD', timestamp: '2026-05-03T10:00:00' },
      { id: 'e15', status: 'CONFIRMED', timestamp: '2026-05-03T10:00:00' },
      { id: 'e16', status: 'EN_ROUTE', timestamp: '2026-05-05T06:40:00' },
      { id: 'e17', status: 'CHECKED_IN', timestamp: '2026-05-05T07:05:00' },
      { id: 'e18', status: 'IN_PROGRESS', timestamp: '2026-05-05T07:05:00' },
      { id: 'e19', status: 'CHECKED_OUT', timestamp: '2026-05-05T13:20:00' },
      { id: 'e20', status: 'REVIEW', timestamp: '2026-05-05T13:25:00' },
      { id: 'e21', status: 'COMPLETED', timestamp: '2026-05-05T14:00:00', note: 'Payment of R480 released to Lerato' },
    ],
  },
  {
    id: 'j5',
    service: 'Ironing',
    serviceIcon: '👕',
    status: 'DISPUTED',
    clientId: 'c2',
    workerId: 'w3',
    area: 'Rondebosch',
    city: 'Cape Town',
    date: '2026-05-07',
    time: '10:00',
    duration: 3,
    price: 210,
    notes: '15 items — shirts and dress pants',
    paymentStatus: 'held',
    events: [
      { id: 'e22', status: 'POSTED', timestamp: '2026-05-06T12:00:00' },
      { id: 'e23', status: 'ACCEPTED', timestamp: '2026-05-06T12:30:00' },
      { id: 'e24', status: 'PAYMENT_HELD', timestamp: '2026-05-06T13:00:00' },
      { id: 'e25', status: 'CONFIRMED', timestamp: '2026-05-06T13:00:00' },
      { id: 'e26', status: 'CHECKED_IN', timestamp: '2026-05-07T10:10:00' },
      { id: 'e27', status: 'DISPUTED', timestamp: '2026-05-07T14:00:00', note: 'Client raised a quality dispute' },
    ],
  },
  {
    id: 'j6',
    service: 'Cleaning',
    serviceIcon: '🧹',
    status: 'MATCHING',
    clientId: 'c1',
    workerId: null,
    area: 'Hyde Park',
    city: 'Johannesburg',
    date: '2026-05-14',
    time: '09:00',
    duration: 3,
    price: 255,
    notes: 'Regular weekly clean. Standard 3-bed home.',
    paymentStatus: 'pending',
    events: [
      { id: 'e28', status: 'POSTED', timestamp: '2026-05-10T11:00:00' },
      { id: 'e29', status: 'MATCHING', timestamp: '2026-05-10T11:01:00', note: 'Finding best match in your area' },
    ],
  },
];

// ── REVIEWS ───────────────────────────────────────────────────────────────────

export const reviews: Review[] = [
  {
    id: 'r1',
    jobId: 'j4',
    fromName: 'Priya N.',
    fromPhoto: 'https://images.unsplash.com/photo-1610722840281-7e85407dc120?w=60&h=60&fit=crop&crop=face',
    rating: 5,
    comment: 'Nomsa is absolutely exceptional. The house was spotless when she finished — every corner, every surface. I\'ve already rebooked for next week.',
    date: '2026-05-06',
    type: 'client_to_worker',
  },
  {
    id: 'r2',
    jobId: 'j2',
    fromName: 'James vdM.',
    fromPhoto: 'https://images.unsplash.com/photo-1651001525995-b7171e96eef8?w=60&h=60&fit=crop&crop=face',
    rating: 5,
    comment: 'Sipho transformed our garden in one session. Professional, thorough, and really knows plants. Will book again.',
    date: '2026-04-28',
    type: 'client_to_worker',
  },
  {
    id: 'r3',
    jobId: 'j4',
    fromName: 'Nomsa D.',
    fromPhoto: 'https://images.unsplash.com/photo-1741874570282-633b9187be3b?w=60&h=60&fit=crop&crop=face',
    rating: 5,
    comment: 'Priya is a great client. Clear instructions, respectful, and payment was instant. Highly recommend.',
    date: '2026-05-06',
    type: 'worker_to_client',
  },
];

// ── DISPUTES ──────────────────────────────────────────────────────────────────

export const disputes: Dispute[] = [
  {
    id: 'd1',
    jobId: 'j5',
    raisedBy: 'James van der Merwe',
    raisedByType: 'client',
    reason: 'Quality of work',
    description: 'Several shirts were returned with scorch marks. The ironing quality was well below expectation.',
    status: 'under_review',
    createdAt: '2026-05-07T14:00:00',
    amount: 210,
    resolution: undefined,
  },
  {
    id: 'd2',
    jobId: 'j4',
    raisedBy: 'Lerato Mokoena',
    raisedByType: 'worker',
    reason: 'Job scope changed',
    description: 'Client added a 3rd floor not mentioned in the booking. I completed it but need additional compensation.',
    status: 'resolved',
    createdAt: '2026-05-05T16:00:00',
    amount: 80,
    resolution: 'Additional R80 approved and paid out to worker.',
  },
];

// ── SAFETY INCIDENTS ──────────────────────────────────────────────────────────

export const safetyIncidents: SafetyIncident[] = [
  {
    id: 's1',
    jobId: 'j3',
    raisedBy: 'Thandi Nkosi',
    raisedByType: 'worker',
    type: 'unsafe_feeling',
    description: 'Client was verbally aggressive when I arrived. I felt uncomfortable and ended the job.',
    status: 'urgent',
    createdAt: '2026-05-07T11:00:00',
  },
];

// ── PAYMENT LEDGER ────────────────────────────────────────────────────────────

export const payments: PaymentEntry[] = [
  { id: 'p1', jobId: 'j1', amount: 340, type: 'booking', status: 'held', date: '2026-05-09', description: 'Deep Cleaning – Sandton', client: 'Priya Naidoo' },
  { id: 'p2', jobId: 'j2', amount: 375, type: 'booking', status: 'held', date: '2026-05-08', description: 'Gardening – Rondebosch', client: 'James van der Merwe' },
  { id: 'p3', jobId: 'j4', amount: 480, type: 'payout', status: 'released', date: '2026-05-05', description: 'Moving Help – Braamfontein payout', worker: 'Lerato Mokoena' },
  { id: 'p4', jobId: 'j4', amount: 48, type: 'platform_fee', status: 'released', date: '2026-05-05', description: 'Platform fee (10%)' },
  { id: 'p5', jobId: 'j5', amount: 210, type: 'booking', status: 'held', date: '2026-05-06', description: 'Ironing – Rondebosch (disputed)', client: 'James van der Merwe' },
  { id: 'p6', jobId: 'j6', amount: 255, type: 'booking', status: 'pending', date: '2026-05-10', description: 'Cleaning – Hyde Park', client: 'Priya Naidoo' },
];

// ── MARKETPLACE METRICS ───────────────────────────────────────────────────────

export const marketplaceMetrics = {
  totalJobs: 1847,
  activeJobs: 23,
  completedJobs: 1718,
  disputeRate: 2.1,
  averageRating: 4.74,
  totalWorkers: 342,
  activeWorkers: 189,
  totalClients: 891,
  totalRevenue: 284500,
  platformFee: 28450,
  pendingPayouts: 18420,
};

export const dailyBookings = [
  { date: 'Mon', bookings: 34, revenue: 2890 },
  { date: 'Tue', bookings: 41, revenue: 3480 },
  { date: 'Wed', bookings: 38, revenue: 3220 },
  { date: 'Thu', bookings: 52, revenue: 4420 },
  { date: 'Fri', bookings: 61, revenue: 5190 },
  { date: 'Sat', bookings: 78, revenue: 6630 },
  { date: 'Sun', bookings: 44, revenue: 3740 },
];

export const serviceBreakdown = [
  { service: 'Cleaning', jobs: 642, pct: 34.8 },
  { service: 'Gardening', jobs: 389, pct: 21.1 },
  { service: 'Ironing', jobs: 276, pct: 14.9 },
  { service: 'Painting', jobs: 198, pct: 10.7 },
  { service: 'Moving', jobs: 187, pct: 10.1 },
  { service: 'Home Support', jobs: 155, pct: 8.4 },
];

export const workerLevels = [
  { level: 'New', count: 78, color: '#94a3b8' },
  { level: 'Basic', count: 91, color: '#60a5fa' },
  { level: 'Reliable', count: 87, color: '#34d399' },
  { level: 'Job Verified', count: 54, color: '#D4A853' },
  { level: 'Trusted Pro', count: 32, color: '#1D7A50' },
];

// ── CURRENT USER (mock logged-in state) ───────────────────────────────────────

export const currentClient: Client = clients[0];
export const currentWorker: Worker = workers[0];

export const services = [
  { id: 's1', name: 'Cleaning', icon: '🧹', description: 'Home, deep, spring clean', basePrice: 65, unit: '/hr' },
  { id: 's2', name: 'Ironing', icon: '👕', description: 'Shirts, dresses, linen', basePrice: 55, unit: '/hr' },
  { id: 's3', name: 'Gardening', icon: '🌿', description: 'Mowing, trimming, planting', basePrice: 70, unit: '/hr' },
  { id: 's4', name: 'Moving', icon: '📦', description: 'Packing, loading, assembly', basePrice: 80, unit: '/hr' },
  { id: 's5', name: 'Painting', icon: '🎨', description: 'Interior, exterior, prep', basePrice: 90, unit: '/hr' },
  { id: 's6', name: 'Home Support', icon: '🏠', description: 'Cooking, errands, general', basePrice: 60, unit: '/hr' },
];
