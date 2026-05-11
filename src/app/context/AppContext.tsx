import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole } from '../data/mockData';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  bookingStep: number;
  setBookingStep: (step: number) => void;
  bookingData: BookingData;
  setBookingData: (data: Partial<BookingData>) => void;
  workerAvailable: boolean;
  setWorkerAvailable: (val: boolean) => void;
}

export interface BookingData {
  service: string;
  serviceIcon: string;
  area: string;
  date: string;
  time: string;
  duration: number;
  notes: string;
  estimatedPrice: number;
  matchType: 'suggested' | 'post' | 'rebook';
  selectedWorkerId: string | null;
}

const defaultBooking: BookingData = {
  service: '',
  serviceIcon: '',
  area: '',
  date: '',
  time: '',
  duration: 3,
  notes: '',
  estimatedPrice: 0,
  matchType: 'suggested',
  selectedWorkerId: null,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('landing');
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingDataState] = useState<BookingData>(defaultBooking);
  const [workerAvailable, setWorkerAvailable] = useState(true);

  const setBookingData = (data: Partial<BookingData>) => {
    setBookingDataState(prev => ({ ...prev, ...data }));
  };

  return (
    <AppContext.Provider value={{
      role, setRole,
      bookingStep, setBookingStep,
      bookingData, setBookingData,
      workerAvailable, setWorkerAvailable,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
