import React, { useState } from 'react';
import { RetroDecade, RetroPreset } from '../types/retro';
import {
  HISTORICAL_RULES,
  RETRO_FRAMES,
  RETRO_RIBBONS,
  AUTHENTIC_CTAS,
  AUTHENTIC_SLOGANS,
  RETRO_FONTS
} from '../data/retroArchive';
import { BookOpen, Sparkles, Award, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

interface DossierViewProps {
  onSelectPreset: (presetId: string) => void;
  onNavigateToStudio: () => void;
}

export const DossierView: React.FC<DossierViewProps> = ({
  onSelectPreset,
  onNavigateToStudio
}) => {
  const [activeDecade, setActiveDecade] = useState<RetroDecade>('1950');
  const rule = HISTORICAL_RULES[activeDecade];

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8">
      {/* Header Banner */}
      <div className="border border-[#38332c] bg-[#1a1815] p-6 sm:p-8 rounded-lg shadow-xl relative overflow-hidden">
        <div className="vintage-halftone absolute inset-0 opacity-15 pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#cfa643]">
            <BookOpen className="h-4 w-4" />
            <span>Arquivo Histórico Publicitário · Documentação Autêntica</span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl text-[#faf6ee] font-black tracking-tight">
            Análise Visual & Estrutural da Publicidade dos Anos 50 e 60
          </h1>
          <p className="text-sm sm:text-base text-[#c4b9a7] leading-relaxed">
            Antes de gerar suas peças para o Instagram e Facebook, examine a composição canônica que definia os grandes anúncios das revistas <em>O Cruzeiro</em>, <em>Manchete</em>, <em>Seleções do Reader’s Digest</em> e da <em>Madison Avenue</em>.
          </p>
        </div>

        {/* Decade Switcher */}
        <div className="mt-6 flex flex-wrap gap-3 border-t border-[#2e2a24] pt-5">
          <button
            onClick={() => setActiveDecade('1950')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded font-serif text-sm tracking-wide transition-all ${
              activeDecade === '1950'
                ? 'bg-[#cfa643] text-[#121110] font-bold shadow-md'
                : 'bg-[#26221c] text-[#d6cdbe] hover:bg-[#332e26]'
            }`}
          >
            <span>★</span>
            <span>Década de 1950 (Anos Dourados & Litografia)</span>
          </button>
          <button
            onClick={() => setActiveDecade('1960')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded font-serif text-sm tracking-wide transition-all ${
              activeDecade === '1960'
                ? 'bg-[#d85c27] text-white font-bold shadow-md'
                : 'bg-[#26221c] text-[#d6cdbe] hover:bg-[#332e26]'
            }`}
          >
            <span>✦</span>
            <span>Década de 1960 (Era Mod, Pop Art & Retícula)</span>
          </button>
        </div>
      </div>

      {/* Main Analysis Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Historical Profile */}
        <div className="border border-[#2f2b25] bg-[#171512] p-6 rounded-lg space-y-4">
          <div className="flex items-center justify-between border-b border-[#2d2822] pb-3">
            <span className="text-xs font-mono text-[#cfa643] uppercase tracking-wider">01. Estilo & Época</span>
            <span className="text-xs text-[#8c8273]">{rule.period}</span>
          </div>
          <h2 className="font-playfair text-xl text-[#faf6ee] font-bold">
            {rule.title}
          </h2>
          <p className="text-xs text-[#b8ad9c] leading-relaxed">
            {rule.description}
          </p>

          <div className="border-t border-[#2d2822] pt-3 space-y-2">
            <div className="text-xs font-mono text-[#8c8273] uppercase">Paleta Cromática de Imprensa</div>
            <div className="flex flex-wrap gap-2">
              {rule.colorPalette.map((col, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-[#ded5c6]">
                  <span
                    className="h-4 w-4 rounded-full border border-white/20 shadow-xs"
                    style={{ backgroundColor: col.hex }}
                  />
                  <span className="text-[11px]">{col.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: The 5 Canon Parts of a 50s/60s Ad */}
        <div className="border border-[#2f2b25] bg-[#171512] p-6 rounded-lg space-y-4">
          <div className="flex items-center justify-between border-b border-[#2d2822] pb-3">
            <span className="text-xs font-mono text-[#cfa643] uppercase tracking-wider">02. Anatomia Canônica</span>
            <span className="text-xs text-[#8c8273]">Estrutura Real</span>
          </div>
          <h2 className="font-playfair text-xl text-[#faf6ee] font-bold">
            Os 5 Elementos Obrigatórios
          </h2>
          <ul className="space-y-2.5 text-xs text-[#b8ad9c]">
            <li className="flex items-start gap-2">
              <span className="font-mono text-[#cfa643] font-bold">1. Kicker:</span>
              <span>Chamada superior em caixa alta ("UMA SENSACIONAL REVELAÇÃO") para prender os olhos do leitor.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-[#cfa643] font-bold">2. Titular:</span>
              <span>Frase de alto impacto emocional com tipografia Bodoni, Didot ou Cooper Black de alto peso.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-[#cfa643] font-bold">3. Pintura/Ilustração:</span>
              <span>Arte figurativa realista com iluminação suave a guache ou retícula mecânica de linotipo.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-[#cfa643] font-bold">4. Copy Argumentativo:</span>
              <span>Texto explicativo detalhado demonstrando benefício prático, prestígio e economia.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-[#cfa643] font-bold">5. CTA de Valor & Cupom:</span>
              <span>Preço em Cruzeiros (Cr$), condições em prestações suaves e endereço do distribuidor oficial.</span>
            </li>
          </ul>
        </div>

        {/* Column 3: Genuine Copy & Slogans */}
        <div className="border border-[#2f2b25] bg-[#171512] p-6 rounded-lg space-y-4">
          <div className="flex items-center justify-between border-b border-[#2d2822] pb-3">
            <span className="text-xs font-mono text-[#cfa643] uppercase tracking-wider">03. Vocabulário da Época</span>
            <span className="text-xs text-[#8c8273]">Redação Clássica</span>
          </div>
          <h2 className="font-playfair text-xl text-[#faf6ee] font-bold">
            Frases & Chamadas Autênticas
          </h2>
          <div className="space-y-2">
            {rule.authenticPhrases.map((phrase, idx) => (
              <div
                key={idx}
                className="border-l-2 border-[#cfa643]/70 pl-3 py-1 text-xs italic text-[#e0d6c7]"
              >
                "{phrase}"
              </div>
            ))}
          </div>

          <div className="border-t border-[#2d2822] pt-3 text-xs text-[#8c8273]">
            <strong>Referências Históricas:</strong> {rule.iconicReferences.join(', ')}.
          </div>
        </div>
      </div>

      {/* Catalog of Frames & Molduras */}
      <div className="space-y-4 border border-[#2f2b25] bg-[#171512] p-6 rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2d2822] pb-3">
          <div>
            <h3 className="font-playfair text-xl text-[#faf6ee] font-bold">
              Catálogo de Molduras & Bordas da Época
            </h3>
            <p className="text-xs text-[#8c8273]">
              Vetores com proporções e traços fiéis aos anúncios impressos dos jornais e revistas dos anos 50 e 60.
            </p>
          </div>
          <button
            onClick={onNavigateToStudio}
            className="flex items-center gap-2 self-start sm:self-auto px-4 py-2 bg-[#cfa643] text-[#121110] font-bold text-xs rounded hover:bg-[#e0b654] transition-colors"
          >
            <span>Ir para o Estúdio de Criação</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {RETRO_FRAMES.map((f) => (
            <div
              key={f.id}
              className="border border-[#2f2b25] bg-[#1f1b16] p-4 rounded hover:border-[#cfa643]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#faf6ee]">{f.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#2b261f] text-[#cfa643]">
                    {f.decade}s
                  </span>
                </div>
                <p className="mt-2 text-xs text-[#a89d8d] leading-relaxed">
                  {f.description}
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-[#2b261f] flex items-center justify-between text-[11px] text-[#cfa643]">
                <span>Tipo SVG: {f.svgType}</span>
                <span className="font-semibold cursor-pointer hover:underline" onClick={onNavigateToStudio}>
                  Testar no Anúncio →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Catalog of Ribbons, Badges & Seals */}
      <div className="space-y-4 border border-[#2f2b25] bg-[#171512] p-6 rounded-lg">
        <h3 className="font-playfair text-xl text-[#faf6ee] font-bold">
          Flâmulas, Faixas Diagonais & Selos de Garantia
        </h3>
        <p className="text-xs text-[#8c8273]">
          As marcas da época utilizavam selos de distinção, coroas e carimbos de laboratório para transmitir credibilidade imediata.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {RETRO_RIBBONS.map((ribbon) => (
            <div
              key={ribbon.id}
              className="border border-[#2f2b25] bg-[#1f1b16] p-4 rounded text-center space-y-2"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2a241c] text-[#cfa643] border border-[#cfa643]/40">
                <Award className="h-6 w-6" />
              </div>
              <div className="text-xs font-bold text-[#faf6ee]">{ribbon.name}</div>
              <div className="text-[11px] font-mono text-[#cfa643] bg-[#2a241c] py-0.5 px-2 rounded">
                "{ribbon.text}"
              </div>
              <div className="text-[10px] text-[#8c8273]">Posição: {ribbon.position}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Catalog of Authentic CTAs & Currencies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-[#2f2b25] bg-[#171512] p-6 rounded-lg space-y-3">
          <h3 className="font-playfair text-lg text-[#faf6ee] font-bold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#cfa643]" />
            <span>Chamadas de Valor & Moeda da Época</span>
          </h3>
          <p className="text-xs text-[#8c8273]">
            Exemplos literais de valores expressos em Cruzeiros (Cr$) e condições de pagamento:
          </p>
          <div className="space-y-2">
            {AUTHENTIC_CTAS.map((cta, i) => (
              <div key={i} className="flex items-center justify-between bg-[#1f1b16] px-3 py-2 rounded text-xs">
                <span className="font-semibold text-[#ded5c6]">{cta.value}</span>
                <span className="text-[10px] text-[#8c8273]">{cta.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-[#2f2b25] bg-[#171512] p-6 rounded-lg space-y-3">
          <h3 className="font-playfair text-lg text-[#faf6ee] font-bold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#cfa643]" />
            <span>Slogans & Fechos Clássicos</span>
          </h3>
          <p className="text-xs text-[#8c8273]">
            Slogans memoráveis que pontuavam o rodapé dos grandes anúncios:
          </p>
          <div className="space-y-2">
            {AUTHENTIC_SLOGANS.slice(0, 5).map((slogan, i) => (
              <div key={i} className="bg-[#1f1b16] px-3 py-2 rounded text-xs italic text-[#e3dad0] border-l-2 border-[#b83227]">
                "{slogan}"
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#cfa643]/30 bg-[#211d17] p-6 rounded-lg">
        <div>
          <h4 className="font-playfair text-xl text-[#faf6ee] font-bold">
            Pronto para Criar Seus Anúncios Retrô?
          </h4>
          <p className="text-xs text-[#b8ad9c]">
            Utilize o estúdio para compor peças em formato Feed (1:1) ou Stories (9:16) com tipografia, molduras e exportação em alta resolução.
          </p>
        </div>
        <button
          onClick={onNavigateToStudio}
          className="px-6 py-3 bg-[#cfa643] text-[#121110] font-bold text-sm rounded shadow-lg hover:bg-[#e0b654] transition-all whitespace-nowrap"
        >
          Abrir Estúdio de Criação →
        </button>
      </div>
    </div>
  );
};
