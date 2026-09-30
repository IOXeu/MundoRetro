import React, { useState, useRef } from 'react';
import { AdFormat, RetroDecade } from '../types/retro';
import {
  PRESET_ADS,
  RETRO_FRAMES,
  RETRO_RIBBONS,
  RETRO_FONTS,
  AUTHENTIC_CTAS,
  AUTHENTIC_SLOGANS,
  HISTORICAL_RULES,
  RETRO_IMAGE_GALLERY,
  retro50sPaper,
  retro50sAd,
  retro60sAd,
  retroVintageCar,
  retroCleanserCan,
  retroLiptonKnives
} from '../data/retroArchive';
import { AdCanvasPreview } from './AdCanvasPreview';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import {
  Download,
  Copy,
  RefreshCw,
  Sparkles,
  Sliders,
  Check,
  Image as ImageIcon,
  Palette,
  Type,
  Layout,
  Instagram,
  Facebook,
  Upload
} from 'lucide-react';

export const StudioView: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  // Current Ad State initialized from Preset 1
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESET_ADS[0].id);
  const [decade, setDecade] = useState<RetroDecade>(PRESET_ADS[0].decade);
  const [format, setFormat] = useState<AdFormat>('feed');

  // Ad Content
  const [kicker, setKicker] = useState<string>(PRESET_ADS[0].kicker);
  const [headline, setHeadline] = useState<string>(PRESET_ADS[0].headline);
  const [headlineFont, setHeadlineFont] = useState<string>(PRESET_ADS[0].headlineFont);
  const [subheadline, setSubheadline] = useState<string>(PRESET_ADS[0].subheadline);
  const [bodyCopy, setBodyCopy] = useState<string>(PRESET_ADS[0].bodyCopy);
  const [priceCta, setPriceCta] = useState<string>(PRESET_ADS[0].priceCta);
  const [classicSlogan, setClassicSlogan] = useState<string>(PRESET_ADS[0].classicSlogan);
  const [footerCredit, setFooterCredit] = useState<string>(PRESET_ADS[0].footerCredit);

  // Visual Assets
  const [selectedFrameId, setSelectedFrameId] = useState<string>(PRESET_ADS[0].frameId);
  const [selectedRibbonId, setSelectedRibbonId] = useState<string>(PRESET_ADS[0].ribbonId);
  const [paperTexture, setPaperTexture] = useState<'aged-newsprint' | 'litho-cream' | 'halftone-screen' | 'clean-vintage'>(
    PRESET_ADS[0].paperTexture
  );
  const [imageUrl, setImageUrl] = useState<string>(PRESET_ADS[0].imageUrl);
  const [primaryColor, setPrimaryColor] = useState<string>(PRESET_ADS[0].primaryColor);
  const [accentColor, setAccentColor] = useState<string>(PRESET_ADS[0].accentColor);
  const [filterMode, setFilterMode] = useState<'full-color' | 'sepia' | 'black-white'>('full-color');

  // UI States
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'content' | 'visual' | 'presets' | 'gallery'>('content');

  // Find active frame and ribbon
  const currentFrame = RETRO_FRAMES.find((f) => f.id === selectedFrameId) || RETRO_FRAMES[0];
  const currentRibbon = RETRO_RIBBONS.find((r) => r.id === selectedRibbonId) || RETRO_RIBBONS[0];

  // Apply Preset
  const handleApplyPreset = (presetId: string) => {
    const preset = PRESET_ADS.find((p) => p.id === presetId);
    if (!preset) return;
    setSelectedPresetId(presetId);
    setDecade(preset.decade);
    setKicker(preset.kicker);
    setHeadline(preset.headline);
    setHeadlineFont(preset.headlineFont);
    setSubheadline(preset.subheadline);
    setBodyCopy(preset.bodyCopy);
    setPriceCta(preset.priceCta);
    setClassicSlogan(preset.classicSlogan);
    setFooterCredit(preset.footerCredit);
    setSelectedFrameId(preset.frameId);
    setSelectedRibbonId(preset.ribbonId);
    setPaperTexture(preset.paperTexture);
    setImageUrl(preset.imageUrl);
    setPrimaryColor(preset.primaryColor);
    setAccentColor(preset.accentColor);
  };

  // Export as PNG
  const handleExportPNG = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        quality: 0.95,
        pixelRatio: 2 // High Resolution export for social media
      });
      const link = document.createElement('a');
      link.download = `anuncio-retro-${headline.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (err) {
      console.error('Falha ao exportar imagem:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Copy Caption for Instagram/Facebook
  const handleCopyCaption = () => {
    const caption = `★ ${headline.toUpperCase()} ★\n\n${subheadline ? `"${subheadline}"\n\n` : ''}${bodyCopy}\n\n💰 Condições de Época: ${priceCta}\n✨ Slogan: "${classicSlogan}"\n\n${footerCredit}\n\n#VintageAd #PublicidadeRetro #Anos50 #Anos60 #MundoRetro #DesignClassico #PropagandaAntiga`;
    navigator.clipboard.writeText(caption);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  // Quick Copy Inspiration Generator (Vintage Presets by Niche)
  const handleQuickCopyGen = (niche: string) => {
    if (niche === 'beleza') {
      setKicker('O SEGREDO DA JUVENTUDE');
      setHeadline('Pele Radiante que Cativa');
      setSubheadline('Aclamado pelas mais distintas senhoras do país');
      setBodyCopy('Uma fórmula botânica que rejuvenesce e restaura a maciez original. Desfrute de elogios espontâneos com a proteção que só os legítimos ingredientes purificados oferecem.');
      setPriceCta('Apenas Cr$ 95,00 nas boas farmácias');
      setClassicSlogan('A beleza eterna ao seu alcance.');
    } else if (niche === 'automovel') {
      setKicker('SUPREMACIA MECÂNICA');
      setHeadline('O Conquistador das Estradas');
      setSubheadline('Silêncio a 100 km/h e estabilidade sem precedentes');
      setBodyCopy('Linhas aerodinâmicas desenhadas para encantar, motor potente de partida instantânea e economia comprovada litro a litro. O veículo que reflete a sua liderança.');
      setPriceCta('Facilitado com pequena entrada');
      setClassicSlogan('Segurança e distinção em cada curva.');
    } else if (niche === 'alimento') {
      setKicker('O SABOR MAIS APRECIADO');
      setHeadline('A Alegria dos Lares Felizes');
      setSubheadline('Colheita selecionada para agradar ao paladar mais exigente');
      setBodyCopy('Do primeiro aroma ao último gole, uma experiência rica em nutrição e sabor genuíno. Sirva a quem você mais ama com a tranquilidade da garantia de pureza incondicional.');
      setPriceCta('Cr$ 45,00 o pacote selado a vácuo');
      setClassicSlogan('Tradição que se transmite de mãe para filha.');
    } else if (niche === 'casa') {
      setKicker('MODERNIDADE DOMÉSTICA');
      setHeadline('Mais Descanso para a Esposa');
      setSubheadline('A tecnologia a favor da harmonia familiar');
      setBodyCopy('Economize horas de esforço diário. Com mecanismo silencioso e durabilidade de décadas, é o investimento definitivo que valoriza sua residência.');
      setPriceCta('Em suaves mensalidades pelo crediário');
      setClassicSlogan('A tranquilidade que a sua família merece.');
    }
  };

  // Image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6 py-6">
      {/* Top Bar Controls */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2e2a24] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-playfair text-2xl font-black text-[#faf6ee]">
              Estúdio de Anúncios Retrô
            </span>
            <span className="rounded bg-[#cfa643]/20 px-2 py-0.5 font-mono text-xs font-bold text-[#cfa643]">
              {decade}s
            </span>
          </div>
          <p className="text-xs text-[#9c9181]">
            Crie peças autênticas para Feed (1:1), Stories (9:16) ou Facebook Post com tipografia e molduras da época.
          </p>
        </div>

        {/* Format Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center rounded-lg bg-[#1f1b16] p-1 border border-[#332c23]">
            <button
              onClick={() => setFormat('feed')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                format === 'feed'
                  ? 'bg-[#cfa643] text-[#121110] font-bold shadow-xs'
                  : 'text-[#a69c8d] hover:text-[#faf6ee]'
              }`}
            >
              <Instagram className="h-3.5 w-3.5" />
              <span>Feed (1:1)</span>
            </button>
            <button
              onClick={() => setFormat('stories')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                format === 'stories'
                  ? 'bg-[#cfa643] text-[#121110] font-bold shadow-xs'
                  : 'text-[#a69c8d] hover:text-[#faf6ee]'
              }`}
            >
              <Layout className="h-3.5 w-3.5" />
              <span>Stories (9:16)</span>
            </button>
            <button
              onClick={() => setFormat('horizontal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                format === 'horizontal'
                  ? 'bg-[#cfa643] text-[#121110] font-bold shadow-xs'
                  : 'text-[#a69c8d] hover:text-[#faf6ee]'
              }`}
            >
              <Facebook className="h-3.5 w-3.5" />
              <span>Horizontal (4:3)</span>
            </button>
          </div>

          {/* Action buttons */}
          <button
            onClick={handleExportPNG}
            disabled={isExporting}
            className="flex items-center gap-2 rounded-lg bg-[#b83227] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#d43c2f] transition-all disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            <span>{isExporting ? 'Processando...' : 'Baixar PNG (Alta Res)'}</span>
          </button>

          <button
            onClick={handleCopyCaption}
            className="flex items-center gap-1.5 rounded-lg border border-[#473e32] bg-[#221e19] px-3 py-2 text-xs font-medium text-[#ded5c6] hover:bg-[#2e2922] transition-colors"
          >
            {copySuccess ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            <span>{copySuccess ? 'Copiado!' : 'Copiar Legenda'}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Canvas Preview */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-center">
          {/* Canvas Wrapper */}
          <div className="w-full flex justify-center bg-[#151310] p-4 sm:p-6 rounded-xl border border-[#2b261f]">
            <AdCanvasPreview
              format={format}
              kicker={kicker}
              headline={headline}
              headlineFont={headlineFont}
              subheadline={subheadline}
              bodyCopy={bodyCopy}
              priceCta={priceCta}
              classicSlogan={classicSlogan}
              footerCredit={footerCredit}
              frame={currentFrame}
              ribbon={currentRibbon}
              primaryColor={primaryColor}
              accentColor={accentColor}
              paperTexture={paperTexture}
              imageUrl={imageUrl}
              filterMode={filterMode}
              canvasRef={canvasRef}
            />
          </div>

          {/* Quick Filter Bar */}
          <div className="mt-4 flex items-center justify-between w-full max-w-[520px] px-2 text-xs text-[#8c8273]">
            <span>Filtro de Época:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterMode('full-color')}
                className={`px-2.5 py-1 rounded text-[11px] ${
                  filterMode === 'full-color' ? 'bg-[#cfa643] text-black font-bold' : 'bg-[#221e19] text-[#c4b9a7]'
                }`}
              >
                Cores Vivas
              </button>
              <button
                onClick={() => setFilterMode('sepia')}
                className={`px-2.5 py-1 rounded text-[11px] ${
                  filterMode === 'sepia' ? 'bg-[#cfa643] text-black font-bold' : 'bg-[#221e19] text-[#c4b9a7]'
                }`}
              >
                Sépia 1954
              </button>
              <button
                onClick={() => setFilterMode('black-white')}
                className={`px-2.5 py-1 rounded text-[11px] ${
                  filterMode === 'black-white' ? 'bg-[#cfa643] text-black font-bold' : 'bg-[#221e19] text-[#c4b9a7]'
                }`}
              >
                P&B Retícula
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div className="lg:col-span-6 xl:col-span-5 border border-[#2e2a24] bg-[#1a1714] rounded-xl overflow-hidden shadow-xl">
          {/* Tabs */}
          <div className="flex border-b border-[#2e2a24] bg-[#151310]">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'content'
                  ? 'border-[#cfa643] text-[#cfa643] bg-[#1f1b16]'
                  : 'border-transparent text-[#9c9181] hover:text-[#ded5c6]'
              }`}
            >
              <Type className="h-3.5 w-3.5" />
              <span>Textos & Copy</span>
            </button>
            <button
              onClick={() => setActiveTab('visual')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'visual'
                  ? 'border-[#cfa643] text-[#cfa643] bg-[#1f1b16]'
                  : 'border-transparent text-[#9c9181] hover:text-[#ded5c6]'
              }`}
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Molduras & Estilo</span>
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'presets'
                  ? 'border-[#cfa643] text-[#cfa643] bg-[#1f1b16]'
                  : 'border-transparent text-[#9c9181] hover:text-[#ded5c6]'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Modelos</span>
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'gallery'
                  ? 'border-[#cfa643] text-[#cfa643] bg-[#1f1b16]'
                  : 'border-transparent text-[#9c9181] hover:text-[#ded5c6]'
              }`}
            >
              <ImageIcon className="h-3.5 w-3.5" />
              <span>Banco Retrô</span>
            </button>
          </div>

          <div className="p-5 space-y-5 max-h-[720px] overflow-y-auto">
            {/* TAB 1: CONTENT & COPYWRITING */}
            {activeTab === 'content' && (
              <div className="space-y-4">
                {/* Quick Copy by Niche */}
                <div className="border border-[#332c23] bg-[#221d17] p-3 rounded-lg">
                  <div className="text-[11px] font-mono text-[#cfa643] uppercase mb-2 flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3" />
                    <span>Injetar Copy Clássico por Ramo:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => handleQuickCopyGen('beleza')}
                      className="text-left px-2 py-1.5 rounded bg-[#2c261e] text-[11px] text-[#ded5c6] hover:bg-[#3d3429] transition-colors"
                    >
                      ✦ Beleza & Cuidados
                    </button>
                    <button
                      onClick={() => handleQuickCopyGen('automovel')}
                      className="text-left px-2 py-1.5 rounded bg-[#2c261e] text-[11px] text-[#ded5c6] hover:bg-[#3d3429] transition-colors"
                    >
                      ✦ Automóveis & Motores
                    </button>
                    <button
                      onClick={() => handleQuickCopyGen('alimento')}
                      className="text-left px-2 py-1.5 rounded bg-[#2c261e] text-[11px] text-[#ded5c6] hover:bg-[#3d3429] transition-colors"
                    >
                      ✦ Café & Alimentos
                    </button>
                    <button
                      onClick={() => handleQuickCopyGen('casa')}
                      className="text-left px-2 py-1.5 rounded bg-[#2c261e] text-[11px] text-[#ded5c6] hover:bg-[#3d3429] transition-colors"
                    >
                      ✦ Casa & Eletrodomésticos
                    </button>
                  </div>
                </div>

                {/* Kicker */}
                <div>
                  <label className="block text-xs font-mono text-[#a89d8d] uppercase mb-1">
                    01. Kicker Superior (Chamada de Atenção)
                  </label>
                  <input
                    type="text"
                    value={kicker}
                    onChange={(e) => setKicker(e.target.value)}
                    className="w-full bg-[#121110] border border-[#383126] rounded px-3 py-2 text-xs text-[#faf6ee] focus:border-[#cfa643] focus:outline-none"
                    placeholder="Ex: ATENÇÃO DISTINTA SENHORA"
                  />
                </div>

                {/* Headline & Font */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-[#a89d8d] uppercase">
                      02. Titular Principal (Impacto)
                    </label>
                  </div>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full bg-[#121110] border border-[#383126] rounded px-3 py-2 text-sm text-[#faf6ee] focus:border-[#cfa643] focus:outline-none"
                  />

                  {/* Font picker */}
                  <div>
                    <span className="text-[11px] text-[#8c8273]">Fonte do Titular:</span>
                    <select
                      value={headlineFont}
                      onChange={(e) => setHeadlineFont(e.target.value)}
                      className="mt-1 w-full bg-[#121110] border border-[#383126] rounded px-2.5 py-1.5 text-xs text-[#ded5c6] focus:border-[#cfa643] focus:outline-none"
                    >
                      {RETRO_FONTS.map((font) => (
                        <option key={font.id} value={font.id}>
                          {font.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subheadline */}
                <div>
                  <label className="block text-xs font-mono text-[#a89d8d] uppercase mb-1">
                    03. Subtitular (Complemento Elegante)
                  </label>
                  <input
                    type="text"
                    value={subheadline}
                    onChange={(e) => setSubheadline(e.target.value)}
                    className="w-full bg-[#121110] border border-[#383126] rounded px-3 py-2 text-xs text-[#faf6ee] focus:border-[#cfa643] focus:outline-none"
                  />
                </div>

                {/* Body Copy */}
                <div>
                  <label className="block text-xs font-mono text-[#a89d8d] uppercase mb-1">
                    04. Copy Argumentativo (Texto de Venda)
                  </label>
                  <textarea
                    rows={3}
                    value={bodyCopy}
                    onChange={(e) => setBodyCopy(e.target.value)}
                    className="w-full bg-[#121110] border border-[#383126] rounded px-3 py-2 text-xs text-[#faf6ee] focus:border-[#cfa643] focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Price CTA */}
                <div>
                  <label className="block text-xs font-mono text-[#a89d8d] uppercase mb-1">
                    05. Chamada de Preço / Condições (Cr$)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={priceCta}
                      onChange={(e) => setPriceCta(e.target.value)}
                      className="flex-1 bg-[#121110] border border-[#383126] rounded px-3 py-2 text-xs text-[#faf6ee] focus:border-[#cfa643] focus:outline-none"
                    />
                  </div>
                  {/* Preset CTAs */}
                  <div className="mt-1 flex flex-wrap gap-1">
                    {AUTHENTIC_CTAS.slice(0, 3).map((c, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setPriceCta(c.value)}
                        className="text-[10px] bg-[#221e19] text-[#a89d8d] hover:text-[#ded5c6] px-1.5 py-0.5 rounded border border-[#332c23]"
                      >
                        {c.value}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slogan */}
                <div>
                  <label className="block text-xs font-mono text-[#a89d8d] uppercase mb-1">
                    06. Slogan Clássico
                  </label>
                  <input
                    type="text"
                    value={classicSlogan}
                    onChange={(e) => setClassicSlogan(e.target.value)}
                    className="w-full bg-[#121110] border border-[#383126] rounded px-3 py-2 text-xs text-[#faf6ee] focus:border-[#cfa643] focus:outline-none italic"
                  />
                </div>

                {/* Footer Merchant line */}
                <div>
                  <label className="block text-xs font-mono text-[#a89d8d] uppercase mb-1">
                    07. Rodapé do Distribuidor / Marca
                  </label>
                  <input
                    type="text"
                    value={footerCredit}
                    onChange={(e) => setFooterCredit(e.target.value)}
                    className="w-full bg-[#121110] border border-[#383126] rounded px-3 py-2 text-xs text-[#faf6ee] focus:border-[#cfa643] focus:outline-none font-mono"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: VISUAL STYLING */}
            {activeTab === 'visual' && (
              <div className="space-y-4">
                {/* Frame Selector */}
                <div>
                  <label className="block text-xs font-mono text-[#a89d8d] uppercase mb-2">
                    Moldura / Borda Histórica
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {RETRO_FRAMES.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSelectedFrameId(f.id)}
                        className={`p-2.5 rounded text-left border text-xs transition-all ${
                          selectedFrameId === f.id
                            ? 'border-[#cfa643] bg-[#2a241c] text-[#faf6ee]'
                            : 'border-[#332c23] bg-[#151310] text-[#a89d8d] hover:border-[#4d4234]'
                        }`}
                      >
                        <div className="font-bold">{f.name}</div>
                        <div className="text-[10px] text-[#8c8273]">{f.decade}s</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ribbon / Badge */}
                <div>
                  <label className="block text-xs font-mono text-[#a89d8d] uppercase mb-2">
                    Flâmula ou Selo de Garantia
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {RETRO_RIBBONS.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedRibbonId(r.id)}
                        className={`p-2 rounded text-left border text-xs transition-all ${
                          selectedRibbonId === r.id
                            ? 'border-[#cfa643] bg-[#2a241c] text-[#faf6ee]'
                            : 'border-[#332c23] bg-[#151310] text-[#a89d8d] hover:border-[#4d4234]'
                        }`}
                      >
                        <div className="font-semibold">{r.name}</div>
                        <div className="text-[10px] text-[#8c8273]">"{r.text}"</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Selection */}
                <div>
                  <label className="block text-xs font-mono text-[#a89d8d] uppercase mb-2 flex items-center justify-between">
                    <span>Ilustração do Anúncio</span>
                    <span className="text-[10px] text-[#cfa643]">Genuína da Época</span>
                  </label>

                  {/* Stock authentic images */}
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <button
                      onClick={() => setImageUrl(retro50sAd)}
                      className={`relative overflow-hidden rounded border aspect-square ${
                        imageUrl === retro50sAd ? 'border-2 border-[#cfa643]' : 'border-[#383126]'
                      }`}
                    >
                      <img src={retro50sAd} alt="Anos 50 Mulher" className="h-full w-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] text-center text-white py-0.5">
                        Cosmético 50s
                      </span>
                    </button>

                    <button
                      onClick={() => setImageUrl(retro60sAd)}
                      className={`relative overflow-hidden rounded border aspect-square ${
                        imageUrl === retro60sAd ? 'border-2 border-[#cfa643]' : 'border-[#383126]'
                      }`}
                    >
                      <img src={retro60sAd} alt="Anos 60 Mod" className="h-full w-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] text-center text-white py-0.5">
                        Moda 60s
                      </span>
                    </button>

                    <button
                      onClick={() => setImageUrl(retro50sPaper)}
                      className={`relative overflow-hidden rounded border aspect-square ${
                        imageUrl === retro50sPaper ? 'border-2 border-[#cfa643]' : 'border-[#383126]'
                      }`}
                    >
                      <img src={retro50sPaper} alt="Papel Puro" className="h-full w-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] text-center text-white py-0.5">
                        Textura Pura
                      </span>
                    </button>
                  </div>

                  {/* Upload custom image */}
                  <div className="flex items-center gap-2">
                    <label className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border border-dashed border-[#473e32] rounded cursor-pointer hover:border-[#cfa643] transition-colors text-xs text-[#a89d8d]">
                      <ImageIcon className="h-3.5 w-3.5" />
                      <span>Subir sua própria imagem</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Paper Texture */}
                <div>
                  <label className="block text-xs font-mono text-[#a89d8d] uppercase mb-2">
                    Textura de Papel e Impressão
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPaperTexture('aged-newsprint')}
                      className={`p-2 rounded text-left border text-xs ${
                        paperTexture === 'aged-newsprint'
                          ? 'border-[#cfa643] bg-[#2a241c] text-[#faf6ee]'
                          : 'border-[#332c23] bg-[#151310] text-[#a89d8d]'
                      }`}
                    >
                      Papel Jornal 1954
                    </button>
                    <button
                      onClick={() => setPaperTexture('litho-cream')}
                      className={`p-2 rounded text-left border text-xs ${
                        paperTexture === 'litho-cream'
                          ? 'border-[#cfa643] bg-[#2a241c] text-[#faf6ee]'
                          : 'border-[#332c23] bg-[#151310] text-[#a89d8d]'
                      }`}
                    >
                      Creme Litográfico
                    </button>
                    <button
                      onClick={() => setPaperTexture('halftone-screen')}
                      className={`p-2 rounded text-left border text-xs ${
                        paperTexture === 'halftone-screen'
                          ? 'border-[#cfa643] bg-[#2a241c] text-[#faf6ee]'
                          : 'border-[#332c23] bg-[#151310] text-[#a89d8d]'
                      }`}
                    >
                      Retícula Halftone
                    </button>
                    <button
                      onClick={() => setPaperTexture('clean-vintage')}
                      className={`p-2 rounded text-left border text-xs ${
                        paperTexture === 'clean-vintage'
                          ? 'border-[#cfa643] bg-[#2a241c] text-[#faf6ee]'
                          : 'border-[#332c23] bg-[#151310] text-[#a89d8d]'
                      }`}
                    >
                      Vintage Suave
                    </button>
                  </div>
                </div>

                {/* Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#a89d8d] uppercase mb-1">
                      Cor Principal (Tinta)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="h-8 w-10 cursor-pointer rounded border-0 bg-transparent"
                      />
                      <input
                        type="text"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-full bg-[#121110] border border-[#383126] rounded px-2 py-1 text-xs text-[#faf6ee] font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#a89d8d] uppercase mb-1">
                      Cor de Acento (Destaque)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="h-8 w-10 cursor-pointer rounded border-0 bg-transparent"
                      />
                      <input
                        type="text"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-full bg-[#121110] border border-[#383126] rounded px-2 py-1 text-xs text-[#faf6ee] font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: READY-TO-USE PRESETS */}
            {activeTab === 'presets' && (
              <div className="space-y-3">
                <p className="text-xs text-[#8c8273]">
                  Selecione um arquétipo autêntico dos anos 50 ou 60 para carregar imediatamente a diagramação completa:
                </p>

                {PRESET_ADS.map((preset) => (
                  <div
                    key={preset.id}
                    onClick={() => handleApplyPreset(preset.id)}
                    className={`cursor-pointer rounded-lg border p-4 transition-all ${
                      selectedPresetId === preset.id
                        ? 'border-[#cfa643] bg-[#2a241c]'
                        : 'border-[#332c23] bg-[#151310] hover:border-[#4d4234]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#faf6ee]">{preset.title}</span>
                      <span className="rounded bg-[#1f1b16] px-1.5 py-0.5 text-[10px] font-mono text-[#cfa643]">
                        {preset.decade}s
                      </span>
                    </div>
                    <div className="mt-1 text-[11px] text-[#a89d8d]">{preset.category}</div>
                    <div className="mt-2 text-xs italic text-[#ded5c6] line-clamp-1">
                      "{preset.headline}"
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 4: RETRO IMAGE GALLERY & USER UPLOAD */}
            {activeTab === 'gallery' && (
              <div className="space-y-4">
                <div className="border border-[#cfa643]/40 bg-[#1c1813] p-3 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono text-[#cfa643] uppercase font-bold flex items-center gap-1.5">
                      <Upload className="h-3.5 w-3.5" />
                      <span>Subir Foto do Meu Produto</span>
                    </span>
                    <span className="text-[10px] text-[#8c8273]">Foto Real</span>
                  </div>
                  <label className="flex items-center justify-center gap-2 py-2 px-3 bg-[#b83227] hover:bg-[#d63a2c] text-white rounded cursor-pointer text-xs font-bold transition-all shadow-sm">
                    <Upload className="h-3.5 w-3.5" />
                    <span>Carregar Foto do Computador</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <span className="text-xs font-mono text-[#cfa643] uppercase tracking-wider block font-bold mb-2">
                    Acervo de Imagens Históricas:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {RETRO_IMAGE_GALLERY.map((img) => (
                      <div
                        key={img.id}
                        onClick={() => setImageUrl(img.imageUrl)}
                        className={`cursor-pointer rounded border p-2 text-center transition-all ${
                          imageUrl === img.imageUrl
                            ? 'border-[#cfa643] bg-[#2a241c]'
                            : 'border-[#332c23] bg-[#15120f] hover:border-[#4d4132]'
                        }`}
                      >
                        <img
                          src={img.imageUrl}
                          alt={img.name}
                          className="h-20 w-full object-cover rounded mb-1"
                        />
                        <div className="text-[11px] font-bold text-[#faf6ee] truncate">{img.name}</div>
                        <div className="text-[9px] text-[#8c8273]">{img.year}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
