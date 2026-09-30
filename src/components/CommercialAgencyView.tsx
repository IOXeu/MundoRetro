import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Briefcase,
  Copy,
  Check,
  Download,
  ShieldCheck,
  Sparkles,
  QrCode,
  Store,
  Scissors,
  Coffee,
  Beer,
  Shirt,
  Wrench,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CommercialAgencyViewProps {
  onLoadNicheTemplate: (nicheId: string) => void;
  onOpenPricingModal: () => void;
}

export const CommercialAgencyView: React.FC<CommercialAgencyViewProps> = ({
  onLoadNicheTemplate,
  onOpenPricingModal
}) => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'niches' | 'scripts' | 'certificate'>('niches');
  const [copiedScriptIndex, setCopiedScriptIndex] = useState<number | null>(null);

  // Profit calculator state
  const [artsPerMonth, setArtsPerMonth] = useState<number>(12);
  const [pricePerArt, setPricePerArt] = useState<number>(85);

  // Certificate generator state
  const [clientBusinessName, setClientBusinessName] = useState<string>('Old Saloon Barbearia');
  const [clientResponsible, setClientResponsible] = useState<string>('Carlos Eduardo');
  const [projectNiche, setProjectNiche] = useState<string>('Campanha Clássica Anos 50 - Redes Sociais e Quadro de Parede');
  const [licenseKey, setLicenseKey] = useState<string>('RETRO-LIC-2026-X89B');
  const [isCopiedCert, setIsCopiedCert] = useState<boolean>(false);

  // Commercial Niches ready to sell
  const profitableNiches = [
    {
      id: 'niche-burger',
      title: 'Hamburguerias & Diners Retrô',
      icon: Store,
      badge: 'Nicho Mais Lucrativo',
      recommendedPrice: 'R$ 70 a R$ 150 por arte',
      description: 'Anúncios estilo lanchonete clássica americana de 1955. Destaque para milk-shakes, batatas crocantes e hambúrguer na chapa com visual vintage irresistível.',
      headlineSample: 'O Verdadeiro Hambúrguer com o Pão Macio da Vovó!',
      kickerSample: 'DESDE 1958 SERVINDO A CIDADE',
      popularItem: 'Combo Clássico com Batatas Rústicas'
    },
    {
      id: 'niche-barber',
      title: 'Barbearias Vintage & Cutelaria',
      icon: Scissors,
      badge: 'Alta Demanda',
      recommendedPrice: 'R$ 80 a R$ 160 por arte',
      description: 'Cartazes para homens distintos: barba na toalha quente, corte pompadour e loções clássicas. Perfeito para postar e para imprimir em quadros decorativos na barbearia.',
      headlineSample: 'A Arte da Navalha para Homens de Distinto Cavalheirismo',
      kickerSample: 'TRADIÇÃO, HONRA E ELEGÂNCIA',
      popularItem: 'Corte Clássico & Barba Tradicional'
    },
    {
      id: 'niche-coffee',
      title: 'Cafeterias, Torrefações & Confeitarias',
      icon: Coffee,
      badge: 'Excelente Conversão',
      recommendedPrice: 'R$ 60 a R$ 130 por arte',
      description: 'Cafés especiais, tortas artesanais e aromas nostálgicos. Foco na tradição familiar e no sabor genuíno dos grãos selecionados da fazenda.',
      headlineSample: 'O Aromático Café Coado na Hora que Aquece a Alma',
      kickerSample: 'RECEITA DE FAMÍLIA DESDE 1962',
      popularItem: 'Café Filtrado & Torta de Maçã Especial'
    },
    {
      id: 'niche-beer',
      title: 'Cervejarias Artesanais & Pubs',
      icon: Beer,
      badge: 'Público Jovem & Apaixonado',
      recommendedPrice: 'R$ 90 a R$ 180 por arte',
      description: 'Chopp gelado em copos canelados, cerveja de lúpulo nobre e noites de rock clássico. Estilo ilustrado dos anos 60 com selos de garantia de pureza.',
      headlineSample: 'Pura Refrescância Extraída dos Melhores Lúpulos Nacionais',
      kickerSample: 'GARANTIA DE PUREZA ABSOLUTA',
      popularItem: 'Chopp Artesanal Pilsen Extra Gelado'
    },
    {
      id: 'niche-fashion',
      title: 'Brechós, Alfaiatarias & Moda Vintage',
      icon: Shirt,
      badge: 'Tendência em Alta',
      recommendedPrice: 'R$ 75 a R$ 140 por arte',
      description: 'Elegância atemporal, tecidos nobres e cortes sob medida. Anúncios sofisticados para quem busca exclusividade e estilo que nunca sai de moda.',
      headlineSample: 'A Elegância Incomparável do Corte Sob Medida',
      kickerSample: 'ALFAIATARIA DE ALTA COSTURA',
      popularItem: 'Coleção Exclusiva Peças Selecionadas'
    },
    {
      id: 'niche-garage',
      title: 'Oficinas Mecânicas & Lava-Rápidos Clássicos',
      icon: Wrench,
      badge: 'Fidelização Forte',
      recommendedPrice: 'R$ 80 a R$ 150 por arte',
      description: 'Restauração de carros antigos, motos customizadas e serviços automotivos com precisão de mestre mecânico dos anos dourados.',
      headlineSample: 'Mecânica de Precisão para Máquinas que Merecem Respeito',
      kickerSample: 'OFICINA ESPECIALIZADA EM CLÁSSICOS',
      popularItem: 'Revisão Completa e Alinhamento Histórico'
    }
  ];

  // WhatsApp Pitch scripts ready to copy and send
  const salesScripts = [
    {
      title: 'Script 1: Para Hamburguerias e Lanchonetes (WhatsApp)',
      target: 'Dono de Hamburgueria ou Restaurante',
      message: `Olá, tudo bem? Notei que a sua hamburgueria tem uma proposta bem marcante e com personalidade!

Eu desenvolvi um modelo visual temático no estilo dos clássicos diners dos anos 50/60 para o seu cardápio e para posts no Instagram que aumenta muito o engajamento e as vendas nos fins de semana.

Fiz uma prévia com o estilo do seu negócio. Posso te enviar a foto sem compromisso para você ver como ficaria?`
    },
    {
      title: 'Script 2: Para Barbearias Vintage (WhatsApp / Direct)',
      target: 'Proprietário ou Gerente de Barbearia',
      message: `Fala pessoal da barbearia, tudo certo?

Acompanho o trabalho de vocês e o ambiente rústico/vintage de vocês combina 100% com a publicidade clássica da Era de Ouro dos anos 50 (corte clássico, navalha e elegância tradicional).

Criei artes retrô autênticas em alta definição tanto para o Instagram quanto para vocês imprimirem em placas de metal ou quadros para decorar a barbearia.

Se fizer sentido, me avisa que te mostro uma amostra personalizada com o nome da barbearia!`
    },
    {
      title: 'Script 3: Proposta Fechada de Pacote Mensal (4 Artes)',
      target: 'Comércios Locais em Geral',
      message: `Olá! Preparei um pacote especial de 4 artes publicitárias retrô exclusivas para o seu negócio este mês:

✅ 1 Arte de Oferta Especial (Feed + Stories)
✅ 1 Arte de Destaque do Carro-Chefe da casa
✅ 1 Arte Institucional sobre Tradição e Qualidade
✅ 1 Arte pronta para impressão de Quadro Decorativo ou Placa

Tudo em alta definição (300 DPI) com textos persuasivos que vendem.
O pacote completo sai por apenas R$ 240 (sai R$ 60 por arte). Podemos rodar a primeira hoje?`
    }
  ];

  const handleCopyScript = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedScriptIndex(index);
    setTimeout(() => setCopiedScriptIndex(null), 2500);
  };

  const handleCopyCertificate = () => {
    const certText = `========================================================
CERTIFICADO DE LICENÇA DE USO COMERCIAL · MUNDO RETRÔ
========================================================
Chave de Licença: ${licenseKey}
Data de Emissão: ${new Date().toLocaleDateString('pt-BR')}
Cliente Beneficiário: ${clientBusinessName}
Responsável: ${clientResponsible}
Projeto: ${projectNiche}
Status: DIREITOS COMERCIAIS AUTORIZADOS

Este certificado comprova que os materiais visuais e peças publicitárias
produzidos sob o estilo Retrô 1950–1960 foram legalmente licenciados para uso
em redes sociais, anúncios pagos, impressos promocionais e comunicação visual
do estabelecimento acima identificado.

Emissor: Agência & Estúdio Mundo Retrô
========================================================`;
    navigator.clipboard.writeText(certText);
    setIsCopiedCert(true);
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => setIsCopiedCert(false), 3000);
  };

  const estimatedTotal = artsPerMonth * pricePerArt;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 font-outfit">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-xl border border-[#cfa643]/30 bg-gradient-to-r from-[#1f1b14] via-[#171410] to-[#251e16] p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#cfa643]/40 bg-[#cfa643]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#cfa643]">
              <DollarSign className="h-3.5 w-3.5" />
              <span>Central de Monetização e Negócios</span>
            </div>
            <h1 className="font-playfair text-3xl sm:text-4xl font-black text-[#faf6ee] leading-tight">
              Como Transformar Arte Retrô em Dinheiro Real
            </h1>
            <p className="text-sm text-[#b8ad9c] leading-relaxed">
              O design dos anos 50 e 60 tem alto valor percebido. Comércios locais (hamburguerias, barbearias, cafés) pagam com gosto por artes com essa personalidade única para se destacarem da concorrência no Instagram e para fazer quadros de parede.
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

      {/* Navigation Subtabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#2d2822] pb-2">
        <button
          onClick={() => setActiveTab('niches')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'niches'
              ? 'bg-[#cfa643] text-[#121110]'
              : 'text-[#a89d8d] hover:bg-[#201c17] hover:text-[#faf6ee]'
          }`}
        >
          <Store className="h-4 w-4" />
          <span>1. Nichos Lucrativos & Modelos</span>
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'calculator'
              ? 'bg-[#cfa643] text-[#121110]'
              : 'text-[#a89d8d] hover:bg-[#201c17] hover:text-[#faf6ee]'
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          <span>2. Calculadora de Renda</span>
        </button>

        <button
          onClick={() => setActiveTab('scripts')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'scripts'
              ? 'bg-[#cfa643] text-[#121110]'
              : 'text-[#a89d8d] hover:bg-[#201c17] hover:text-[#faf6ee]'
          }`}
        >
          <MessageCircle className="h-4 w-4" />
          <span>3. Scripts de WhatsApp Prontos</span>
        </button>

        <button
          onClick={() => setActiveTab('certificate')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'certificate'
              ? 'bg-[#cfa643] text-[#121110]'
              : 'text-[#a89d8d] hover:bg-[#201c17] hover:text-[#faf6ee]'
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>4. Emissor de Licença Comercial</span>
        </button>
      </div>

      {/* Tab 1: Nichos Lucrativos */}
      {activeTab === 'niches' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-playfair text-xl font-bold text-[#faf6ee]">
                Os 6 Nichos Comerciais que Mais Compram Anúncios Retrô
              </h2>
              <p className="text-xs text-[#a89d8d]">
                Selecione qualquer nicho abaixo para carregar a estrutura recomendada de texto e visual direto no Cartaz:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {profitableNiches.map((niche) => {
              const Icon = niche.icon;
              return (
                <div
                  key={niche.id}
                  className="rounded-xl border border-[#2d2822] bg-[#181512] p-5 shadow-lg flex flex-col justify-between hover:border-[#cfa643]/50 transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="rounded-lg bg-[#252019] p-2.5 text-[#cfa643]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded bg-[#2f271a] px-2 py-0.5 text-[10px] font-bold text-[#e6b94d] uppercase tracking-wider">
                        {niche.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-playfair text-lg font-bold text-[#faf6ee] group-hover:text-[#cfa643] transition-colors">
                        {niche.title}
                      </h3>
                      <p className="text-xs font-semibold text-emerald-400 mt-0.5">
                        Preço sugerido: {niche.recommendedPrice}
                      </p>
                    </div>

                    <p className="text-xs text-[#b8ad9c] leading-relaxed">
                      {niche.description}
                    </p>

                    <div className="rounded-lg bg-[#110f0d] p-3 border border-[#24201a] space-y-1.5 text-[11px]">
                      <div className="text-[#a89d8d]">
                        <span className="font-bold text-[#cfa643]">Kicker:</span> {niche.kickerSample}
                      </div>
                      <div className="text-[#e8decb] font-medium italic">
                        "{niche.headlineSample}"
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#25201a]">
                    <button
                      onClick={() => onLoadNicheTemplate(niche.id)}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded bg-[#272118] px-3.5 py-2 text-xs font-bold text-[#f0e6d6] hover:bg-[#cfa643] hover:text-[#121110] transition-colors"
                    >
                      <span>Abrir Modelo no Cartaz</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Calculadora de Renda */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl border border-[#2d2822] bg-[#181512] p-6 space-y-6 shadow-xl">
            <div>
              <h2 className="font-playfair text-xl font-bold text-[#faf6ee]">
                Simulador de Renda Mensal com Vendas de Artes
              </h2>
              <p className="text-xs text-[#a89d8d] mt-1">
                Ajuste os valores para planejar quantos clientes você precisa atender na sua cidade ou pela internet:
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-[#ded5c6]">Quantas artes você quer vender por mês?</span>
                  <span className="text-[#cfa643] text-sm">{artsPerMonth} artes ({Math.round(artsPerMonth / 4)} clientes com 4 artes cada)</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="40"
                  value={artsPerMonth}
                  onChange={(e) => setArtsPerMonth(Number(e.target.value))}
                  className="w-full accent-[#cfa643] bg-[#2d2822] h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#70675a] mt-1">
                  <span>2 artes (Iniciante)</span>
                  <span>12 artes (Recomendado)</span>
                  <span>40 artes (Agência completa)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-[#ded5c6]">Preço cobrado por arte:</span>
                  <span className="text-emerald-400 text-sm">R$ {pricePerArt},00</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="200"
                  step="5"
                  value={pricePerArt}
                  onChange={(e) => setPricePerArt(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-[#2d2822] h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#70675a] mt-1">
                  <span>R$ 40 (Super acessível)</span>
                  <span>R$ 85 (Média de mercado)</span>
                  <span>R$ 200 (Arte de luxo + impressão)</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-[#12100d] p-4 border border-[#2a241c] space-y-2 text-xs text-[#b8ad9c]">
              <div className="font-bold text-[#cfa643] uppercase text-[11px]">Dica de Ouro para Vender Mais Rápido:</div>
              <p>
                Não venda "uma imagem". Venda um <strong>"Pacote de Transformação Visual Vintage"</strong>: 4 artes temáticas por mês + arquivos prontos em alta definição para o cliente mandar imprimir em quadros decorativos para a parede da loja.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#cfa643]/30 bg-gradient-to-b from-[#201a12] to-[#14120f] p-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#cfa643]">
                Faturamento Estimado
              </span>
              <div className="font-playfair text-4xl sm:text-5xl font-black text-emerald-400">
                R$ {estimatedTotal.toLocaleString('pt-BR')},00
              </div>
              <p className="text-xs text-[#a89d8d] leading-relaxed">
                Com apenas <strong>{Math.ceil(artsPerMonth / 4)} clientes recorrentes</strong> na sua cidade fechando um pacote de 4 artes por R$ {pricePerArt * 4}, você atinge esse faturamento todo mês.
              </p>

              <div className="border-t border-[#2d2822] pt-4 space-y-2 text-xs text-[#ded5c6]">
                <div className="flex justify-between">
                  <span>Custo de produção:</span>
                  <span className="text-emerald-400 font-bold">R$ 0,00</span>
                </div>
                <div className="flex justify-between">
                  <span>Margem de lucro:</span>
                  <span className="text-emerald-400 font-bold">~ 98%</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('scripts')}
              className="mt-6 w-full rounded-lg bg-[#cfa643] py-3 text-xs font-bold text-[#121110] hover:bg-[#e0b654] transition-colors uppercase tracking-wider"
            >
              Ver Scripts para Abordar Clientes Hoje →
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Scripts de WhatsApp */}
      {activeTab === 'scripts' && (
        <div className="space-y-6">
          <div>
            <h2 className="font-playfair text-xl font-bold text-[#faf6ee]">
              Scripts de Abordagem para Copiar e Mandar no WhatsApp
            </h2>
            <p className="text-xs text-[#a89d8d] mt-1">
              Copie o texto, troque o nome do estabelecimento e envie para 5 a 10 comércios da sua região. A taxa de resposta é altíssima porque o visual retrô chama atenção de imediato:
            </p>
          </div>

          <div className="space-y-4">
            {salesScripts.map((script, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#2d2822] bg-[#181512] p-5 shadow-lg space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#25201a] pb-3">
                  <div>
                    <h3 className="font-bold text-sm text-[#faf6ee]">{script.title}</h3>
                    <span className="text-[11px] text-[#cfa643]">Foco: {script.target}</span>
                  </div>

                  <button
                    onClick={() => handleCopyScript(script.message, idx)}
                    className="inline-flex items-center justify-center gap-1.5 rounded bg-[#28221a] px-3.5 py-1.5 text-xs font-bold text-[#f0e6d6] hover:bg-[#cfa643] hover:text-[#121110] transition-colors"
                  >
                    {copiedScriptIndex === idx ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Copiado com Sucesso!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copiar Mensagem</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="whitespace-pre-wrap font-sans text-xs text-[#ded5c6] bg-[#110f0d] p-4 rounded-lg border border-[#221e18] leading-relaxed">
                  {script.message}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Emissor de Licença Comercial */}
      {activeTab === 'certificate' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-[#2d2822] bg-[#181512] p-6 space-y-5 shadow-xl">
            <div>
              <h2 className="font-playfair text-xl font-bold text-[#faf6ee]">
                Gerador de Certificado Comercial para seu Cliente
              </h2>
              <p className="text-xs text-[#a89d8d] mt-1">
                Ao entregar a arte para seu cliente com um Certificado Oficial de Direitos Comerciais, você transmite autoridade profissional imediata e pode cobrar até 3x mais:
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#ded5c6] mb-1">Nome do Estabelecimento / Empresa:</label>
                <input
                  type="text"
                  value={clientBusinessName}
                  onChange={(e) => setClientBusinessName(e.target.value)}
                  className="w-full rounded bg-[#100f0d] border border-[#2f2921] px-3 py-2 text-[#faf6ee] focus:border-[#cfa643] outline-none"
                  placeholder="Ex: Hamburgueria Big Boy Diner"
                />
              </div>

              <div>
                <label className="block font-bold text-[#ded5c6] mb-1">Nome do Responsável / Proprietário:</label>
                <input
                  type="text"
                  value={clientResponsible}
                  onChange={(e) => setClientResponsible(e.target.value)}
                  className="w-full rounded bg-[#100f0d] border border-[#2f2921] px-3 py-2 text-[#faf6ee] focus:border-[#cfa643] outline-none"
                  placeholder="Ex: Marcelo Silva"
                />
              </div>

              <div>
                <label className="block font-bold text-[#ded5c6] mb-1">Finalidade da Campanha:</label>
                <input
                  type="text"
                  value={projectNiche}
                  onChange={(e) => setProjectNiche(e.target.value)}
                  className="w-full rounded bg-[#100f0d] border border-[#2f2921] px-3 py-2 text-[#faf6ee] focus:border-[#cfa643] outline-none"
                  placeholder="Ex: Campanha de Lançamento no Instagram e Quadros da Loja"
                />
              </div>

              <div>
                <label className="block font-bold text-[#ded5c6] mb-1">Código Único da Licença:</label>
                <input
                  type="text"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  className="w-full rounded bg-[#100f0d] border border-[#2f2921] px-3 py-2 text-[#cfa643] font-mono outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleCopyCertificate}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#cfa643] py-3 text-xs font-bold text-[#121110] hover:bg-[#e0b654] transition-colors"
            >
              {isCopiedCert ? <Check className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
              <span>{isCopiedCert ? 'Certificado Copiado!' : 'Copiar Certificado para Enviar'}</span>
            </button>
          </div>

          {/* Certificate Live Preview */}
          <div className="rounded-xl border-2 border-[#cfa643]/40 bg-[#f7f2e7] p-6 text-[#1a1714] shadow-2xl space-y-4 font-serif relative">
            <div className="border-4 border-[#2b2416] p-5 space-y-4 bg-[#fbf8f1]">
              <div className="text-center space-y-1 border-b-2 border-[#2b2416] pb-3">
                <div className="text-[10px] tracking-widest uppercase font-bold text-[#7a6a4f]">
                  República dos Anúncios Clássicos · 1950–1960
                </div>
                <h3 className="font-playfair text-xl font-black text-[#1c1813] uppercase tracking-wide">
                  Certificado de Licença Comercial
                </h3>
                <div className="text-[11px] font-mono text-[#544837]">
                  CHAVE: {licenseKey}
                </div>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-[#302a21]">
                <p>
                  Certifica-se por meio deste instrumento que o estabelecimento <strong>{clientBusinessName || 'Cliente'}</strong>, sob a responsabilidade de <strong>{clientResponsible || 'Responsável'}</strong>, possui autorização expressa e irrevogável para reprodução, veiculação digital e confecção de impressos das peças publicitárias retrô criadas.
                </p>

                <div className="bg-[#ede5d3] p-3 rounded border border-[#d4c7af] text-[11px] space-y-1">
                  <div><strong>Destinação:</strong> {projectNiche}</div>
                  <div><strong>Validade:</strong> Vitalícia para o material entregue</div>
                  <div><strong>Padrão Técnico:</strong> Diagramação Histórica Fiel Anos 50/60</div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#3b3325] text-[10px] text-[#544837]">
                <div>
                  Emissão: {new Date().toLocaleDateString('pt-BR')}
                </div>
                <div className="font-bold uppercase tracking-wider text-[#822415]">
                  ★ Licença Autenticada ★
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
