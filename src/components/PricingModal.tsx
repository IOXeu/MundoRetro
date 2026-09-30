import React, { useState } from 'react';
import {
  X,
  Check,
  Sparkles,
  ExternalLink,
  Copy,
  ShieldCheck,
  CreditCard,
  Zap,
  Star,
  Award,
  Lock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  isProUser: boolean;
  onActivatePro: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  isProUser,
  onActivatePro
}) => {
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isActivating, setIsActivating] = useState<boolean>(false);

  if (!isOpen) return null;

  const checkoutUrl = 'https://mpago.la/2xnMKKv';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(checkoutUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleConfirmAndActivate = () => {
    setIsActivating(true);
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    setTimeout(() => {
      onActivatePro();
      setIsActivating(false);
      onClose();
    }, 1200);
  };

  const features = [
    {
      title: 'Acesso Vitalício sem Mensalidades',
      desc: 'Pague uma única vez R$ 59,00 e tenha o estúdio liberado para sempre.'
    },
    {
      title: 'Exportação Ultra HD 4K (Sem Marca d’Água)',
      desc: 'Resolução profissional 300 DPI pronta para imprimir quadros, cardápios e placas.'
    },
    {
      title: '6 Nichos Comerciais de Alta Conversão',
      desc: 'Modelos prontos para Hamburguerias, Barbearias, Cafeterias, Oficinas e Bares.'
    },
    {
      title: 'Emissor de Certificado de Licença Comercial',
      desc: 'Emita certificados oficiais com código único de autenticação para seus clientes.'
    },
    {
      title: 'Scripts de WhatsApp Prontos para Vender',
      desc: 'Mensagens testadas para abordar donos de comércios locais e fechar na hora.'
    },
    {
      title: 'Garantia Blindada Mercado Pago',
      desc: 'Pagamento 100% protegido via PIX ou Cartão de Crédito pelo Mercado Pago.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[#cfa643]/40 bg-[#161411] shadow-2xl text-[#faf6ee]">
        {/* Top Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#cfa643] via-[#e6b94d] to-[#c4421a]" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2d2822] bg-[#1d1914] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-[#cfa643] p-1.5 text-[#121110]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-playfair text-lg sm:text-xl font-black text-[#faf6ee]">
                Licença Comercial Vitalícia
              </h2>
              <span className="text-[11px] text-[#cfa643] font-semibold">
                Plano Único · Pagamento Único de R$ 59,00
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#a89d8d] hover:bg-[#2a241c] hover:text-[#faf6ee] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {isProUser ? (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-6 text-center space-y-3">
              <div className="inline-flex rounded-full bg-emerald-500/20 p-3 text-emerald-400">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-emerald-400">
                Sua Licença Vitalícia PRO está Ativa!
              </h3>
              <p className="text-xs text-[#d1c8ba] max-w-md mx-auto leading-relaxed">
                Você possui acesso vitalício a todas as ferramentas, exportação 4K sem marca d’água e direitos de venda comercial liberados.
              </p>
              <button
                onClick={onClose}
                className="rounded-lg bg-[#cfa643] px-6 py-2.5 text-xs font-bold text-[#121110] hover:bg-[#e0b654] transition-colors"
              >
                Voltar e Criar Cartazes
              </button>
            </div>
          ) : (
            <>
              {/* Highlight Price Box */}
              <div className="relative overflow-hidden rounded-xl border-2 border-[#cfa643]/50 bg-gradient-to-r from-[#241d15] via-[#1a1612] to-[#2b1f14] p-5 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="inline-block rounded-full bg-[#cfa643]/20 border border-[#cfa643]/40 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#e6b94d]">
                      OFERTA ESPECIAL VITALÍCIA
                    </span>
                    <h3 className="font-playfair text-xl sm:text-2xl font-black text-[#faf6ee]">
                      Mundo Retrô 1950–1960 Pro
                    </h3>
                    <p className="text-xs text-[#a89d8d]">
                      Sem assinaturas mensais ou cobranças surpresa. Pague uma vez, use para sempre.
                    </p>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <div className="text-[11px] text-[#8c8070] line-through">De R$ 149,00</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-[#e6b94d] font-bold">Por apenas</span>
                      <span className="font-playfair text-3xl sm:text-4xl font-black text-emerald-400">
                        R$ 59,00
                      </span>
                    </div>
                    <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                      ★ Vitalício no Mercado Pago
                    </div>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-lg border border-[#2b251d] bg-[#14120f] p-3 text-xs"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#faf6ee]">{item.title}</div>
                      <div className="text-[11px] text-[#9c9182] leading-tight mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct Checkout Action Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-sky-600 via-sky-500 to-emerald-600 px-6 py-4 text-sm font-black text-white shadow-xl hover:brightness-110 transition-all font-sans uppercase tracking-wider"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Pagar R$ 59,00 no Mercado Pago (PIX / Cartão)</span>
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#a89d8d]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1.5 hover:text-[#faf6ee] transition-colors py-1"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      <span>{copiedLink ? 'Link Copiado!' : 'Copiar Link Direto'}</span>
                    </button>
                    <span>·</span>
                    <span className="text-[11px] font-mono text-[#cfa643]">mpago.la/2xnMKKv</span>
                  </div>

                  <button
                    onClick={handleConfirmAndActivate}
                    disabled={isActivating}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1.5 font-bold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>{isActivating ? 'Ativando...' : 'Já paguei! Ativar meu Pro Agora'}</span>
                  </button>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="rounded-lg bg-[#110f0d] p-3 border border-[#252019] flex items-center justify-center gap-3 text-[11px] text-[#8c8070]">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Ambiente Seguro Mercado Pago · Garantia incondicional de 7 dias</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
