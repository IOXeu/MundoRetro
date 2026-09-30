import React from 'react';
import { RetroFrame, RetroRibbon, AdFormat } from '../types/retro';
import { RetroFrameRenderer } from './RetroFrameRenderer';
import { RetroRibbonRenderer } from './RetroRibbonRenderer';

interface AdCanvasPreviewProps {
  format: AdFormat;
  kicker: string;
  headline: string;
  headlineFont: string;
  subheadline: string;
  bodyCopy: string;
  priceCta: string;
  classicSlogan: string;
  footerCredit: string;
  frame: RetroFrame;
  ribbon: RetroRibbon;
  primaryColor: string;
  accentColor: string;
  paperTexture: 'aged-newsprint' | 'litho-cream' | 'halftone-screen' | 'clean-vintage';
  imageUrl: string;
  filterMode: 'full-color' | 'sepia' | 'black-white';
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

export const AdCanvasPreview: React.FC<AdCanvasPreviewProps> = ({
  format,
  kicker,
  headline,
  headlineFont,
  subheadline,
  bodyCopy,
  priceCta,
  classicSlogan,
  footerCredit,
  frame,
  ribbon,
  primaryColor,
  accentColor,
  paperTexture,
  imageUrl,
  filterMode,
  canvasRef
}) => {
  // Dimensions based on format
  const aspectClass =
    format === 'stories'
      ? 'aspect-[9/16] max-w-[430px]'
      : format === 'horizontal'
      ? 'aspect-[4/3] max-w-[590px]'
      : 'aspect-square max-w-[530px]';

  // Paper Texture styling
  let bgStyle = 'bg-[#FAF6EE] text-[#1E1B18]';
  if (paperTexture === 'aged-newsprint') {
    bgStyle = 'bg-[#F2ECD8] text-[#1a1714]';
  } else if (paperTexture === 'litho-cream') {
    bgStyle = 'bg-[#F8F3E6] text-[#24211D]';
  } else if (paperTexture === 'halftone-screen') {
    bgStyle = 'bg-[#F4EFEA] text-[#1c1a18]';
  }

  // Filter Mode
  let filterStyle = '';
  if (filterMode === 'sepia') {
    filterStyle = 'sepia-[0.35] contrast-[1.08]';
  } else if (filterMode === 'black-white') {
    filterStyle = 'grayscale contrast-[1.25] brightness-95';
  }

  return (
    <div className="flex w-full items-center justify-center p-2 sm:p-4 select-none">
      <div
        ref={canvasRef}
        className={`relative w-full overflow-hidden border border-[#d8cfbd] shadow-2xl transition-all ${aspectClass} ${bgStyle} ${filterStyle}`}
        style={{
          boxShadow: '0 20px 45px -15px rgba(0,0,0,0.5), 0 0 1px 1px rgba(0,0,0,0.1)'
        }}
      >
        {/* Halftone / Paper Texture Overlay */}
        {paperTexture === 'halftone-screen' && (
          <div className="vintage-halftone pointer-events-none absolute inset-0 z-0 opacity-40" />
        )}
        {paperTexture === 'aged-newsprint' && (
          <div className="retro-paper-noise pointer-events-none absolute inset-0 z-0 opacity-35 mix-blend-multiply" />
        )}

        {/* Authentic Vector Border */}
        <RetroFrameRenderer
          type={frame.svgType}
          color={primaryColor}
          accentColor={accentColor}
        />

        {/* Authentic Ribbon / Badge */}
        {ribbon && (
          <RetroRibbonRenderer
            ribbon={ribbon}
            primaryColor={primaryColor}
            accentColor={accentColor}
          />
        )}

        {/* Harmonious, Balanced Vintage Magazine Layout */}
        <div className="relative z-10 flex h-full w-full flex-col justify-between p-6 sm:p-8">
          {/* Top Section: Kicker, Headline, Subheadline & Ornament */}
          <div className="text-center pt-1 shrink-0">
            {kicker && (
              <div
                className="mb-1 text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.2em] uppercase opacity-90"
                style={{ color: primaryColor }}
              >
                ★ {kicker} ★
              </div>
            )}

            <h1
              className={`leading-[1.1] tracking-tight ${headlineFont} text-2xl sm:text-3xl md:text-4xl px-2 font-black`}
              style={{ color: primaryColor, textWrap: 'balance' }}
            >
              {headline}
            </h1>

            {subheadline && (
              <p className="mt-1 font-serif text-[11px] sm:text-[12.5px] italic text-[#4a443c] px-4 max-w-[90%] mx-auto">
                "{subheadline}"
              </p>
            )}

            {/* Ornamental Divider Bar */}
            <div className="my-2 flex items-center justify-center gap-2 opacity-65">
              <span className="h-[1px] w-12" style={{ backgroundColor: primaryColor }} />
              <span className="text-[9px]" style={{ color: accentColor }}>♦</span>
              <span className="h-[1px] w-12" style={{ backgroundColor: primaryColor }} />
            </div>
          </div>

          {/* Middle Section: Generous, Well-Proportioned Photo Field & Pitch */}
          <div className="my-auto flex flex-1 flex-col items-center justify-center gap-2 overflow-hidden py-2">
            {imageUrl && (
              <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[380px] overflow-hidden rounded-sm border border-[#1E1B18]/25 bg-white/45 shadow-md">
                <img
                  src={imageUrl}
                  alt={headline}
                  referrerPolicy="no-referrer"
                  className="h-36 sm:h-52 md:h-56 w-full object-contain p-1 mix-blend-multiply transition-all"
                />
              </div>
            )}

            {bodyCopy && (
              <p
                className={`text-center font-serif text-[10.5px] sm:text-[12px] leading-relaxed text-[#2f2b26] max-w-[90%] mx-auto ${
                  format === 'stories' ? 'line-clamp-4' : 'line-clamp-3 sm:line-clamp-4'
                }`}
              >
                {bodyCopy}
              </p>
            )}
          </div>

          {/* Bottom Section: Price Box, Classic Slogan & Merchant Credential */}
          <div className="mt-auto space-y-2 pt-1 pb-1 text-center shrink-0">
            {/* Price Box / Value CTA in Mid-century Box */}
            {priceCta && (
              <div
                className="mx-auto inline-block border-2 px-4 py-1.5 text-center shadow-xs bg-white/75"
                style={{ borderColor: primaryColor }}
              >
                <div
                  className="font-bold tracking-wider text-[11.5px] sm:text-[13px] uppercase"
                  style={{ color: primaryColor }}
                >
                  {priceCta}
                </div>
              </div>
            )}

            {/* Classic Slogan */}
            {classicSlogan && (
              <div
                className="font-serif italic text-[11px] sm:text-[12px] font-semibold text-[#1e1b18]"
                style={{ textWrap: 'balance' }}
              >
                — {classicSlogan} —
              </div>
            )}

            {/* Merchant / Publisher Credit Line */}
            {footerCredit && (
              <div className="border-t border-[#1E1B18]/15 pt-1.5 text-[8.5px] sm:text-[9.5px] font-mono tracking-wider uppercase text-[#5a5449]">
                {footerCredit}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
