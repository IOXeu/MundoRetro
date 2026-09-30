import React, { useState, useRef } from 'react';
import { CanvasLayer, LayerType, AdFormat, ArrowStyle, BubbleStyle, RetroBgType } from '../types/retro';
import {
  MICROFOODBR_DEFAULT_LAYERS,
  retroWomanPointing,
  retroFoodBurger,
  retroVintageCar,
  retroCleanserCan,
  retroLiptonKnives,
  retroBgSunburst,
  retroBgDinerMint,
  retroBgKraftPaper,
  retro50sPaper,
  RETRO_IMAGE_GALLERY
} from '../data/retroArchive';
import { COMMERCIAL_NICHE_TEMPLATES } from '../data/commercialTemplates';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import {
  Download,
  Plus,
  Trash2,
  Move,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Upload,
  Eye,
  EyeOff,
  Sparkles,
  Award,
  Type,
  Image as ImageIcon,
  ArrowRight,
  MessageSquare,
  Palette,
  Undo2,
  Layout,
  Filter,
  Check,
  Crown,
  DollarSign,
  Store,
  ChevronDown
} from 'lucide-react';

interface InteractiveCanvasEditorProps {
  isProUser?: boolean;
  onOpenPricingModal?: () => void;
  initialNicheId?: string | null;
}

export const InteractiveCanvasEditor: React.FC<InteractiveCanvasEditorProps> = ({
  isProUser = false,
  onOpenPricingModal,
  initialNicheId = null
}) => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [showNicheMenu, setShowNicheMenu] = useState<boolean>(false);

  // Auto-load template if provided via props
  React.useEffect(() => {
    if (initialNicheId && COMMERCIAL_NICHE_TEMPLATES[initialNicheId]) {
      const template = COMMERCIAL_NICHE_TEMPLATES[initialNicheId];
      setLayers(template.layers);
      setSelectedBg(template.bgType);
      setSelectedBorder(template.border);
      setSelectedLayerId(template.layers[0]?.id || null);
    }
  }, [initialNicheId]);

  const handleLoadNicheTemplate = (nicheId: string) => {
    const template = COMMERCIAL_NICHE_TEMPLATES[nicheId];
    if (template) {
      setLayers(template.layers);
      setSelectedBg(template.bgType);
      setSelectedBorder(template.border);
      setSelectedLayerId(template.layers[0]?.id || null);
      setShowNicheMenu(false);
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    }
  };

  // Canvas Format: stories (9:16), feed (1:1), horizontal (4:3)
  const [format, setFormat] = useState<AdFormat>('stories');
  const [selectedBg, setSelectedBg] = useState<RetroBgType>('aged-poster');
  const [selectedBorder, setSelectedBorder] = useState<'double-vintage' | 'coupon-dash' | 'diner-plate' | 'starburst-googie' | 'none'>('double-vintage');

  // Layers list
  const [layers, setLayers] = useState<CanvasLayer[]>(MICROFOODBR_DEFAULT_LAYERS);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>('layer-seal');

  // Dragging state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Export states
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [activeSideTab, setActiveSideTab] = useState<'elements' | 'backgrounds' | 'edit_item' | 'gallery'>('elements');
  const [galleryCategory, setGalleryCategory] = useState<string>('todos');

  // Currently selected layer object
  const selectedLayer = layers.find((l) => l.id === selectedLayerId) || null;

  // Start dragging a layer directly on the canvas
  const handleMouseDownOnLayer = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLayerId(id);
    setIsDragging(true);

    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const layer = layers.find((l) => l.id === id);
      if (layer) {
        const clickPercentX = ((e.clientX - rect.left) / rect.width) * 100;
        const clickPercentY = ((e.clientY - rect.top) / rect.height) * 100;
        setDragOffset({
          x: clickPercentX - layer.x,
          y: clickPercentY - layer.y
        });
      }
    }
  };

  // Handle mouse move on canvas container
  const handleMouseMoveOnCanvas = (e: React.MouseEvent) => {
    if (!isDragging || !selectedLayerId || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const currentPercentX = ((e.clientX - rect.left) / rect.width) * 100;
    const currentPercentY = ((e.clientY - rect.top) / rect.height) * 100;

    const newX = Math.max(0, Math.min(100, Math.round(currentPercentX - dragOffset.x)));
    const newY = Math.max(0, Math.min(100, Math.round(currentPercentY - dragOffset.y)));

    setLayers((prev) =>
      prev.map((l) => (l.id === selectedLayerId ? { ...l, x: newX, y: newY } : l))
    );
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Update selected layer property
  const updateSelectedLayer = (updates: Partial<CanvasLayer>) => {
    if (!selectedLayerId) return;
    setLayers((prev) =>
      prev.map((l) => (l.id === selectedLayerId ? { ...l, ...updates } : l))
    );
  };

  const updateSelectedContent = (contentUpdates: Partial<CanvasLayer['content']>) => {
    if (!selectedLayerId) return;
    setLayers((prev) =>
      prev.map((l) =>
        l.id === selectedLayerId
          ? { ...l, content: { ...l.content, ...contentUpdates } }
          : l
      )
    );
  };

  // Scale adjustment (+ / -)
  const adjustScale = (delta: number) => {
    if (!selectedLayer) return;
    const newScale = Math.max(0.25, Math.min(3.0, Number((selectedLayer.scale + delta).toFixed(2))));
    updateSelectedLayer({ scale: newScale });
  };

  // Rotation adjustment
  const adjustRotation = (delta: number) => {
    if (!selectedLayer) return;
    const newRotation = (selectedLayer.rotation + delta) % 360;
    updateSelectedLayer({ rotation: newRotation });
  };

  // Delete layer
  const handleDeleteLayer = (id: string) => {
    setLayers((prev) => prev.filter((l) => l.id !== id));
    if (selectedLayerId === id) setSelectedLayerId(null);
  };

  // Add new retro element
  const handleAddLayer = (type: LayerType, subType?: string) => {
    const id = `layer-${Date.now()}`;
    let newLayer: CanvasLayer;

    if (type === 'retro_arrow') {
      const arrowStyle = (subType as ArrowStyle) || 'curved-arrow';
      newLayer = {
        id,
        type: 'retro_arrow',
        name: `Seta Retrô (${arrowStyle})`,
        x: 45,
        y: 42,
        scale: 1,
        rotation: 0,
        zIndex: 30,
        visible: true,
        content: {
          arrowStyle,
          color: '#c4421a',
          accentColor: '#ffffff',
          text: arrowStyle === 'block-arrow' ? 'VEJA!' : undefined
        }
      };
    } else if (type === 'speech_bubble') {
      const bubbleStyle = (subType as BubbleStyle) || 'cloud-bubble';
      newLayer = {
        id,
        type: 'speech_bubble',
        name: 'Balão Nuvem Retrô',
        x: 50,
        y: 35,
        scale: 1,
        rotation: -4,
        zIndex: 28,
        visible: true,
        content: {
          bubbleStyle,
          text: 'NOVO!',
          subtext: 'MAIS SABOR!',
          color: '#1a4136',
          accentColor: '#ffffff'
        }
      };
    } else if (type === 'value_seal') {
      const shapeStyle = subType === 'yellow-burst' ? 'yellow-burst' : 'starburst-12';
      newLayer = {
        id,
        type: 'value_seal',
        name: subType === 'yellow-burst' ? 'Selo Amarelo (Lipton 1949)' : 'Selo Estrela Serrilhada',
        x: 50,
        y: 40,
        scale: 1,
        rotation: 6,
        zIndex: 35,
        visible: true,
        content: {
          text: subType === 'yellow-burst' ? 'POR APENAS' : '7 dias',
          subtext: subType === 'yellow-burst' ? 'R$ 25' : 'grátis',
          color: subType === 'yellow-burst' ? '#e5a93c' : '#c4421a',
          accentColor: subType === 'yellow-burst' ? '#c4421a' : '#ffffff',
          shapeStyle
        }
      };
    } else if (type === 'starburst_decor') {
      newLayer = {
        id,
        type: 'starburst_decor',
        name: 'Estrela Atômica Anos 50',
        x: 50,
        y: 30,
        scale: 1,
        rotation: 0,
        zIndex: 25,
        visible: true,
        content: {
          color: '#cfa643'
        }
      };
    } else if (type === 'retro_character') {
      newLayer = {
        id,
        type: 'retro_character',
        name: 'Moça dos Anos 50',
        x: 75,
        y: 25,
        scale: 1,
        rotation: 0,
        zIndex: 15,
        visible: true,
        content: {
          imageUrl: retroWomanPointing
        }
      };
    } else if (type === 'custom_text') {
      newLayer = {
        id,
        type: 'custom_text',
        name: 'Texto Livre Retrô',
        x: 50,
        y: 25,
        scale: 1,
        rotation: 0,
        zIndex: 25,
        visible: true,
        content: {
          text: 'UMA SENSACIONAL NOVIDADE',
          color: '#c4421a',
          fontFamily: 'font-satisfy'
        }
      };
    } else {
      newLayer = {
        id,
        type: 'product_image',
        name: 'Foto do Produto',
        x: 50,
        y: 50,
        scale: 1,
        rotation: 0,
        zIndex: 20,
        visible: true,
        content: {
          imageUrl: retroFoodBurger,
          text: 'Meu Produto',
          filterMode: 'normal'
        }
      };
    }

    setLayers((prev) => [...prev, newLayer]);
    setSelectedLayerId(id);
    setActiveSideTab('edit_item');
  };

  // Upload user product photo
  const handleProductUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const productImgUrl = event.target.result as string;
          const prodLayer = layers.find((l) => l.type === 'product_image');
          if (prodLayer) {
            setLayers((prev) =>
              prev.map((l) =>
                l.id === prodLayer.id
                  ? { ...l, content: { ...l.content, imageUrl: productImgUrl, text: file.name } }
                  : l
              )
            );
            setSelectedLayerId(prodLayer.id);
          } else {
            const newId = `layer-prod-${Date.now()}`;
            const newLayer: CanvasLayer = {
              id: newId,
              type: 'product_image',
              name: 'Foto do Meu Produto',
              x: 50,
              y: 50,
              scale: 1.1,
              rotation: 0,
              zIndex: 22,
              visible: true,
              content: {
                imageUrl: productImgUrl,
                text: file.name,
                filterMode: 'litho'
              }
            };
            setLayers((prev) => [...prev, newLayer]);
            setSelectedLayerId(newId);
          }
          setActiveSideTab('edit_item');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset to Blank Canvas ("Tela Limpa")
  const handleResetBlankCanvas = () => {
    setLayers([
      {
        id: 'layer-blank-product',
        type: 'product_image',
        name: 'Foto do Seu Produto',
        x: 50,
        y: 48,
        scale: 1,
        rotation: 0,
        zIndex: 15,
        visible: true,
        content: {
          imageUrl: retroFoodBurger,
          text: 'Suba a foto do seu produto',
          filterMode: 'litho'
        }
      },
      {
        id: 'layer-blank-arrow',
        type: 'retro_arrow',
        name: 'Seta Curva Retrô',
        x: 68,
        y: 36,
        scale: 1,
        rotation: -25,
        zIndex: 25,
        visible: true,
        content: {
          arrowStyle: 'curved-arrow',
          color: '#c4421a'
        }
      },
      {
        id: 'layer-blank-seal',
        type: 'value_seal',
        name: 'Selo de Preço / Oferta',
        x: 32,
        y: 38,
        scale: 1,
        rotation: 8,
        zIndex: 30,
        visible: true,
        content: {
          text: '7 dias',
          subtext: 'grátis',
          color: '#c4421a',
          accentColor: '#ffffff',
          shapeStyle: 'starburst-12'
        }
      },
      {
        id: 'layer-blank-text',
        type: 'headline',
        name: 'Título Principal',
        x: 50,
        y: 16,
        scale: 1,
        rotation: 0,
        zIndex: 15,
        visible: true,
        content: {
          text: 'O Seu Produto Aqui!',
          subtext: 'Arraste as setas e selos para completar o cenário retrô',
          color: '#c4421a',
          fontFamily: 'font-satisfy'
        }
      }
    ]);
    setSelectedLayerId('layer-blank-arrow');
    setSelectedBg('sunburst');
  };

  // Export PNG in High Definition or Ultra Pro
  const handleExport = async (isProExport: boolean) => {
    if (isProExport && !isProUser) {
      onOpenPricingModal?.();
      return;
    }
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        quality: 0.98,
        pixelRatio: isProExport ? 3.5 : 2.0
      });
      const link = document.createElement('a');
      link.download = isProExport
        ? `cartaz-comercial-pro-4k-${Date.now()}.png`
        : `amostra-cartaz-retro-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Erro ao exportar:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Aspect ratio class
  const aspectClass =
    format === 'stories'
      ? 'aspect-[9/16] max-w-[440px]'
      : format === 'horizontal'
      ? 'aspect-[4/3] max-w-[620px]'
      : 'aspect-square max-w-[540px]';

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6 py-6" onMouseUp={handleMouseUp}>
      {/* Top Header & Fast Actions */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2e2a24] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-playfair text-2xl font-black text-[#faf6ee]">
              Cenógrafo Retrô Anos 50 e 60
            </h1>
            {isProUser ? (
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-xs font-bold text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <Crown className="h-3 w-3" />
                <span>Licença Pro Ativa</span>
              </span>
            ) : (
              <button
                onClick={onOpenPricingModal}
                className="rounded bg-amber-500/20 px-2 py-0.5 font-mono text-xs font-bold text-amber-400 hover:bg-amber-500/30 transition-colors flex items-center gap-1 border border-amber-500/40 cursor-pointer"
              >
                <Sparkles className="h-3 w-3" />
                <span>Versão Grátis · Obter Pro</span>
              </button>
            )}
          </div>
          <p className="text-xs text-[#a89d8d]">
            Crie anúncios de alta conversão para comércios locais (hamburguerias, barbearias, cafés). Arraste fotos, selos e setas!
          </p>
        </div>

        {/* Quick Format & Template Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Commercial Niche Templates Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNicheMenu(!showNicheMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#cfa643] text-xs font-bold text-[#121110] hover:bg-[#e0b654] transition-colors shadow-sm"
            >
              <Store className="h-3.5 w-3.5" />
              <span>Modelos de Negócios</span>
              <ChevronDown className="h-3 w-3" />
            </button>

            {showNicheMenu && (
              <div className="absolute left-0 mt-2 w-64 rounded-xl border border-[#3b3428] bg-[#1a1714] p-2 shadow-2xl z-50 space-y-1">
                <div className="px-2 py-1 text-[10px] font-bold text-[#a89d8d] uppercase tracking-wider">
                  Carregar Nicho Comercial:
                </div>
                <button
                  onClick={() => handleLoadNicheTemplate('niche-burger')}
                  className="w-full text-left px-2.5 py-1.5 rounded text-xs font-medium text-[#f0e6d6] hover:bg-[#272118] hover:text-[#cfa643] flex items-center justify-between"
                >
                  <span>🍔 Hamburgueria & Diner</span>
                  <span className="text-[10px] text-emerald-400 font-bold">1955</span>
                </button>
                <button
                  onClick={() => handleLoadNicheTemplate('niche-barber')}
                  className="w-full text-left px-2.5 py-1.5 rounded text-xs font-medium text-[#f0e6d6] hover:bg-[#272118] hover:text-[#cfa643] flex items-center justify-between"
                >
                  <span>💈 Barbearia & Cutelaria</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Vintage</span>
                </button>
                <button
                  onClick={() => handleLoadNicheTemplate('niche-coffee')}
                  className="w-full text-left px-2.5 py-1.5 rounded text-xs font-medium text-[#f0e6d6] hover:bg-[#272118] hover:text-[#cfa643] flex items-center justify-between"
                >
                  <span>☕ Cafeteria & Torrefação</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Família</span>
                </button>
                <button
                  onClick={() => handleLoadNicheTemplate('niche-beer')}
                  className="w-full text-left px-2.5 py-1.5 rounded text-xs font-medium text-[#f0e6d6] hover:bg-[#272118] hover:text-[#cfa643] flex items-center justify-between"
                >
                  <span>🍺 Cervejaria & Pub</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Chopp</span>
                </button>
                <button
                  onClick={() => handleLoadNicheTemplate('niche-fashion')}
                  className="w-full text-left px-2.5 py-1.5 rounded text-xs font-medium text-[#f0e6d6] hover:bg-[#272118] hover:text-[#cfa643] flex items-center justify-between"
                >
                  <span>👗 Brechó & Moda Retrô</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Vintage</span>
                </button>
                <button
                  onClick={() => handleLoadNicheTemplate('niche-garage')}
                  className="w-full text-left px-2.5 py-1.5 rounded text-xs font-medium text-[#f0e6d6] hover:bg-[#272118] hover:text-[#cfa643] flex items-center justify-between"
                >
                  <span>🚗 Oficina & Clássicos</span>
                  <span className="text-[10px] text-emerald-400 font-bold">V8</span>
                </button>
                <div className="border-t border-[#2d2822] pt-1">
                  <button
                    onClick={() => {
                      setLayers(MICROFOODBR_DEFAULT_LAYERS);
                      setSelectedBg('aged-poster');
                      setSelectedLayerId('layer-seal');
                      setShowNicheMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded text-xs text-[#a89d8d] hover:bg-[#272118] hover:text-[#f0e6d6]"
                  >
                    ✦ Modelo Padrão MicroFoodBr
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleResetBlankCanvas}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#241f19] border border-[#3b3327] text-xs font-medium text-[#ded5c6] hover:bg-[#302920] transition-colors"
          >
            <Undo2 className="h-3.5 w-3.5" />
            <span>Limpar</span>
          </button>

          {/* Format selection */}
          <div className="flex items-center rounded-lg bg-[#1f1b16] p-1 border border-[#332c23]">
            <button
              onClick={() => setFormat('stories')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                format === 'stories' ? 'bg-[#cfa643] text-black font-bold' : 'text-[#a89d8d]'
              }`}
            >
              Stories (9:16)
            </button>
            <button
              onClick={() => setFormat('feed')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                format === 'feed' ? 'bg-[#cfa643] text-black font-bold' : 'text-[#a89d8d]'
              }`}
            >
              Feed (1:1)
            </button>
          </div>

          {/* Export Free Sample */}
          <button
            onClick={() => handleExport(false)}
            disabled={isExporting}
            className="flex items-center gap-1.5 rounded-lg bg-[#272118] border border-[#3b3327] px-3 py-2 text-xs font-bold text-[#ded5c6] hover:bg-[#332a1f] transition-all disabled:opacity-50"
            title="Baixar com marca d'água de amostra"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Amostra</span>
          </button>

          {/* Export Commercial Pro 4K */}
          <button
            onClick={() => handleExport(true)}
            disabled={isExporting}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#b83227] to-[#d63a2c] px-4 py-2 text-xs font-bold text-white shadow-md hover:brightness-110 transition-all disabled:opacity-50"
          >
            <Crown className="h-4 w-4" />
            <span>{isExporting ? 'Exportando...' : isProUser ? 'Baixar Pro 4K' : 'Exportar Pro (Sem Marca)'}</span>
          </button>
        </div>
      </div>

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Canvas */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-center">
          {/* Canvas Wrapper */}
          <div className="w-full flex justify-center bg-[#151310] p-4 sm:p-6 rounded-xl border border-[#2b261f]">
            <div
              ref={canvasRef}
              onMouseMove={handleMouseMoveOnCanvas}
              onClick={() => setSelectedLayerId(null)}
              className={`relative w-full overflow-hidden select-none shadow-2xl transition-all ${aspectClass} ${
                selectedBg === 'clean-white' ? 'bg-white' : 'bg-[#F4EBD7]'
              }`}
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(0,0,0,0.15)'
              }}
            >
              {/* RETRO BACKGROUND RENDERING */}
              {selectedBg === 'sunburst' && (
                <div
                  className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
                  style={{ backgroundImage: `url(${retroBgSunburst})` }}
                />
              )}
              {selectedBg === 'diner-mint' && (
                <div
                  className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
                  style={{ backgroundImage: `url(${retroBgDinerMint})` }}
                />
              )}
              {selectedBg === 'kraft-paper' && (
                <div
                  className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
                  style={{ backgroundImage: `url(${retroBgKraftPaper})` }}
                />
              )}
              {selectedBg === 'aged-poster' && (
                <>
                  <div className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-multiply vintage-halftone" />
                  <div
                    className="pointer-events-none absolute top-0 inset-x-0 h-28 sm:h-36 bg-[#163e32] z-0"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
                    }}
                  />
                </>
              )}
              {selectedBg === 'bicolor-green' && (
                <div
                  className="pointer-events-none absolute top-0 inset-x-0 h-1/2 bg-[#163e32] z-0"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' }}
                />
              )}
              {selectedBg === 'halftone-grey' && (
                <div className="vintage-halftone-dense pointer-events-none absolute inset-0 z-0 opacity-25" />
              )}

              {/* RETRO BORDER / FRAME RENDERING */}
              {selectedBorder === 'double-vintage' && (
                <div
                  className="pointer-events-none absolute inset-2 sm:inset-3 border-4 border-[#163e32] z-10"
                  style={{
                    boxShadow: 'inset 0 0 0 2px #cfa643, inset 0 0 15px rgba(0,0,0,0.2)'
                  }}
                />
              )}
              {selectedBorder === 'coupon-dash' && (
                <div className="pointer-events-none absolute inset-3 sm:inset-4 border-2 border-dashed border-[#c4421a] z-10">
                  <div className="absolute -top-3 left-6 bg-[#FAF6EE] px-2 text-[9px] font-bold text-[#c4421a]">
                    ✂ RECORTE & APROVEITE
                  </div>
                </div>
              )}
              {selectedBorder === 'diner-plate' && (
                <div className="pointer-events-none absolute inset-2 rounded-2xl border-[6px] border-[#cfa643] shadow-md z-10">
                  <div className="absolute inset-1 rounded-xl border border-white/50" />
                </div>
              )}
              {selectedBorder === 'starburst-googie' && (
                <div className="pointer-events-none absolute inset-3 border-2 border-[#163e32] z-10">
                  {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                    <div key={i} className={`absolute ${pos} text-[#cfa643] text-lg font-bold -translate-x-1/2 -translate-y-1/2`}>
                      ✦
                    </div>
                  ))}
                </div>
              )}

              {/* RENDER ALL INTERACTIVE DRAGGABLE LAYERS */}
              {layers
                .filter((layer) => layer.visible)
                .map((layer) => {
                  const isSelected = selectedLayerId === layer.id;

                  return (
                    <div
                      key={layer.id}
                      onMouseDown={(e) => handleMouseDownOnLayer(layer.id, e)}
                      className={`absolute cursor-move transition-shadow ${
                        isSelected
                          ? 'ring-2 ring-[#cfa643] ring-offset-2 ring-offset-black/20'
                          : 'hover:ring-1 hover:ring-white/40'
                      }`}
                      style={{
                        left: `${layer.x}%`,
                        top: `${layer.y}%`,
                        transform: `translate(-50%, -50%) scale(${layer.scale}) rotate(${layer.rotation}deg)`,
                        zIndex: layer.zIndex
                      }}
                    >
                      {/* 1. RETRO ARROW (Setas da Época) */}
                      {layer.type === 'retro_arrow' && (
                        <div className="relative flex items-center justify-center p-1 drop-shadow-md">
                          {layer.content.arrowStyle === 'curved-arrow' && (
                            /* Curved dynamic arrow */
                            <svg className="h-16 w-24" viewBox="0 0 120 80" fill="none">
                              <path
                                d="M10 65 C 20 20, 80 15, 105 45"
                                stroke={layer.content.color || '#c4421a'}
                                strokeWidth="8"
                                strokeLinecap="round"
                                fill="none"
                              />
                              <polygon
                                points="105,30 118,52 92,54"
                                fill={layer.content.color || '#c4421a'}
                              />
                            </svg>
                          )}

                          {layer.content.arrowStyle === 'block-arrow' && (
                            /* 1950s 3D Block arrow */
                            <div
                              className="px-4 py-1.5 font-black text-xs text-white uppercase tracking-widest shadow-md flex items-center gap-1"
                              style={{
                                backgroundColor: layer.content.color || '#c4421a',
                                clipPath: 'polygon(0% 20%, 70% 20%, 70% 0%, 100% 50%, 70% 100%, 70% 80%, 0% 80%)'
                              }}
                            >
                              <span className="pr-4">{layer.content.text || 'VEJA!'}</span>
                            </div>
                          )}

                          {layer.content.arrowStyle === 'neon-arrow' && (
                            /* Diner neon style arrow */
                            <svg className="h-16 w-20" viewBox="0 0 100 80" fill={layer.content.color || '#cfa643'}>
                              <path d="M10 30 L60 30 L60 15 L95 40 L60 65 L60 50 L10 50 Z" />
                              <circle cx="20" cy="40" r="3" fill="#ffffff" />
                              <circle cx="35" cy="40" r="3" fill="#ffffff" />
                              <circle cx="50" cy="40" r="3" fill="#ffffff" />
                            </svg>
                          )}

                          {layer.content.arrowStyle === 'hand-drawn-arrow' && (
                            /* Hand-drawn vintage arrow */
                            <svg className="h-14 w-20" viewBox="0 0 100 60" fill="none">
                              <path
                                d="M15 45 Q 50 10 85 35"
                                stroke={layer.content.color || '#163e32'}
                                strokeWidth="5"
                                strokeLinecap="round"
                              />
                              <path
                                d="M68 28 L86 35 L75 48"
                                stroke={layer.content.color || '#163e32'}
                                strokeWidth="5"
                                strokeLinecap="round"
                              />
                            </svg>
                          )}

                          {layer.content.arrowStyle === 'curved-ribbon-arrow' && (
                            /* Vintage Long Curved Arrow with Feather */
                            <svg className="h-20 w-32" viewBox="0 0 140 90" fill="none">
                              {/* Curved body with feather tail */}
                              <path
                                d="M10 70 L25 55 L25 65 C 45 30, 90 20, 125 45"
                                stroke={layer.content.color || '#c4421a'}
                                strokeWidth="7"
                                strokeLinecap="round"
                                fill="none"
                              />
                              {/* Feather tail */}
                              <polygon points="5,75 15,60 25,75 15,90" fill={layer.content.color || '#c4421a'} />
                              {/* Arrow head */}
                              <polygon points="120,32 138,50 115,58" fill={layer.content.color || '#c4421a'} />
                            </svg>
                          )}

                          {layer.content.arrowStyle === 'finger-pointer' && (
                            /* Vintage Printer's Manicule / Hand Pointer (☞) */
                            <div
                              className="flex items-center gap-1.5 px-3 py-1 font-serif text-lg font-bold border-2 rounded shadow-md select-none"
                              style={{
                                borderColor: layer.content.color || '#163e32',
                                color: layer.content.color || '#163e32',
                                backgroundColor: '#FAF6EE'
                              }}
                            >
                              <span className="text-2xl leading-none">☞</span>
                              <span className="text-xs font-bold uppercase tracking-wider font-mono">
                                {layer.content.text || 'O LEGÍTIMO'}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 2. SPEECH BUBBLE / CLOUD (Old Dutch 1947 style) */}
                      {layer.type === 'speech_bubble' && (
                        <div className="relative p-2 drop-shadow-md">
                          <svg className="h-20 w-32" viewBox="0 0 140 90">
                            {/* Cloud speech bubble path */}
                            <path
                              d="M30 45 C20 40 20 20 40 20 C50 10 75 10 85 20 C95 10 120 15 125 35 C135 45 135 65 115 75 C105 85 85 85 70 75 L50 88 L55 72 C35 75 20 65 30 45 Z"
                              fill="#ffffff"
                              stroke={layer.content.color || '#163e32'}
                              strokeWidth="3"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-1">
                            <span
                              className="font-playfair text-xs font-black uppercase leading-tight"
                              style={{ color: layer.content.color || '#163e32' }}
                            >
                              {layer.content.text || 'NOVO!'}
                            </span>
                            {layer.content.subtext && (
                              <span
                                className="font-satisfy text-[10px] italic font-bold leading-tight"
                                style={{ color: layer.content.color || '#c4421a' }}
                              >
                                {layer.content.subtext}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* 3. VALUE SEAL (Estrela Serrilhada / Amarelo Lipton) */}
                      {layer.type === 'value_seal' && (
                        <div className="relative flex items-center justify-center p-2">
                          {layer.content.shapeStyle === 'yellow-burst' ? (
                            /* Yellow Oval Burst like Lipton 1949 "FOR ONLY 25¢" */
                            <div className="relative">
                              <svg className="h-20 w-24 drop-shadow-md" viewBox="0 0 120 100">
                                <ellipse cx="60" cy="50" rx="55" ry="45" fill={layer.content.color || '#e5a93c'} />
                                <ellipse cx="60" cy="50" rx="50" ry="40" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 2" />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                                <span className="font-bold text-[9px] uppercase tracking-wider text-black">
                                  {layer.content.text || 'POR APENAS'}
                                </span>
                                <span className="font-playfair text-base sm:text-lg font-black leading-none text-[#c4421a]">
                                  {layer.content.subtext || 'R$ 25'}
                                </span>
                              </div>
                            </div>
                          ) : (
                            /* Classic 12-point starburst seal */
                            <div className="relative">
                              <svg
                                className="h-20 w-20 sm:h-24 sm:w-24 drop-shadow-md"
                                viewBox="0 0 100 100"
                                fill={layer.content.color || '#c4421a'}
                              >
                                <path d="M50 0 L61 11 L77 8 L81 24 L97 29 L93 45 L100 60 L89 71 L88 88 L72 89 L64 100 L49 93 L35 100 L28 88 L11 88 L11 72 L0 60 L7 45 L3 29 L19 24 L22 8 L39 12 Z" />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-2">
                                <span className="font-playfair text-xs sm:text-sm font-black leading-tight">
                                  {layer.content.text || '7 dias'}
                                </span>
                                <span className="font-satisfy text-xs sm:text-sm italic leading-tight text-white/95">
                                  {layer.content.subtext || 'grátis'}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 4. PRODUCT IMAGE (Foto do Usuário ou Imagem do Acervo - Campo Amplo) */}
                      {layer.type === 'product_image' && (
                        <div className="relative max-w-[360px] sm:max-w-[460px] md:max-w-[520px] drop-shadow-2xl">
                          <img
                            src={layer.content.imageUrl || retroFoodBurger}
                            alt={layer.content.text || 'Produto'}
                            referrerPolicy="no-referrer"
                            className={`h-auto w-full max-h-[420px] object-contain rounded-sm ${
                              layer.content.filterMode === 'litho'
                                ? 'contrast-[1.12] saturate-[1.18] sepia-[0.15]'
                                : layer.content.filterMode === 'halftone'
                                ? 'contrast-[1.25] brightness-95'
                                : layer.content.filterMode === 'sepia'
                                ? 'sepia contrast-[1.1]'
                                : ''
                            }`}
                          />
                        </div>
                      )}

                      {/* 5. ATOMIC STARBURST DECORATION (Estrela 4 pontas anos 50) */}
                      {layer.type === 'starburst_decor' && (
                        <svg className="h-10 w-10 drop-shadow-xs" viewBox="0 0 40 40" fill={layer.content.color || '#cfa643'}>
                          <path d="M20,0 L23,15 L38,20 L23,25 L20,40 L17,25 L2,20 L17,15 Z" />
                          <circle cx="20" cy="20" r="3" fill="#ffffff" />
                        </svg>
                      )}

                      {/* 6. RETRO CHARACTER (Mulher apontando, Dama com Chapéu, etc.) */}
                      {layer.type === 'retro_character' && (
                        <div className="relative max-w-[150px] sm:max-w-[190px] drop-shadow-xl">
                          <img
                            src={layer.content.imageUrl || retroWomanPointing}
                            alt="Personagem Retrô"
                            referrerPolicy="no-referrer"
                            className="h-auto w-full object-contain rounded-full border-2 border-[#163e32]/40"
                          />
                        </div>
                      )}

                      {/* 7. BRAND HEADER */}
                      {layer.type === 'brand_header' && (
                        <div className="text-center px-4 py-1">
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-[#f7f2e4] text-xs">✦</span>
                            <span className="font-satisfy text-2xl sm:text-3xl font-black tracking-tight text-[#f7f2e4] drop-shadow-md">
                              {layer.content.text || 'MicroFoodBr'}
                            </span>
                            <span className="text-[#f7f2e4] text-xs">✦</span>
                          </div>
                          {layer.content.subtext && (
                            <div className="text-[8px] sm:text-[9.5px] font-mono tracking-[0.25em] text-[#f7f2e4]/90 uppercase mt-0.5">
                              — {layer.content.subtext} —
                            </div>
                          )}
                        </div>
                      )}

                      {/* 8. HEADLINE */}
                      {layer.type === 'headline' && (
                        <div className="text-left max-w-[220px] sm:max-w-[280px]">
                          <h2
                            className="font-playfair text-xl sm:text-2xl font-black leading-tight drop-shadow-xs"
                            style={{ color: layer.content.color || '#c4421a' }}
                          >
                            {layer.content.text || 'Seu cardápio na internet,'}
                          </h2>
                          {layer.content.subtext && (
                            <div
                              className="font-satisfy text-lg sm:text-xl font-bold mt-0.5 leading-tight"
                              style={{ color: layer.content.accentColor || '#173f32' }}
                            >
                              {layer.content.subtext}
                            </div>
                          )}
                        </div>
                      )}

                      {/* 9. BENEFIT LIST */}
                      {layer.type === 'benefit_list' && (
                        <div className="space-y-2 max-w-[170px] sm:max-w-[190px]">
                          {(layer.content.items || []).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#163e32] text-white text-[9px] font-bold shadow-xs">
                                ✓
                              </div>
                              <span className="text-[9px] sm:text-[10.5px] font-medium leading-tight text-[#163e32]">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 10. CTA BANNER */}
                      {layer.type === 'cta_banner' && (
                        <div
                          className="rounded-md px-3 sm:px-4 py-2 text-center text-white shadow-lg"
                          style={{ backgroundColor: layer.content.color || '#c4421a' }}
                        >
                          <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider">
                            {layer.content.text || 'TESTE GRÁTIS POR 7 DIAS ➔'}
                          </div>
                          {layer.content.subtext && (
                            <div className="text-[8px] sm:text-[9px] text-white/90">
                              {layer.content.subtext}
                            </div>
                          )}
                        </div>
                      )}

                      {/* 11. QR CODE BOX */}
                      {layer.type === 'qr_code_box' && (
                        <div className="flex flex-col items-center bg-white/90 p-2 rounded-md border border-[#163e32]/30 shadow-xs max-w-[130px] text-center">
                          <div className="h-12 w-12 border-2 border-[#163e32] p-1 grid grid-cols-4 gap-0.5 bg-white">
                            <div className="bg-[#163e32]" />
                            <div className="bg-[#163e32]" />
                            <div />
                            <div className="bg-[#163e32]" />
                            <div className="bg-[#163e32]" />
                            <div />
                            <div className="bg-[#163e32]" />
                            <div className="bg-[#163e32]" />
                            <div />
                            <div className="bg-[#163e32]" />
                            <div className="bg-[#163e32]" />
                            <div />
                            <div className="bg-[#163e32]" />
                            <div />
                            <div className="bg-[#163e32]" />
                            <div className="bg-[#163e32]" />
                          </div>
                          <span className="mt-1 text-[7.5px] font-bold text-[#163e32] leading-tight">
                            {layer.content.text || 'Aponte a câmera'}
                          </span>
                        </div>
                      )}

                      {/* 12. CUSTOM TEXT */}
                      {layer.type === 'custom_text' && (
                        <div
                          className="font-playfair text-sm sm:text-base font-bold whitespace-nowrap"
                          style={{ color: layer.content.color || '#163e32' }}
                        >
                          {layer.content.text || 'Texto Livre'}
                        </div>
                      )}
                    </div>
                  );
                })}

              {/* Watermark for Free Tier */}
              {!isProUser && (
                <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center">
                  <div className="rotate-[-25deg] select-none text-center opacity-30 border-4 border-dashed border-[#1a1714] px-6 py-2.5 rounded-xl bg-white/40 backdrop-blur-[0.5px] shadow-lg">
                    <span className="font-playfair text-lg sm:text-2xl font-black uppercase tracking-widest text-[#1a1714] block">
                      Amostra · Mundo Retrô
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-sans font-bold text-[#1a1714] tracking-wide block">
                      Desbloqueie o Pro para Exportar sem Marca d'Água
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Floating Toolbar for Selected Item */}
          {selectedLayer && (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 w-full max-w-[440px] bg-[#1d1914] p-3 rounded-lg border border-[#3b3328] text-xs shadow-lg">
              <div className="flex items-center gap-1.5 font-bold text-[#cfa643]">
                <Move className="h-3.5 w-3.5" />
                <span className="truncate max-w-[130px]">{selectedLayer.name}</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => adjustScale(-0.1)}
                  title="Diminuir (-)"
                  className="p-1 rounded bg-[#2b251e] text-[#ded5c6] hover:bg-[#3d3429]"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="px-1 text-[11px] font-mono text-[#a89d8d]">
                  {Math.round(selectedLayer.scale * 100)}%
                </span>
                <button
                  onClick={() => adjustScale(0.1)}
                  title="Aumentar (+)"
                  className="p-1 rounded bg-[#2b251e] text-[#ded5c6] hover:bg-[#3d3429]"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>

                <span className="h-3 w-[1px] bg-[#3b3328] mx-1" />

                <button
                  onClick={() => adjustRotation(-10)}
                  title="Girar Esquerda"
                  className="p-1 rounded bg-[#2b251e] text-[#ded5c6] hover:bg-[#3d3429]"
                >
                  ↺
                </button>
                <button
                  onClick={() => adjustRotation(10)}
                  title="Girar Direita"
                  className="p-1 rounded bg-[#2b251e] text-[#ded5c6] hover:bg-[#3d3429]"
                >
                  ↻
                </button>

                <button
                  onClick={() => handleDeleteLayer(selectedLayer.id)}
                  title="Excluir Elemento"
                  className="p-1 rounded bg-[#3b1d1d] text-rose-300 hover:bg-[#4a2424] ml-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Toolbox (Setas, Molduras, Fundos, Upload do Produto) */}
        <div className="lg:col-span-5 xl:col-span-5 space-y-4">
          {/* UPLOAD DO SEU PRODUTO ATUAL */}
          <div className="border-2 border-[#cfa643] bg-[#1c1813] p-4 rounded-xl shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#cfa643] uppercase tracking-wider font-black flex items-center gap-1.5">
                <Upload className="h-4 w-4" />
                <span>Foto Atual do Seu Produto</span>
              </span>
              <span className="text-[10px] bg-[#cfa643]/20 text-[#cfa643] px-2 py-0.5 rounded font-bold">
                Seu Upload Real
              </span>
            </div>
            <p className="text-xs text-[#ded5c6] leading-relaxed">
              Suba a foto real do seu produto (hambúrguer, lanche, doce, cosmético, relógio). O cenário retrô (setas, molduras e fundos) completa a cena ao redor dele!
            </p>
            <label className="flex items-center justify-center gap-2 py-3 px-4 bg-[#b83227] hover:bg-[#d63a2c] text-white rounded-lg cursor-pointer text-xs font-bold transition-all shadow-md">
              <Upload className="h-4 w-4" />
              <span>Subir Foto do Meu Produto</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleProductUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* SIDEBAR TABS: Elementos / Fundos & Molduras / Galeria Retrô */}
          <div className="border border-[#2e2a24] bg-[#1a1714] rounded-xl overflow-hidden shadow-lg">
            <div className="flex border-b border-[#2e2a24] bg-[#151310] text-xs">
              <button
                onClick={() => setActiveSideTab('elements')}
                className={`flex-1 py-2.5 font-bold border-b-2 transition-colors ${
                  activeSideTab === 'elements'
                    ? 'border-[#cfa643] text-[#cfa643] bg-[#1f1b16]'
                    : 'border-transparent text-[#a89d8d] hover:text-[#faf6ee]'
                }`}
              >
                + Setas & Selos
              </button>
              <button
                onClick={() => setActiveSideTab('backgrounds')}
                className={`flex-1 py-2.5 font-bold border-b-2 transition-colors ${
                  activeSideTab === 'backgrounds'
                    ? 'border-[#cfa643] text-[#cfa643] bg-[#1f1b16]'
                    : 'border-transparent text-[#a89d8d] hover:text-[#faf6ee]'
                }`}
              >
                Fundos & Molduras
              </button>
              <button
                onClick={() => setActiveSideTab('gallery')}
                className={`flex-1 py-2.5 font-bold border-b-2 transition-colors ${
                  activeSideTab === 'gallery'
                    ? 'border-[#cfa643] text-[#cfa643] bg-[#1f1b16]'
                    : 'border-transparent text-[#a89d8d] hover:text-[#faf6ee]'
                }`}
              >
                Banco de Fotos
              </button>
            </div>

            <div className="p-4 space-y-4 max-h-[560px] overflow-y-auto">
              {/* TAB 1: RETRO ARROWS, SEALS & PROPS */}
              {activeSideTab === 'elements' && (
                <div className="space-y-4">
                  {/* SETAS RETRÔ */}
                  <div>
                    <span className="text-xs font-mono text-[#cfa643] uppercase tracking-wider block font-bold mb-2">
                      1. Adicionar Setas Retrô da Época:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleAddLayer('retro_arrow', 'curved-arrow')}
                        className="flex items-center gap-2 p-2.5 rounded bg-[#241f19] border border-[#383126] text-xs text-[#ded5c6] hover:border-[#cfa643] transition-all text-left"
                      >
                        <span className="text-base text-[#c4421a]">➔</span>
                        <div>
                          <div className="font-bold">Seta Curva Dinâmica</div>
                          <div className="text-[10px] text-[#8c8273]">Estilo 1910-1950</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleAddLayer('retro_arrow', 'curved-ribbon-arrow')}
                        className="flex items-center gap-2 p-2.5 rounded bg-[#241f19] border border-[#383126] text-xs text-[#ded5c6] hover:border-[#cfa643] transition-all text-left"
                      >
                        <span className="text-base text-[#c4421a]">↝</span>
                        <div>
                          <div className="font-bold">Seta Curva Publicitária</div>
                          <div className="text-[10px] text-[#8c8273]">Contorna o produto (1910-1930)</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleAddLayer('retro_arrow', 'finger-pointer')}
                        className="flex items-center gap-2 p-2.5 rounded bg-[#241f19] border border-[#383126] text-xs text-[#ded5c6] hover:border-[#cfa643] transition-all text-left"
                      >
                        <span className="text-base text-amber-400">☞</span>
                        <div>
                          <div className="font-bold">Dedo Indicador (Manicule)</div>
                          <div className="text-[10px] text-[#8c8273]">"O LEGÍTIMO"</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleAddLayer('retro_arrow', 'block-arrow')}
                        className="flex items-center gap-2 p-2.5 rounded bg-[#241f19] border border-[#383126] text-xs text-[#ded5c6] hover:border-[#cfa643] transition-all text-left"
                      >
                        <span className="text-base text-amber-400">➤</span>
                        <div>
                          <div className="font-bold">Seta Bloco 3D</div>
                          <div className="text-[10px] text-[#8c8273]">Com texto "VEJA!"</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleAddLayer('retro_arrow', 'neon-arrow')}
                        className="flex items-center gap-2 p-2.5 rounded bg-[#241f19] border border-[#383126] text-xs text-[#ded5c6] hover:border-[#cfa643] transition-all text-left"
                      >
                        <span className="text-base text-[#cfa643]">★➔</span>
                        <div>
                          <div className="font-bold">Seta Diner Americana</div>
                          <div className="text-[10px] text-[#8c8273]">Com estrelas</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleAddLayer('retro_arrow', 'hand-drawn-arrow')}
                        className="flex items-center gap-2 p-2.5 rounded bg-[#241f19] border border-[#383126] text-xs text-[#ded5c6] hover:border-[#cfa643] transition-all text-left"
                      >
                        <span className="text-base text-emerald-400">⤹</span>
                        <div>
                          <div className="font-bold">Seta Desenhada</div>
                          <div className="text-[10px] text-[#8c8273]">Traço de imprensa</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* SELOS DE VALOR & BALÕES */}
                  <div>
                    <span className="text-xs font-mono text-[#cfa643] uppercase tracking-wider block font-bold mb-2">
                      2. Selos de Valor & Balões Nuvem:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleAddLayer('value_seal', 'starburst-12')}
                        className="flex items-center gap-2 p-2.5 rounded bg-[#241f19] border border-[#383126] text-xs text-[#ded5c6] hover:border-[#cfa643] transition-all text-left"
                      >
                        <Award className="h-4 w-4 text-[#c4421a]" />
                        <div>
                          <div className="font-bold">Estrela Serrilhada</div>
                          <div className="text-[10px] text-[#8c8273]">"7 dias grátis"</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleAddLayer('value_seal', 'yellow-burst')}
                        className="flex items-center gap-2 p-2.5 rounded bg-[#241f19] border border-[#383126] text-xs text-[#ded5c6] hover:border-[#cfa643] transition-all text-left"
                      >
                        <Award className="h-4 w-4 text-[#e5a93c]" />
                        <div>
                          <div className="font-bold">Selo Amarelo (Lipton)</div>
                          <div className="text-[10px] text-[#8c8273]">"POR APENAS R$ 25"</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleAddLayer('speech_bubble', 'cloud-bubble')}
                        className="flex items-center gap-2 p-2.5 rounded bg-[#241f19] border border-[#383126] text-xs text-[#ded5c6] hover:border-[#cfa643] transition-all text-left"
                      >
                        <MessageSquare className="h-4 w-4 text-emerald-400" />
                        <div>
                          <div className="font-bold">Balão Nuvem 1947</div>
                          <div className="text-[10px] text-[#8c8273]">"NOVO! MAIS SABOR!"</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleAddLayer('starburst_decor')}
                        className="flex items-center gap-2 p-2.5 rounded bg-[#241f19] border border-[#383126] text-xs text-[#ded5c6] hover:border-[#cfa643] transition-all text-left"
                      >
                        <Sparkles className="h-4 w-4 text-[#cfa643]" />
                        <div>
                          <div className="font-bold">Estrela Atômica 50s</div>
                          <div className="text-[10px] text-[#8c8273]">Brilho espacial</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* ADICIONAR PERSONAGEM OU TEXTO */}
                  <div>
                    <span className="text-xs font-mono text-[#cfa643] uppercase tracking-wider block font-bold mb-2">
                      3. Personagens & Textos:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleAddLayer('retro_character')}
                        className="flex items-center gap-2 p-2.5 rounded bg-[#241f19] border border-[#383126] text-xs text-[#ded5c6] hover:border-[#cfa643] transition-all text-left"
                      >
                        <span className="text-base">👩</span>
                        <div>
                          <div className="font-bold">Moça Apontando</div>
                          <div className="text-[10px] text-[#8c8273]">Para o seu produto</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleAddLayer('custom_text')}
                        className="flex items-center gap-2 p-2.5 rounded bg-[#241f19] border border-[#383126] text-xs text-[#ded5c6] hover:border-[#cfa643] transition-all text-left"
                      >
                        <Type className="h-4 w-4 text-rose-400" />
                        <div>
                          <div className="font-bold">Novo Titular</div>
                          <div className="text-[10px] text-[#8c8273]">Fonte de época</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: BACKGROUNDS & FRAMES */}
              {activeSideTab === 'backgrounds' && (
                <div className="space-y-4">
                  {/* BACKGROUNDS */}
                  <div>
                    <span className="text-xs font-mono text-[#cfa643] uppercase tracking-wider block font-bold mb-2">
                      Planos de Fundo Retrô:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedBg('sunburst')}
                        className={`p-2 rounded border text-left text-xs ${
                          selectedBg === 'sunburst' ? 'border-[#cfa643] bg-[#2b251e] text-[#faf6ee]' : 'border-[#332c23] text-[#a89d8d]'
                        }`}
                      >
                        <div className="font-bold">Raios Solares (Sunburst)</div>
                        <div className="text-[10px] text-[#8c8273]">Anos 50/60 dourado</div>
                      </button>

                      <button
                        onClick={() => setSelectedBg('diner-mint')}
                        className={`p-2 rounded border text-left text-xs ${
                          selectedBg === 'diner-mint' ? 'border-[#cfa643] bg-[#2b251e] text-[#faf6ee]' : 'border-[#332c23] text-[#a89d8d]'
                        }`}
                      >
                        <div className="font-bold">Diner Verde Menta</div>
                        <div className="text-[10px] text-[#8c8273]">Lanchonete pastel</div>
                      </button>

                      <button
                        onClick={() => setSelectedBg('aged-poster')}
                        className={`p-2 rounded border text-left text-xs ${
                          selectedBg === 'aged-poster' ? 'border-[#cfa643] bg-[#2b251e] text-[#faf6ee]' : 'border-[#332c23] text-[#a89d8d]'
                        }`}
                      >
                        <div className="font-bold">Bicolor MicroFoodBr</div>
                        <div className="text-[10px] text-[#8c8273]">Verde escuro & papiro</div>
                      </button>

                      <button
                        onClick={() => setSelectedBg('kraft-paper')}
                        className={`p-2 rounded border text-left text-xs ${
                          selectedBg === 'kraft-paper' ? 'border-[#cfa643] bg-[#2b251e] text-[#faf6ee]' : 'border-[#332c23] text-[#a89d8d]'
                        }`}
                      >
                        <div className="font-bold">Papel Kraft Rústico</div>
                        <div className="text-[10px] text-[#8c8273]">Mercearia clássica</div>
                      </button>

                      <button
                        onClick={() => setSelectedBg('halftone-grey')}
                        className={`p-2 rounded border text-left text-xs ${
                          selectedBg === 'halftone-grey' ? 'border-[#cfa643] bg-[#2b251e] text-[#faf6ee]' : 'border-[#332c23] text-[#a89d8d]'
                        }`}
                      >
                        <div className="font-bold">Retícula Halftone P&B</div>
                        <div className="text-[10px] text-[#8c8273]">Linotipo de jornal</div>
                      </button>

                      <button
                        onClick={() => setSelectedBg('clean-white')}
                        className={`p-2 rounded border text-left text-xs ${
                          selectedBg === 'clean-white' ? 'border-[#cfa643] bg-[#2b251e] text-[#faf6ee]' : 'border-[#332c23] text-[#a89d8d]'
                        }`}
                      >
                        <div className="font-bold">Branco Limpo</div>
                        <div className="text-[10px] text-[#8c8273]">Sem fundo</div>
                      </button>
                    </div>
                  </div>

                  {/* MOLDURAS FÍSICAS */}
                  <div>
                    <span className="text-xs font-mono text-[#cfa643] uppercase tracking-wider block font-bold mb-2">
                      Molduras & Bordas Físicas:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedBorder('double-vintage')}
                        className={`p-2 rounded border text-left text-xs ${
                          selectedBorder === 'double-vintage' ? 'border-[#cfa643] bg-[#2b251e] text-[#faf6ee]' : 'border-[#332c23] text-[#a89d8d]'
                        }`}
                      >
                        <div className="font-bold">Filete Duplo Nobre</div>
                        <div className="text-[10px] text-[#8c8273]">Com cantoneiras</div>
                      </button>

                      <button
                        onClick={() => setSelectedBorder('coupon-dash')}
                        className={`p-2 rounded border text-left text-xs ${
                          selectedBorder === 'coupon-dash' ? 'border-[#cfa643] bg-[#2b251e] text-[#faf6ee]' : 'border-[#332c23] text-[#a89d8d]'
                        }`}
                      >
                        <div className="font-bold">Cupom Serrilhado</div>
                        <div className="text-[10px] text-[#8c8273]">Com tesourinha</div>
                      </button>

                      <button
                        onClick={() => setSelectedBorder('diner-plate')}
                        className={`p-2 rounded border text-left text-xs ${
                          selectedBorder === 'diner-plate' ? 'border-[#cfa643] bg-[#2b251e] text-[#faf6ee]' : 'border-[#332c23] text-[#a89d8d]'
                        }`}
                      >
                        <div className="font-bold">Placa Diner Esmaltada</div>
                        <div className="text-[10px] text-[#8c8273]">Cantos arredondados</div>
                      </button>

                      <button
                        onClick={() => setSelectedBorder('starburst-googie')}
                        className={`p-2 rounded border text-left text-xs ${
                          selectedBorder === 'starburst-googie' ? 'border-[#cfa643] bg-[#2b251e] text-[#faf6ee]' : 'border-[#332c23] text-[#a89d8d]'
                        }`}
                      >
                        <div className="font-bold">Googie Atômica</div>
                        <div className="text-[10px] text-[#8c8273]">Estrelas nos cantos</div>
                      </button>

                      <button
                        onClick={() => setSelectedBorder('none')}
                        className={`p-2 rounded border text-left text-xs ${
                          selectedBorder === 'none' ? 'border-[#cfa643] bg-[#2b251e] text-[#faf6ee]' : 'border-[#332c23] text-[#a89d8d]'
                        }`}
                      >
                        <div className="font-bold">Sem Borda</div>
                        <div className="text-[10px] text-[#8c8273]">Livre</div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: RETRO PHOTO GALLERY */}
              {activeSideTab === 'gallery' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#cfa643] uppercase tracking-wider font-bold">
                      Acervo Histórico ({RETRO_IMAGE_GALLERY.length} Obras):
                    </span>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex flex-wrap gap-1 text-[10px]">
                    {[
                      { id: 'todos', label: 'Todos' },
                      { id: 'archive_org', label: '🏛 Archive.org (1870-1950)' },
                      { id: 'alimentos', label: 'Alimentos/Diner' },
                      { id: 'veiculos', label: 'Veículos' },
                      { id: 'personagens', label: 'Personagens' },
                      { id: 'produtos', label: 'Produtos' },
                      { id: 'texturas', label: 'Texturas' }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setGalleryCategory(cat.id)}
                        className={`px-2 py-0.5 rounded border transition-colors ${
                          galleryCategory === cat.id
                            ? 'bg-[#cfa643] text-black font-bold border-[#cfa643]'
                            : 'bg-[#221e19] text-[#a89d8d] border-[#383126] hover:text-[#ded5c6]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {RETRO_IMAGE_GALLERY.filter(
                      (img) => galleryCategory === 'todos' || img.category === galleryCategory
                    ).map((img) => (
                      <div
                        key={img.id}
                        onClick={() => {
                          const prodLayer = layers.find((l) => l.type === 'product_image');
                          if (prodLayer) {
                            setLayers((prev) =>
                              prev.map((l) =>
                                l.id === prodLayer.id
                                  ? { ...l, content: { ...l.content, imageUrl: img.imageUrl, text: img.name } }
                                  : l
                              )
                            );
                            setSelectedLayerId(prodLayer.id);
                          } else {
                            handleAddLayer('product_image');
                          }
                        }}
                        className="cursor-pointer rounded border border-[#332c23] bg-[#171411] p-1.5 hover:border-[#cfa643] transition-all text-center flex flex-col justify-between"
                      >
                        <img
                          src={img.imageUrl}
                          alt={img.name}
                          className="h-24 w-full object-contain bg-black/30 rounded mb-1"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="text-[10.5px] font-bold text-[#faf6ee] truncate">{img.name}</div>
                          <div className="text-[9px] text-[#cfa643] flex items-center justify-between px-1">
                            <span>{img.year}</span>
                            {img.source && <span className="opacity-70 truncate max-w-[70px]">Archive</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* EDIT SELECTED ITEM DETAILS */}
          {selectedLayer && (
            <div className="border border-[#2e2a24] bg-[#1a1714] p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between border-b border-[#2e2a24] pb-2">
                <span className="text-xs font-mono text-[#cfa643] uppercase tracking-wider font-bold">
                  Propriedades: {selectedLayer.name}
                </span>
                <span className="text-[10px] text-[#8c8273]">X:{selectedLayer.x}% Y:{selectedLayer.y}%</span>
              </div>

              {/* Filters for Product Image */}
              {selectedLayer.type === 'product_image' && (
                <div>
                  <label className="text-[11px] text-[#8c8273] block mb-1">
                    Filtro Retrô para Integrar sua Foto ao Cenário:
                  </label>
                  <div className="grid grid-cols-4 gap-1">
                    <button
                      onClick={() => updateSelectedContent({ filterMode: 'normal' })}
                      className={`p-1 text-[10px] rounded border ${
                        selectedLayer.content.filterMode === 'normal'
                          ? 'border-[#cfa643] bg-[#2a241c] text-[#faf6ee]'
                          : 'border-[#332c23] text-[#8c8273]'
                      }`}
                    >
                      Original
                    </button>
                    <button
                      onClick={() => updateSelectedContent({ filterMode: 'litho' })}
                      className={`p-1 text-[10px] rounded border ${
                        selectedLayer.content.filterMode === 'litho'
                          ? 'border-[#cfa643] bg-[#2a241c] text-[#faf6ee]'
                          : 'border-[#332c23] text-[#8c8273]'
                      }`}
                    >
                      Litografia 50s
                    </button>
                    <button
                      onClick={() => updateSelectedContent({ filterMode: 'halftone' })}
                      className={`p-1 text-[10px] rounded border ${
                        selectedLayer.content.filterMode === 'halftone'
                          ? 'border-[#cfa643] bg-[#2a241c] text-[#faf6ee]'
                          : 'border-[#332c23] text-[#8c8273]'
                      }`}
                    >
                      Retícula P&B
                    </button>
                    <button
                      onClick={() => updateSelectedContent({ filterMode: 'sepia' })}
                      className={`p-1 text-[10px] rounded border ${
                        selectedLayer.content.filterMode === 'sepia'
                          ? 'border-[#cfa643] bg-[#2a241c] text-[#faf6ee]'
                          : 'border-[#332c23] text-[#8c8273]'
                      }`}
                    >
                      Sépia 1954
                    </button>
                  </div>
                </div>
              )}

              {/* Sliders */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#8c8273] block mb-1">
                    Tamanho: {Math.round(selectedLayer.scale * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.25"
                    max="2.5"
                    step="0.05"
                    value={selectedLayer.scale}
                    onChange={(e) => updateSelectedLayer({ scale: Number(e.target.value) })}
                    className="w-full accent-[#cfa643]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#8c8273] block mb-1">
                    Rotação: {selectedLayer.rotation}°
                  </label>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={selectedLayer.rotation}
                    onChange={(e) => updateSelectedLayer({ rotation: Number(e.target.value) })}
                    className="w-full accent-[#cfa643]"
                  />
                </div>
              </div>

              {/* Text editing */}
              {selectedLayer.content.text !== undefined && (
                <div>
                  <label className="text-[11px] text-[#8c8273] block mb-1">Texto</label>
                  <input
                    type="text"
                    value={selectedLayer.content.text}
                    onChange={(e) => updateSelectedContent({ text: e.target.value })}
                    className="w-full bg-[#121110] border border-[#3b3328] rounded px-3 py-1.5 text-xs text-[#faf6ee] focus:border-[#cfa643] focus:outline-none"
                  />
                </div>
              )}

              {/* Color picker */}
              {selectedLayer.content.color && (
                <div className="flex items-center gap-3">
                  <label className="text-[11px] text-[#8c8273]">Cor:</label>
                  <input
                    type="color"
                    value={selectedLayer.content.color}
                    onChange={(e) => updateSelectedContent({ color: e.target.value })}
                    className="h-7 w-8 cursor-pointer rounded border-0 bg-transparent"
                  />
                  <span className="font-mono text-xs text-[#ded5c6]">{selectedLayer.content.color}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
