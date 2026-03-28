import React from 'react';

interface Props {
  frameType: string;
  glassType: string;
  color: string;
}

const glassOpacity: Record<string, number> = {
  single: 0.15,
  double: 0.22,
  triple: 0.3,
};

const frameShapes: Record<string, { divider: boolean; arch: boolean }> = {
  aluminum: { divider: true, arch: false },
  pvc: { divider: false, arch: false },
  wood: { divider: true, arch: true },
};

const WindowPreview: React.FC<Props> = ({ frameType, glassType, color }) => {
  const opacity = glassOpacity[glassType] || 0.2;
  const shape = frameShapes[frameType] || frameShapes.aluminum;

  return (
    <svg viewBox="0 0 300 400" width="280" xmlns="http://www.w3.org/2000/svg">
      {/* Outer frame */}
      <rect x="20" y={shape.arch ? "40" : "20"} width="260" height={shape.arch ? "360" : "360"} rx="2" fill="none" stroke={color} strokeWidth="12" />

      {/* Sill */}
      <rect x="10" y="375" width="280" height="12" rx="1" fill={color} />

      {/* Glass panes */}
      <rect x="32" y={shape.arch ? "52" : "32"} width="236" height="335" rx="1" fill={`rgba(173, 216, 230, ${opacity})`} />

      {/* Glass reflection */}
      <line x1="50" y1={shape.arch ? "70" : "50"} x2="80" y2={shape.arch ? "180" : "160"} stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <line x1="60" y1={shape.arch ? "70" : "50"} x2="90" y2={shape.arch ? "180" : "160"} stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

      {/* Center divider for aluminum and wood */}
      {shape.divider && (
        <line x1="150" y1={shape.arch ? "52" : "32"} x2="150" y2="367" stroke={color} strokeWidth="8" />
      )}

      {/* Horizontal divider for wood */}
      {shape.arch && (
        <line x1="32" y1="200" x2="268" y2="200" stroke={color} strokeWidth="8" />
      )}

      {/* Handle */}
      <rect x="245" y="190" width="8" height="30" rx="4" fill={color} opacity="0.7" />

      {/* Double/triple glass indicator lines */}
      {glassType === 'double' && (
        <>
          <line x1="32" y1="367" x2="32" y2="362" stroke={color} strokeWidth="2" />
          <line x1="268" y1="367" x2="268" y2="362" stroke={color} strokeWidth="2" />
        </>
      )}
      {glassType === 'triple' && (
        <>
          <line x1="32" y1="367" x2="32" y2="358" stroke={color} strokeWidth="2" />
          <line x1="268" y1="367" x2="268" y2="358" stroke={color} strokeWidth="2" />
          <rect x="28" y="360" width="8" height="3" fill={color} opacity="0.4" />
          <rect x="264" y="360" width="8" height="3" fill={color} opacity="0.4" />
        </>
      )}

      {/* Frame type label */}
      <text x="150" y="398" textAnchor="middle" fontSize="10" fill="#888" fontFamily="Instrument Sans, sans-serif">
        {frameType.toUpperCase()} FRAME
      </text>
    </svg>
  );
};

export default WindowPreview;
