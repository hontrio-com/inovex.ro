import React from 'react';

interface PhoneMockupProps {
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const SIZE_CONFIG = {
  sm: { width: 240, borderRadius: 38, padding: '12px 8px', dynamicIslandW: 76, dynamicIslandH: 22, screenRadius: 28, homeW: 34 },
  md: { width: 280, borderRadius: 44, padding: '14px 10px', dynamicIslandW: 90, dynamicIslandH: 26, screenRadius: 34, homeW: 40 },
  lg: { width: 300, borderRadius: 46, padding: '15px 11px', dynamicIslandW: 96, dynamicIslandH: 28, screenRadius: 36, homeW: 44 },
};

export default function PhoneMockup({ size = 'md', children, className = '' }: PhoneMockupProps) {
  const cfg = SIZE_CONFIG[size];

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: cfg.width }}
    >
      {/* Left side buttons - volume */}
      <div
        style={{
          position: 'absolute',
          left: -4,
          top: 80,
          width: 4,
          height: 28,
          background: '#1a2030',
          borderRadius: '2px 0 0 2px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: -4,
          top: 118,
          width: 4,
          height: 28,
          background: '#1a2030',
          borderRadius: '2px 0 0 2px',
        }}
      />
      {/* Right side button - power */}
      <div
        style={{
          position: 'absolute',
          right: -4,
          top: 96,
          width: 4,
          height: 56,
          background: '#1a2030',
          borderRadius: '0 2px 2px 0',
        }}
      />

      {/* Phone body */}
      <div
        style={{
          width: '100%',
          background: '#0D1117',
          borderRadius: cfg.borderRadius,
          padding: cfg.padding,
          boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.35), inset 0 0 0 1.5px rgba(255,255,255,0.08)',
        }}
      >
        {/* Dynamic Island */}
        <div
          style={{
            width: cfg.dynamicIslandW,
            height: cfg.dynamicIslandH,
            background: '#000',
            borderRadius: 999,
            margin: '0 auto 8px',
          }}
        />

        {/* Screen container */}
        <div
          style={{
            background: '#fff',
            borderRadius: cfg.screenRadius,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {children}
        </div>

        {/* Home indicator */}
        <div
          style={{
            width: cfg.homeW,
            height: 4,
            background: '#E8ECF0',
            borderRadius: 999,
            margin: '8px auto 0',
          }}
        />
      </div>
    </div>
  );
}
