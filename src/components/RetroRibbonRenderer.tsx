import React from 'react';
import { RetroRibbon } from '../types/retro';

interface RetroRibbonRendererProps {
  ribbon: RetroRibbon;
  primaryColor?: string;
  accentColor?: string;
}

export const RetroRibbonRenderer: React.FC<RetroRibbonRendererProps> = ({
  ribbon,
  primaryColor = '#B83227',
  accentColor = '#CBA135'
}) => {
  if (ribbon.position === 'top-left') {
    return (
      <div className="absolute -top-1 -left-1 z-20 overflow-hidden w-28 h-28 pointer-events-none">
        <div
          className="absolute -left-8 top-5 w-36 -rotate-45 py-1 text-center text-[10px] font-bold tracking-wider text-white shadow-md uppercase"
          style={{
            backgroundColor: ribbon.colorScheme === 'gold' ? accentColor : primaryColor,
            borderBottom: '2px solid rgba(0,0,0,0.25)',
            borderTop: '1px solid rgba(255,255,255,0.3)'
          }}
        >
          {ribbon.text}
        </div>
      </div>
    );
  }

  if (ribbon.position === 'top-right') {
    // Gold Rosette / Seal
    return (
      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <div
          className="relative flex h-14 w-14 items-center justify-center rounded-full text-center shadow-md border-2 border-white/80"
          style={{
            backgroundColor: ribbon.colorScheme === 'gold' ? '#cfa643' : primaryColor,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)'
          }}
        >
          {/* Jagged outer ring simulation */}
          <div className="absolute inset-0.5 rounded-full border border-dashed border-white/60" />
          <div className="px-1 text-[8px] font-extrabold uppercase leading-tight text-white tracking-wider">
            {ribbon.text}
          </div>
        </div>
      </div>
    );
  }

  if (ribbon.position === 'center-seal') {
    // Vintage Ink Stamp
    return (
      <div className="absolute bottom-16 right-5 z-20 pointer-events-none rotate-[-12deg] opacity-90">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed p-1 text-center"
          style={{ borderColor: primaryColor, color: primaryColor }}
        >
          <div
            className="flex h-full w-full items-center justify-center rounded-full border border-solid p-1"
            style={{ borderColor: primaryColor }}
          >
            <span className="text-[8px] font-black uppercase tracking-wider leading-none">
              {ribbon.text}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // diagonal-kicker or horizontal banner
  return (
    <div className="relative z-10 mx-auto my-1 flex items-center justify-center gap-2">
      <span className="h-[1px] w-6 bg-current opacity-40" />
      <span
        className="rounded px-2.5 py-0.5 text-[9px] font-extrabold tracking-widest uppercase text-white shadow-xs"
        style={{ backgroundColor: primaryColor }}
      >
        ★ {ribbon.text} ★
      </span>
      <span className="h-[1px] w-6 bg-current opacity-40" />
    </div>
  );
};
