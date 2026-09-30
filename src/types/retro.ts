export type RetroDecade = '1950' | '1960';
export type AdFormat = 'feed' | 'stories' | 'horizontal';

export interface RetroFrame {
  id: string;
  name: string;
  decade: RetroDecade;
  description: string;
  svgType: 'filete-duplo' | 'selo-recorte' | 'googie-starburst' | 'press-block' | 'cameo-oval' | 'pop-art-offset';
  badgeDefault?: string;
}

export interface RetroRibbon {
  id: string;
  name: string;
  text: string;
  colorScheme: 'red' | 'gold' | 'black' | 'teal' | 'cream';
  position: 'top-left' | 'top-right' | 'diagonal-kicker' | 'center-seal';
}

export type LayerType =
  | 'product_image'
  | 'value_seal'
  | 'retro_character'
  | 'retro_arrow'
  | 'speech_bubble'
  | 'starburst_decor'
  | 'brand_header'
  | 'headline'
  | 'benefit_list'
  | 'cta_banner'
  | 'qr_code_box'
  | 'custom_text';

export type ArrowStyle =
  | 'curved-arrow'
  | 'block-arrow'
  | 'neon-arrow'
  | 'hand-drawn-arrow'
  | 'target-arrow'
  | 'finger-pointer'
  | 'curved-ribbon-arrow';
export type BubbleStyle = 'cloud-bubble' | 'comic-bubble' | 'shout-burst';
export type RetroBgType =
  | 'aged-poster'
  | 'sunburst'
  | 'diner-mint'
  | 'kraft-paper'
  | 'bicolor-green'
  | 'halftone-grey'
  | 'clean-white';

export interface CanvasLayer {
  id: string;
  type: LayerType;
  name: string;
  x: number; // percentage 0-100 of canvas width
  y: number; // percentage 0-100 of canvas height
  scale: number; // 0.3 to 3.0
  rotation: number; // -180 to 180 degrees
  zIndex: number;
  visible: boolean;
  content: {
    text?: string;
    subtext?: string;
    imageUrl?: string;
    color?: string;
    accentColor?: string;
    fontFamily?: string;
    items?: string[];
    arrowStyle?: ArrowStyle;
    bubbleStyle?: BubbleStyle;
    shapeStyle?: 'starburst-12' | 'circle-seal' | 'gold-rosette' | 'badge-angled' | 'yellow-burst';
    filterMode?: 'normal' | 'litho' | 'halftone' | 'sepia';
  };
}

export interface RetroPreset {
  id: string;
  title: string;
  category: string;
  decade: RetroDecade;
  kicker: string;
  headline: string;
  headlineFont: string;
  subheadline: string;
  bodyCopy: string;
  priceCta: string;
  classicSlogan: string;
  footerCredit: string;
  frameId: string;
  ribbonId: string;
  paperTexture: 'aged-newsprint' | 'litho-cream' | 'halftone-screen' | 'clean-vintage';
  imageUrl: string;
  primaryColor: string;
  accentColor: string;
}

export interface HistoricalRule {
  title: string;
  period: string;
  focus: string;
  description: string;
  typography: string[];
  colorPalette: { name: string; hex: string }[];
  authenticPhrases: string[];
  iconicReferences: string[];
}

