import { Check } from 'lucide-react';

interface VouchLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export function VouchLogo({ variant = 'light', size = 'md' }: VouchLogoProps) {
  const sizes = {
    sm: { icon: 24, check: 14, text: 16 },
    md: { icon: 32, check: 18, text: 22 },
    lg: { icon: 44, check: 26, text: 32 },
  };
  const s = sizes[size];
  const textColor = variant === 'light' ? '#FFFFFF' : '#0D1B2A';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: s.icon,
        height: s.icon,
        borderRadius: s.icon * 0.28,
        background: '#D4A843',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Check size={s.check} color="#0D1B2A" strokeWidth={3} />
      </div>
      <span style={{
        fontSize: s.text,
        fontWeight: 900,
        letterSpacing: '0.08em',
        color: textColor,
        fontFamily: 'Inter, sans-serif',
      }}>
        VOUCH
      </span>
    </div>
  );
}
