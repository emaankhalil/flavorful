
import React from 'react';

export const PaletteIcon = ({ className = "w-6 h-6", color = "#FF6B6B" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill={color} opacity="0.2"/>
    <circle cx="8" cy="8" r="2" fill={color}/>
    <circle cx="16" cy="8" r="2" fill="#4ECDC4"/>
    <circle cx="8" cy="16" r="2" fill="#45B7D1"/>
    <circle cx="16" cy="16" r="2" fill="#96CEB4"/>
    <circle cx="12" cy="12" r="1.5" fill="#FFEAA7"/>
  </svg>
);

export const LightningIcon = ({ className = "w-6 h-6", color = "#FFA726" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" 
      fill={color}
      stroke={color}
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </svg>
);

export const RocketIcon = ({ className = "w-6 h-6", color = "#FF6B6B" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" 
      fill={color}
      opacity="0.6"
    />
    <path 
      d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" 
      fill={color}
    />
    <path 
      d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" 
      fill={color}
      opacity="0.8"
    />
    <path 
      d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" 
      fill={color}
      opacity="0.8"
    />
    <circle cx="16" cy="8" r="1" fill="#fff"/>
  </svg>
);

export const DesignToolsIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="6" height="6" rx="1" fill="#4ECDC4"/>
    <rect x="11" y="3" width="6" height="6" rx="1" fill="#FF6B6B"/>
    <rect x="19" y="3" width="2" height="6" rx="1" fill="#96CEB4"/>
    <rect x="3" y="11" width="6" height="6" rx="1" fill="#45B7D1"/>
    <rect x="11" y="11" width="10" height="2" rx="1" fill="#FFEAA7"/>
    <rect x="11" y="15" width="10" height="2" rx="1" fill="#FFA726"/>
  </svg>
);

export const BrandKitIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="16" rx="2" fill="#667eea" opacity="0.1"/>
    <rect x="4" y="6" width="4" height="3" rx="0.5" fill="#4ECDC4"/>
    <rect x="9" y="6" width="4" height="3" rx="0.5" fill="#FF6B6B"/>
    <rect x="14" y="6" width="4" height="3" rx="0.5" fill="#96CEB4"/>
    <rect x="4" y="11" width="6" height="1" rx="0.5" fill="#45B7D1"/>
    <rect x="4" y="13" width="8" height="1" rx="0.5" fill="#FFEAA7"/>
    <rect x="4" y="15" width="4" height="1" rx="0.5" fill="#FFA726"/>
    <circle cx="18" cy="14" r="2" fill="#667eea" opacity="0.3"/>
    <path d="M17 14l1 1 2-2" stroke="#667eea" strokeWidth="1.5" fill="none"/>
  </svg>
);
