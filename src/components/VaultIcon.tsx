import React from "react";

interface VaultIconProps {
  className?: string;
  size?: number;
}

export const VaultIcon: React.FC<VaultIconProps> = ({ className = "w-8 h-8", size }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <defs>
        {/* Glow Filters */}
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="vaultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="coreGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {/* Outer Hexagonal Shield */}
      <polygon
        points="50,4 90,26 90,74 50,96 10,74 10,26"
        stroke="url(#vaultGradient)"
        strokeWidth="3.5"
        strokeLinejoin="round"
        fill="#030712"
        fillOpacity="0.85"
        filter="url(#neonGlow)"
      />

      {/* Cyber Inner Geometry */}
      <polygon
        points="50,14 80,31 80,69 50,86 20,69 20,31"
        stroke="#1e293b"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 2"
      />

      {/* Neural Nexus Paths */}
      <path
        d="M50 14 L50 35 M20 31 L38 42 M80 31 L62 42 M20 69 L38 58 M80 69 L62 58 M50 86 L50 65"
        stroke="url(#vaultGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Core Cryptographic Zero-Knowledge Padlock */}
      <rect
        x="38"
        y="46"
        width="24"
        height="18"
        rx="4"
        fill="url(#coreGradient)"
        filter="url(#neonGlow)"
      />
      {/* Padlock Shackle */}
      <path
        d="M43 46 V40 C43 36.134 46.134 33 50 33 C53.866 33 57 36.134 57 40 V46"
        stroke="#06b6d4"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Glowing Keyhole / AI Synapse */}
      <circle cx="50" cy="53" r="2.5" fill="#030712" />
      <path d="M50 54 L50 60" stroke="#030712" strokeWidth="2" strokeLinecap="round" />

      {/* Ambient Pulsing Satellite Nodes */}
      <circle cx="50" cy="14" r="3" fill="#06b6d4" className="animate-ping" style={{ transformOrigin: '50px 14px' }} />
      <circle cx="90" cy="50" r="2.5" fill="#8b5cf6" />
      <circle cx="10" cy="50" r="2.5" fill="#3b82f6" />
    </svg>
  );
};
