import React from 'react';

interface RetroFrameRendererProps {
  type: string;
  color: string;
  accentColor: string;
  className?: string;
}

export const RetroFrameRenderer: React.FC<RetroFrameRendererProps> = ({
  type,
  color,
  accentColor,
  className = ''
}) => {
  if (type === 'filete-duplo') {
    return (
      <div className={`pointer-events-none absolute inset-0 z-10 p-3 sm:p-5 ${className}`}>
        <div
          className="relative h-full w-full border-2 border-double transition-colors"
          style={{ borderColor: color, borderWidth: '5px' }}
        >
          {/* Inner thin line */}
          <div
            className="absolute inset-1.5 border border-dashed opacity-75"
            style={{ borderColor: accentColor }}
          />

          {/* Top-Left Corner Ornament */}
          <svg
            className="absolute -top-3.5 -left-3.5 h-7 w-7"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="2" y="2" width="28" height="28" fill="#FAF6EE" stroke={color} strokeWidth="2" />
            <polygon points="16,4 28,16 16,28 4,16" fill={accentColor} />
            <circle cx="16" cy="16" r="3" fill="#FAF6EE" stroke={color} strokeWidth="1" />
          </svg>

          {/* Top-Right Corner Ornament */}
          <svg
            className="absolute -top-3.5 -right-3.5 h-7 w-7"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="2" y="2" width="28" height="28" fill="#FAF6EE" stroke={color} strokeWidth="2" />
            <polygon points="16,4 28,16 16,28 4,16" fill={accentColor} />
            <circle cx="16" cy="16" r="3" fill="#FAF6EE" stroke={color} strokeWidth="1" />
          </svg>

          {/* Bottom-Left Corner Ornament */}
          <svg
            className="absolute -bottom-3.5 -left-3.5 h-7 w-7"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="2" y="2" width="28" height="28" fill="#FAF6EE" stroke={color} strokeWidth="2" />
            <polygon points="16,4 28,16 16,28 4,16" fill={accentColor} />
            <circle cx="16" cy="16" r="3" fill="#FAF6EE" stroke={color} strokeWidth="1" />
          </svg>

          {/* Bottom-Right Corner Ornament */}
          <svg
            className="absolute -bottom-3.5 -right-3.5 h-7 w-7"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="2" y="2" width="28" height="28" fill="#FAF6EE" stroke={color} strokeWidth="2" />
            <polygon points="16,4 28,16 16,28 4,16" fill={accentColor} />
            <circle cx="16" cy="16" r="3" fill="#FAF6EE" stroke={color} strokeWidth="1" />
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'selo-recorte') {
    return (
      <div className={`pointer-events-none absolute inset-0 z-10 p-3 sm:p-4 ${className}`}>
        <div
          className="relative h-full w-full border-2 border-dashed transition-colors"
          style={{ borderColor: color, strokeDasharray: '6 4' }}
        >
          {/* Scissors Icon on Top Edge */}
          <div
            className="absolute -top-3.5 left-10 flex items-center gap-1.5 bg-[#FAF6EE] px-2 text-[10px] font-bold tracking-widest uppercase"
            style={{ color }}
          >
            <span>✂</span>
            <span>RECORTE & REMETA</span>
          </div>

          <div
            className="absolute -bottom-3 right-8 bg-[#FAF6EE] px-2 text-[9px] font-bold tracking-widest uppercase"
            style={{ color: accentColor }}
          >
            ★ CUPOM OFICIAL ★
          </div>
        </div>
      </div>
    );
  }

  if (type === 'googie-starburst') {
    return (
      <div className={`pointer-events-none absolute inset-0 z-10 p-3 sm:p-5 ${className}`}>
        <div
          className="relative h-full w-full border border-solid"
          style={{ borderColor: color, borderWidth: '2px' }}
        >
          {/* Atomic Starburst 4-point in corners */}
          {['top-1 left-1', 'top-1 right-1', 'bottom-1 left-1', 'bottom-1 right-1'].map((pos, i) => (
            <svg
              key={i}
              className={`absolute h-6 w-6 ${pos}`}
              viewBox="0 0 24 24"
              fill={accentColor}
            >
              {/* Starburst */}
              <path d="M12,0 L14,9 L23,12 L14,15 L12,24 L10,15 L1,12 L10,9 Z" />
              <circle cx="12" cy="12" r="2" fill="#FAF6EE" />
            </svg>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'cameo-oval') {
    return (
      <div className={`pointer-events-none absolute inset-0 z-10 p-3 sm:p-4 ${className}`}>
        <div
          className="relative h-full w-full rounded-2xl border-2"
          style={{ borderColor: color }}
        >
          <div
            className="absolute inset-2 rounded-xl border border-double"
            style={{ borderColor: accentColor, borderWidth: '3px' }}
          />
          {/* Top medallion */}
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FAF6EE] px-3 text-[10px] font-serif tracking-widest uppercase"
            style={{ color }}
          >
            ✦ DISTINCTO & LEGÍTIMO ✦
          </div>
        </div>
      </div>
    );
  }

  if (type === 'pop-art-offset') {
    return (
      <div className={`pointer-events-none absolute inset-0 z-10 p-2 sm:p-3 ${className}`}>
        <div
          className="relative h-full w-full border-4 shadow-sm"
          style={{ borderColor: color }}
        >
          <div
            className="absolute top-0 right-0 left-0 h-2"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, ${accentColor}, ${accentColor} 8px, transparent 8px, transparent 16px)`
            }}
          />
          <div
            className="absolute right-0 bottom-0 left-0 h-2"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, ${accentColor}, ${accentColor} 8px, transparent 8px, transparent 16px)`
            }}
          />
        </div>
      </div>
    );
  }

  // Default: press-block (1960s strong graphic border)
  return (
    <div className={`pointer-events-none absolute inset-0 z-10 p-2.5 sm:p-4 ${className}`}>
      <div
        className="relative h-full w-full border-4"
        style={{ borderColor: color }}
      >
        <div
          className="absolute inset-1 border"
          style={{ borderColor: color }}
        />
      </div>
    </div>
  );
};
