import React, { useState } from 'react';
import {
  DollarSign,
  Store,
  Scissors,
  Coffee,
  Beer,
  Shirt,
  Wrench,
  ChevronRight,
  Sparkles,
  Layers,
  Award,
  ShieldCheck,
  TrendingUp,
  Download,
  FileText
} from 'lucide-react';
import { CommercialCertificateGenerator } from './CommercialCertificateGenerator';
import { SAVED_WHATSAPP_SALES_SCRIPTS } from '../data/savedSalesScripts';

interface CommercialAgencyViewProps {
  onLoadNicheTemplate: (nicheId: string) => void;
  onOpenPricingModal: () => void;
}

export const CommercialAgencyView: React.FC<CommercialAgencyViewProps> = ({
  onLoadNicheTemplate,
  onOpenPricingModal
}) => {
  // Navigation tabs: Only the 2 requested core features
  const [activeTab, setActiveTab] = useState<'niches' | 'certificate'>('niches');
  const [nicheCategoryFilter, setNicheCategoryFilter] = useState<string>('all');
  const [showSavedScriptsModal, setShowSavedScriptsModal] = useState<boolean>(false);

  // The 6 commercial niches
  const profitableNiches = [
    {
      id: 'niche-burger',
      category: 'gastronomy',
      title: 'Hamburguerias & Diners Retrô',
      icon: Store,
      badge: 'Nicho Mais Lucrativo',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      recommendedPriceDigital: 'R$ 70 a R$ 150',
      recommendedPricePrint: 'R$ 140 a R$ 220',
      description: 'Anúncios estilo lanchonete clássica americana de 1955. Destaque irresistível para hambúrguer na chapa com pão dourado, batatas rústicas e milk-shakes cremosos.',
      bestSellers: [
        'Quadro decorativo A3 para a parede do salão',
        'Post chamativo de sexta e sábado no Instagram',
        'Cardápio retrô laminado de mesa e balcão',
        'Banner de calçada para atrair quem passa'
      ],
      profitExample: 'Quadro A3: Custo Gráfica R$ 18 → Venda R$ 110 (Lucro R$ 92)',
      headlineSample: 'O Verdadeiro Hambúrguer com o Pão Macio da Vovó!',
      kickerSample: 'DESDE 1958 SERVINDO O MELHOR DA CIDADE'
    },
    {
      id: 'niche-barber',
      category: 'style',
      title: 'Barbearias Vintage & Cutelaria',
      icon: Scissors,
      badge: 'Alta Conversão',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      recommendedPriceDigital: 'R$ 80 a R$ 160',
      recommendedPricePrint: 'R$ 150 a R$ 240',
      description: 'Cartazes para homens distintos: barba na toalha quente, corte navalhado pompadour e loções clássicas. Perfeito para redes sociais e quadros decorativos com moldura escura.',
      bestSellers: [
        'Quadros emoldurados com frases de cavalheirismo',
        'Tabela de preços de corte e barba estilizada anos 50',
        'Posts de anúncio para atrair clientes nos dias da semana',
        'Cartão fidelidade vintage'
      ],
      profitExample: 'Kit 3 Quadros Parede: Custo R$ 45 → Venda R$ 260 (Lucro R$ 215)',
      headlineSample: 'A Arte da Navalha para Homens de Distinto Cavalheirismo',
      kickerSample: 'TRADIÇÃO, HONRA E ELEGÂNCIA DESDE 1960'
    },
    {
      id: 'niche-coffee',
      category: 'gastronomy',
      title: 'Cafeterias, Torrefações & Confeitarias',
      icon: Coffee,
      badge: 'Visual Encantador',
      badgeColor: 'bg-amber-700/20 text-amber-300 border-amber-700/30',
      recommendedPriceDigital: 'R$ 60 a R$ 130',
      recommendedPricePrint: 'R$ 130 a R$ 200',
      description: 'Cafés especiais coados na hora, tortas artesanais com aroma nostálgico. Foco na tradição familiar, na receita secreta da vovó e no aconchego de uma boa conversa.',
      bestSellers: [
        'Cardápio clássico com cafés especiais e bolos',
        'Post do "Café da Tarde da Vovó" para o Instagram',
        'Placa decorativa de cafeteria aconchegante',
        'Etiquetas retrô para pacotes de grãos torrados'
      ],
      profitExample: 'Cardápio Retrô + Post Promocional: Custo R$ 0 → Venda R$ 160',
      headlineSample: 'O Aromático Café Coado na Hora que Aquece a Alma',
      kickerSample: 'RECEITA DE FAMÍLIA DESDE 1962'
    },
    {
      id: 'niche-beer',
      category: 'gastronomy',
      title: 'Cervejarias Artesanais & Pubs',
      icon: Beer,
      badge: 'Ticket Médio Alto',
      badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      recommendedPriceDigital: 'R$ 90 a R$ 180',
      recommendedPricePrint: 'R$ 160 a R$ 260',
      description: 'Chopp gelado tirado no capricho, copos canelados com espuma densa e noites de rock clássico. Visual ilustrado com brasões históricos e selos de pureza garantida.',
      bestSellers: [
        'Cartaz de Happy Hour de Quinta e Sexta-feira',
        'Quadro decorativo com lista de cervejas plugadas nas torneiras',
        'Bolachas de chopp colecionáveis retrô',
        'Anúncio de música ao vivo acústica e clássica'
      ],
      profitExample: 'Campanha Happy Hour: Custo R$ 0 → Venda R$ 180 (Lucro 100%)',
      headlineSample: 'Pura Refrescância Extraída dos Melhores Lúpulos',
      kickerSample: 'GARANTIA DE PUREZA ABSOLUTA E SABOR INIGUALÁVEL'
    },
    {
      id: 'niche-fashion',
      category: 'style',
      title: 'Brechós, Alfaiatarias & Moda Vintage',
      icon: Shirt,
      badge: 'Tendência Forte',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      recommendedPriceDigital: 'R$ 75 a R$ 140',
      recommendedPricePrint: 'R$ 130 a R$ 210',
      description: 'Elegância atemporal, tecidos refinados e corte sob medida. Anúncios sofisticados para quem busca exclusividade, moda sustentável e peças únicas.',
      bestSellers: [
        'Post de lançamento de "Garimpo Semanal" de peças raras',
        'Placa decorativa de vitrine com aviso de novidades',
        'Etiquetas elegantes estilo anos 50 para roupas',
        'Cartaz com regras de cuidados de tecidos nobres'
      ],
      profitExample: 'Kit Redes Sociais Semanal: Custo R$ 0 → Venda R$ 240',
      headlineSample: 'A Elegância Incomparável do Corte Sob Medida',
      kickerSample: 'ALFAIATARIA & BOUTIQUE DE ALTA COSTURA'
    },
    {
      id: 'niche-garage',
      category: 'services',
      title: 'Oficinas Mecânicas & Lava-Rápidos Clássicos',
      icon: Wrench,
      badge: 'Fidelização Forte',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      recommendedPriceDigital: 'R$ 80 a R$ 150',
      recommendedPricePrint: 'R$ 150 a R$ 250',
      description: 'Restauração de carros antigos, motos customizadas e serviços automotivos com precisão de mestre mecânico dos anos dourados.',
      bestSellers: [
        'Placas de metal ou MDF decorativas para a recepção da oficina',
        'Banner de serviço especializado em carburador e clássicos',
        'Post comemorativo de carros restaurados e polimento',
        'Certificado de revisão entregue ao dono do carro'
      ],
      profitExample: 'Placa de Parede em Chapa / MDF: Custo R$ 22 → Venda R$ 160',
      headlineSample: 'Mecânica de Precisão para Máquinas que Merecem Respeito',
      kickerSample: 'OFICINA ESPECIALIZADA EM CLÁSSICOS & RESTAURAÇÃO'
    }
  ];

  // Filter niches
  const filteredNiches = profitableNiches.filter((n) => {
    if (nicheCategoryFilter === 'all') return true;
    return n.category === nicheCategoryFilter;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 font-outfit">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-xl border border-[#cfa643]/30 bg-gradient-to-r from-[#1f1b14] via-[#171410] to-[#251e16] p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#cfa643]/40 bg-[#cfa643]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#cfa643]">
              <DollarSign className="h-3.5 w-3.5" />
              <span>Central Comercial & Certificados</span>
            </div>
            <h1 className="font-playfair text-3xl sm:text-4xl font-black text-[#faf6ee] leading-tight">
              Os Nichos Mais Lucrativos & Emissor de Certificados
            </h1>
            <p className="text-sm text-[#b8ad9c] leading-relaxed">
              Descubra os comércios que compram artes retrô por <strong>R$ 70 a R$ 200</strong> e gere certificados de licença comercial profissionais prontos para entregar aos seus clientes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={onOpenPricingModal}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#cfa643] to-[#e6b94d] px-6 py-3.5 text-sm font-black text-[#121110] shadow-lg hover:brightness-110 transition-all font-sans uppercase tracking-wider"
            >
              <Sparkles className="h-4 w-4" />
              <span>Plano Vitalício · R$ 59,00</span>
            </button>
          </div>
        </div>
      </div>

      {/* Clean Navigation: Only the 2 Core Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2d2822] pb-2">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('niches')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'niches'
                ? 'bg-[#cfa643] text-[#121110]'
                : 'text-[#a89d8d] hover:bg-[#201c17] hover:text-[#faf6ee]'
            }`}
          >
            <Store className="h-4 w-4" />
            <span>1. Os 6 Nichos Mais Lucrativos</span>
          </button>

          <button
            onClick={() => setActiveTab('certificate')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'certificate'
                ? 'bg-[#cfa643] text-[#121110]'
                : 'text-[#a89d8d] hover:bg-[#201c17] hover:text-[#faf6ee]'
            }`}
          >
            <Award className="h-4 w-4" />
            <span>2. Gerador de Certificado Comercial</span>
          </button>
        </div>

        {/* Access to Saved Backup Scripts */}
        <button
          onClick={() => setShowSavedScriptsModal(true)}
          className="text-xs text-[#a89d8d] hover:text-[#cfa643] underline font-medium flex items-center gap-1.5"
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Ver Scripts Guardados (Backup)</span>
        </button>
      </div>

      {/* Tab 1: Nichos Comerciais */}
      {activeTab === 'niches' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-playfair text-2xl font-bold text-[#faf6ee]">
                Os 6 Nichos Comerciais que Mais Compram Anúncios & Cartazes Retrô
              </h2>
              <p className="text-xs text-[#a89d8d] mt-1">
                Selecione um nicho para carregar o modelo pronto diretamente no Cartaz Retrô:
              </p>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setNicheCategoryFilter('all')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                  nicheCategoryFilter === 'all'
                    ? 'bg-[#cfa643] text-[#121110]'
                    : 'bg-[#1e1a15] text-[#a89d8d] hover:bg-[#28221b] hover:text-[#ded5c6]'
                }`}
              >
                Todos (6)
              </button>
              <button
                onClick={() => setNicheCategoryFilter('gastronomy')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                  nicheCategoryFilter === 'gastronomy'
                    ? 'bg-[#cfa643] text-[#121110]'
                    : 'bg-[#1e1a15] text-[#a89d8d] hover:bg-[#28221b] hover:text-[#ded5c6]'
                }`}
              >
                Alimentação & Bebidas (3)
              </button>
              <button
                onClick={() => setNicheCategoryFilter('style')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                  nicheCategoryFilter === 'style'
                    ? 'bg-[#cfa643] text-[#121110]'
                    : 'bg-[#1e1a15] text-[#a89d8d] hover:bg-[#28221b] hover:text-[#ded5c6]'
                }`}
              >
                Beleza & Estilo (2)
              </button>
              <button
                onClick={() => setNicheCategoryFilter('services')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                  nicheCategoryFilter === 'services'
                    ? 'bg-[#cfa643] text-[#121110]'
                    : 'bg-[#1e1a15] text-[#a89d8d] hover:bg-[#28221b] hover:text-[#ded5c6]'
                }`}
              >
                Oficinas (1)
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNiches.map((niche) => {
              const Icon = niche.icon;
              return (
                <div
                  key={niche.id}
                  className="rounded-xl border border-[#2d2822] bg-[#181512] p-5 shadow-lg flex flex-col justify-between hover:border-[#cfa643]/50 transition-all group relative overflow-hidden"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="rounded-lg bg-[#252019] p-2.5 text-[#cfa643]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className={`rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${niche.badgeColor}`}>
                        {niche.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-playfair text-lg font-bold text-[#faf6ee] group-hover:text-[#cfa643] transition-colors leading-snug">
                        {niche.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 rounded px-1.5 py-0.5">
                          Digital: {niche.recommendedPriceDigital}
                        </span>
                        <span className="text-[11px] font-semibold text-amber-300 bg-amber-950/40 border border-amber-800/40 rounded px-1.5 py-0.5">
                          Quadro: {niche.recommendedPricePrint}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#b8ad9c] leading-relaxed">
                      {niche.description}
                    </p>

                    <div className="rounded-lg bg-[#110f0d] p-3 border border-[#24201a] space-y-2">
                      <div className="text-[11px] font-bold text-[#cfa643] flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        <span>O que esse comércio mais compra:</span>
                      </div>
                      <ul className="space-y-1 text-[11px] text-[#ded5c6]">
                        {niche.bestSellers.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-[#cfa643] font-bold shrink-0">•</span>
                            <span className="leading-tight">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg bg-[#1b2318] p-2.5 border border-emerald-900/40 text-[11px] text-emerald-300 flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                      <div>
                        <span className="font-bold">Potencial de Lucro: </span>
                        <span>{niche.profitExample}</span>
                      </div>
                    </div>

                    <div className="rounded-lg bg-[#14120f] p-2.5 border border-[#231f18] text-[11px] space-y-1">
                      <div className="text-[#8f8373] text-[10px] uppercase font-bold tracking-wider">
                        Texto de Exemplo no Cartaz:
                      </div>
                      <div className="text-[#ded5c6] font-serif italic">
                        "{niche.headlineSample}"
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#25201a]">
                    <button
                      onClick={() => onLoadNicheTemplate(niche.id)}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#cfa643] to-[#e6b94d] px-3.5 py-2.5 text-xs font-bold text-[#121110] hover:brightness-110 shadow transition-all"
                    >
                      <Layers className="h-3.5 w-3.5" />
                      <span>Abrir Modelo Pronto no Editor</span>
                      <ChevronRight className="h-3.5 w-3.5 ml-auto" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Gerador de Certificado Comercial para Clientes */}
      {activeTab === 'certificate' && (
        <CommercialCertificateGenerator />
      )}

      {/* Modal with Saved Scripts (Backup & Export) */}
      {showSavedScriptsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#cfa643]/40 bg-[#161310] p-6 text-[#ded5c6] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#2b241c] pb-3">
              <div>
                <h3 className="font-bold text-lg text-[#faf6ee] flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#cfa643]" />
                  <span>Scripts de WhatsApp Guardados para Outros Projetos</span>
                </h3>
                <p className="text-xs text-[#a89d8d]">
                  Estes scripts estão salvos com segurança em <code>/src/data/savedSalesScripts.ts</code>.
                </p>
              </div>
              <button
                onClick={() => setShowSavedScriptsModal(false)}
                className="text-[#a89d8d] hover:text-[#faf6ee] text-xs font-bold px-3 py-1.5 rounded bg-[#231e18]"
              >
                Fechar [x]
              </button>
            </div>

            <div className="space-y-4">
              {SAVED_WHATSAPP_SALES_SCRIPTS.map((item) => (
                <div key={item.id} className="rounded-xl border border-[#2d2822] bg-[#1a1714] p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#faf6ee]">{item.title}</span>
                    <span className="text-[11px] text-[#cfa643]">Foco: {item.target}</span>
                  </div>
                  <pre className="whitespace-pre-wrap font-sans text-xs text-[#ded5c6] bg-[#100e0c] p-3 rounded border border-[#231e18] leading-relaxed">
                    {item.message}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
