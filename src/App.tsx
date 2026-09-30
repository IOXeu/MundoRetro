/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { InteractiveCanvasEditor } from './components/InteractiveCanvasEditor';
import { StudioView } from './components/StudioView';
import { DossierView } from './components/DossierView';
import { BookOpen, Sparkles, Terminal, FileCode, Check, Move, Sliders } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'editor' | 'studio' | 'dossier' | 'system_rules'>('editor');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // System Instructions snippet for Retro Advertising Expert
  const systemInstructionText = `Você é um Diretor de Arte e Redator Publicitário sênior especializado na Era de Ouro da Publicidade (décadas de 1950 e 1960), com domínio completo do estilo da Madison Avenue e da imprensa brasileira (revistas O Cruzeiro, Manchete e Seleções).

Suas diretrizes fundamentais:
1. TOM E LINGUAGEM:
   - Década de 1950: Cortês, formal, respeitoso e persuasivo. Utiliza vocabulário como "distinta dona de casa", "elegância incomparável", "exija nas boas casas do ramo", "uma conquista da ciência para seu lar".
   - Década de 1960: Criativo, direto, arrojado, com toque de ironia inteligente (escola DDB/Bill Bernbach) ou energia jovem (Jovem Guarda / Pop Art). Slogans curtos e memoráveis.

2. ESTRUTURA VISUAL OBRIGATÓRIA DO ANÚNCIO:
   - Kicker superior em caixa alta e espaçamento expandido.
   - Titular dominante em tipografia de alto contraste (Bodoni, Didot, Cooper Black).
   - Molduras com filetes duplos, cantos ornamentais, selos dentados de garantia ou estilo atômico googie.
   - Preços e valores expressos em Cruzeiros (Cr$) ou dólares com ênfase em "suaves prestações" e "sem acréscimo".
   - Flâmulas diagonais com exclamações ("SENSACIONAL!", "EXTRAORDINÁRIO!").
   - Rodapé com chancela de laboratório ou distribuidor oficial e CTA claro ("Recorte o cupom e remeta hoje mesmo").`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(systemInstructionText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#121110] text-[#f4efe6] flex flex-col font-outfit">
      {/* Top Bar following Top Bar Contract: 3 Zones */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#2d2822] bg-[#171512]/95 px-4 sm:px-6 py-3.5 backdrop-blur-md">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setCurrentView('editor')}
          className="font-playfair text-xl font-black tracking-tight text-[#faf6ee] hover:text-[#cfa643] transition-colors"
        >
          Mundo Retrô 1950–1960
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#a89d8d] uppercase tracking-wider">
          <button
            onClick={() => setCurrentView('editor')}
            className={`transition-colors hover:text-[#faf6ee] ${
              currentView === 'editor' ? 'text-[#cfa643] underline underline-offset-8' : ''
            }`}
          >
            Cartaz Arrastável (Livre)
          </button>
          <button
            onClick={() => setCurrentView('studio')}
            className={`transition-colors hover:text-[#faf6ee] ${
              currentView === 'studio' ? 'text-[#cfa643] underline underline-offset-8' : ''
            }`}
          >
            Modelos de Revista
          </button>
          <button
            onClick={() => setCurrentView('dossier')}
            className={`transition-colors hover:text-[#faf6ee] ${
              currentView === 'dossier' ? 'text-[#cfa643] underline underline-offset-8' : ''
            }`}
          >
            Dossiê de Materiais
          </button>
          <button
            onClick={() => setCurrentView('system_rules')}
            className={`transition-colors hover:text-[#faf6ee] ${
              currentView === 'system_rules' ? 'text-[#cfa643] underline underline-offset-8' : ''
            }`}
          >
            Diretrizes de IA
          </button>
        </nav>

        {/* Zone 3: Primary action button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('editor')}
            className="rounded bg-[#cfa643] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#121110] shadow-sm hover:bg-[#e0b654] transition-all whitespace-nowrap"
          >
            Criar Meu Cartaz
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'editor' && <InteractiveCanvasEditor />}

        {currentView === 'studio' && <StudioView />}

        {currentView === 'dossier' && (
          <DossierView
            onSelectPreset={() => setCurrentView('editor')}
            onNavigateToStudio={() => setCurrentView('editor')}
          />
        )}

        {currentView === 'system_rules' && (
          <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
            <div className="border border-[#2f2b25] bg-[#171512] p-6 sm:p-8 rounded-lg shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#2d2822] pb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#cfa643] uppercase">
                  <Terminal className="h-4 w-4" />
                  <span>Opção 1 · System Instructions (Instruções de IA)</span>
                </div>
                <button
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#252019] border border-[#3b3428] text-xs font-medium text-[#ded5c6] hover:bg-[#332c21] transition-colors"
                >
                  {copiedPrompt ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <FileCode className="h-3.5 w-3.5" />}
                  <span>{copiedPrompt ? 'Copiado!' : 'Copiar Diretrizes'}</span>
                </button>
              </div>

              <h2 className="font-playfair text-2xl font-bold text-[#faf6ee]">
                Diretrizes de Especialista em Publicidade dos Anos 50 e 60
              </h2>

              <p className="text-xs text-[#b8ad9c] leading-relaxed">
                Este texto define com precisão histórica as regras estéticas, de vocabulário e de diagramação para que qualquer modelo de linguagem gere textos e descrições idênticas aos anúncios originais da época, sem anacronismos modernos.
              </p>

              <pre className="overflow-x-auto rounded bg-[#0e0d0c] p-4 text-xs font-mono leading-relaxed text-[#cfa643] border border-[#2b261f]">
                {systemInstructionText}
              </pre>

              <div className="pt-4 border-t border-[#2d2822] flex flex-wrap gap-3">
                <button
                  onClick={() => setCurrentView('editor')}
                  className="px-5 py-2.5 bg-[#cfa643] text-[#121110] font-bold text-xs rounded hover:bg-[#e0b654] transition-colors"
                >
                  Abrir o Cartaz Arrastável com Estas Regras →
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Clean quiet footer */}
      <footer className="border-t border-[#26221c] bg-[#141210] py-6 text-center text-xs text-[#70675a]">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Mundo Retrô · Estúdio de Publicidade Clássica das Décadas de 1950 e 1960</span>
          <span>Suporte a Imagens Próprias, Selos Arrastáveis e Formatos Instagram & Facebook</span>
        </div>
      </footer>
    </div>
  );
}

