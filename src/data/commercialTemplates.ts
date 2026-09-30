import { CanvasLayer } from '../types/retro';
import {
  retroFoodBurger,
  retroVintageCar,
  retroWomanPointing,
  retroCleanserCan,
  retroLiptonKnives,
  retroBgSunburst,
  retroBgDinerMint,
  retroBgKraftPaper,
  retro50sPaper
} from './retroArchive';

export interface CommercialNicheTemplate {
  id: string;
  name: string;
  category: string;
  bgType: 'aged-poster' | 'sunburst' | 'diner-mint' | 'kraft-paper';
  border: 'double-vintage' | 'coupon-dash' | 'diner-plate' | 'starburst-googie' | 'none';
  layers: CanvasLayer[];
}

export const COMMERCIAL_NICHE_TEMPLATES: Record<string, CommercialNicheTemplate> = {
  'niche-burger': {
    id: 'niche-burger',
    name: 'Hamburgueria & Diner Retrô 1955',
    category: 'Alimentação & Lanches',
    bgType: 'sunburst',
    border: 'double-vintage',
    layers: [
      {
        id: 'layer-burger-kicker',
        type: 'headline',
        name: 'Kicker Superior',
        x: 50,
        y: 10,
        scale: 0.95,
        rotation: 0,
        zIndex: 20,
        visible: true,
        content: {
          text: 'DESDE 1958 SERVINDO O MELHOR DA CIDADE',
          color: '#1a1714',
          fontFamily: 'font-outfit'
        }
      },
      {
        id: 'layer-burger-title',
        type: 'headline',
        name: 'Título Principal',
        x: 50,
        y: 19,
        scale: 1.15,
        rotation: 0,
        zIndex: 25,
        visible: true,
        content: {
          text: 'O Genuíno Hambúrguer Americano!',
          subtext: 'Carne fresca grelhada na brasa, queijo derretido e pão tostado na manteiga',
          color: '#c4421a',
          fontFamily: 'font-satisfy'
        }
      },
      {
        id: 'layer-burger-img',
        type: 'product_image',
        name: 'Foto do Hambúrguer',
        x: 50,
        y: 50,
        scale: 1.25,
        rotation: 0,
        zIndex: 15,
        visible: true,
        content: {
          imageUrl: retroFoodBurger,
          text: 'Super Combo Artesanal',
          filterMode: 'litho'
        }
      },
      {
        id: 'layer-burger-seal',
        type: 'value_seal',
        name: 'Selo de Preço Especial',
        x: 24,
        y: 42,
        scale: 1.1,
        rotation: -12,
        zIndex: 30,
        visible: true,
        content: {
          text: 'R$ 28,90',
          subtext: 'COM BATATAS',
          color: '#c4421a',
          accentColor: '#ffffff',
          shapeStyle: 'starburst-12'
        }
      },
      {
        id: 'layer-burger-arrow',
        type: 'retro_arrow',
        name: 'Seta Apontando Oferta',
        x: 74,
        y: 45,
        scale: 1,
        rotation: -30,
        zIndex: 28,
        visible: true,
        content: {
          arrowStyle: 'curved-arrow',
          color: '#c4421a'
        }
      },
      {
        id: 'layer-burger-badge',
        type: 'cta_banner',
        name: 'Selo Tradição',
        x: 50,
        y: 84,
        scale: 1.05,
        rotation: 0,
        zIndex: 22,
        visible: true,
        content: {
          text: 'PEÇA PELO DISQUE-ENTREGA OU VENHA AO BALCÃO',
          subtext: 'Aberto todos os dias até as 23 horas',
          color: '#1a1714',
          accentColor: '#eed7a1'
        }
      }
    ]
  },
  'niche-barber': {
    id: 'niche-barber',
    name: 'Barbearia Vintage & Cutelaria',
    category: 'Beleza & Cuidados Masculinos',
    bgType: 'aged-poster',
    border: 'double-vintage',
    layers: [
      {
        id: 'layer-barber-kicker',
        type: 'headline',
        name: 'Kicker Distinto',
        x: 50,
        y: 11,
        scale: 0.9,
        rotation: 0,
        zIndex: 20,
        visible: true,
        content: {
          text: 'TRADIÇÃO, HONRA E ELEGÂNCIA MASCULINA',
          color: '#1a1714',
          fontFamily: 'font-cinzel'
        }
      },
      {
        id: 'layer-barber-title',
        type: 'headline',
        name: 'Título Nobre',
        x: 50,
        y: 20,
        scale: 1.1,
        rotation: 0,
        zIndex: 25,
        visible: true,
        content: {
          text: 'A Nobre Arte da Barba à Navalha',
          subtext: 'Toalha quente perfumada, espuma densa e corte clássico impecável',
          color: '#2b2219',
          fontFamily: 'font-playfair'
        }
      },
      {
        id: 'layer-barber-img',
        type: 'product_image',
        name: 'Navalha e Acessórios',
        x: 50,
        y: 49,
        scale: 1.2,
        rotation: 0,
        zIndex: 15,
        visible: true,
        content: {
          imageUrl: retroLiptonKnives,
          text: 'Cutelaria & Navalhas Finas',
          filterMode: 'litho'
        }
      },
      {
        id: 'layer-barber-seal',
        type: 'value_seal',
        name: 'Selo Agendamento',
        x: 26,
        y: 40,
        scale: 1.05,
        rotation: 8,
        zIndex: 30,
        visible: true,
        content: {
          text: 'HORA MARCADA',
          subtext: 'CHOPP DE CORTESIA',
          color: '#2b2219',
          accentColor: '#ffffff',
          shapeStyle: 'circle-seal'
        }
      },
      {
        id: 'layer-barber-badge',
        type: 'cta_banner',
        name: 'Rodapé de Agendamento',
        x: 50,
        y: 84,
        scale: 1.05,
        rotation: 0,
        zIndex: 22,
        visible: true,
        content: {
          text: 'AGENDE SEU HORÁRIO PELO WHATSAPP',
          subtext: 'Ambiente climatizado com música clássica e sinuca',
          color: '#1a1714',
          accentColor: '#eed7a1'
        }
      }
    ]
  },
  'niche-coffee': {
    id: 'niche-coffee',
    name: 'Cafeteria & Torrefação Artesanal',
    category: 'Cafés & Confeitarias',
    bgType: 'kraft-paper',
    border: 'coupon-dash',
    layers: [
      {
        id: 'layer-coffee-kicker',
        type: 'headline',
        name: 'Kicker Família',
        x: 50,
        y: 11,
        scale: 0.95,
        rotation: 0,
        zIndex: 20,
        visible: true,
        content: {
          text: 'GENUÍNOS GRÃOS DAS MONTANHAS MINEIRAS',
          color: '#3d2516',
          fontFamily: 'font-outfit'
        }
      },
      {
        id: 'layer-coffee-title',
        type: 'headline',
        name: 'Título Aromático',
        x: 50,
        y: 20,
        scale: 1.15,
        rotation: 0,
        zIndex: 25,
        visible: true,
        content: {
          text: 'O Aromático Café Moído na Hora!',
          subtext: 'Sabor encorpado e notas de caramelo que despertam seus melhores momentos',
          color: '#522e1b',
          fontFamily: 'font-satisfy'
        }
      },
      {
        id: 'layer-coffee-img',
        type: 'product_image',
        name: 'Lata de Café Retrô',
        x: 50,
        y: 50,
        scale: 1.1,
        rotation: 0,
        zIndex: 15,
        visible: true,
        content: {
          imageUrl: retroCleanserCan,
          text: 'Lata Vintage Especial',
          filterMode: 'halftone'
        }
      },
      {
        id: 'layer-coffee-seal',
        type: 'value_seal',
        name: 'Selo 100% Arábica',
        x: 75,
        y: 40,
        scale: 1.1,
        rotation: -10,
        zIndex: 30,
        visible: true,
        content: {
          text: '100%',
          subtext: 'ARÁBICA PURO',
          color: '#6e381b',
          accentColor: '#ffffff',
          shapeStyle: 'starburst-12'
        }
      },
      {
        id: 'layer-coffee-badge',
        type: 'cta_banner',
        name: 'Rodapé Confeitaria',
        x: 50,
        y: 84,
        scale: 1,
        rotation: 0,
        zIndex: 22,
        visible: true,
        content: {
          text: 'EXPERIMENTE COM NOSSAS BROAS DE MILHO QUENTINHAS',
          subtext: 'Rua do Comércio, 120 · Estacionamento gratuito',
          color: '#3d2516',
          accentColor: '#eddcc4'
        }
      }
    ]
  },
  'niche-garage': {
    id: 'niche-garage',
    name: 'Oficina & Carros Clássicos',
    category: 'Automotivo & Clássicos',
    bgType: 'diner-mint',
    border: 'starburst-googie',
    layers: [
      {
        id: 'layer-garage-kicker',
        type: 'headline',
        name: 'Kicker Potência',
        x: 50,
        y: 11,
        scale: 0.95,
        rotation: 0,
        zIndex: 20,
        visible: true,
        content: {
          text: 'ESPECIALISTAS EM VEÍCULOS DAS DÉCADAS DE 50 E 60',
          color: '#1a1714',
          fontFamily: 'font-alfa'
        }
      },
      {
        id: 'layer-garage-title',
        type: 'headline',
        name: 'Título Automotivo',
        x: 50,
        y: 20,
        scale: 1.1,
        rotation: 0,
        zIndex: 25,
        visible: true,
        content: {
          text: 'Mecânica com Precisão de Mestre!',
          subtext: 'Restauração de carburadores, funilaria artesanal e regulagem de motores V8',
          color: '#a8321d',
          fontFamily: 'font-shrikhand'
        }
      },
      {
        id: 'layer-garage-img',
        type: 'product_image',
        name: 'Carro Clássico Bel Air',
        x: 50,
        y: 50,
        scale: 1.3,
        rotation: 0,
        zIndex: 15,
        visible: true,
        content: {
          imageUrl: retroVintageCar,
          text: 'Bel Air 1957 Restaurado',
          filterMode: 'litho'
        }
      },
      {
        id: 'layer-garage-seal',
        type: 'value_seal',
        name: 'Selo Garantia',
        x: 25,
        y: 40,
        scale: 1.1,
        rotation: -8,
        zIndex: 30,
        visible: true,
        content: {
          text: 'GARANTIA',
          subtext: 'TOTAL DE 1 ANO',
          color: '#a8321d',
          accentColor: '#ffffff',
          shapeStyle: 'starburst-12'
        }
      },
      {
        id: 'layer-garage-badge',
        type: 'cta_banner',
        name: 'Rodapé Oficina',
        x: 50,
        y: 84,
        scale: 1.05,
        rotation: 0,
        zIndex: 22,
        visible: true,
        content: {
          text: 'TRAGA SEU ANTIGO PARA UMA AVALIAÇÃO MINUCIOSA',
          subtext: 'Peças originais importadas e mão de obra certificada',
          color: '#1a1714',
          accentColor: '#ebdcb9'
        }
      }
    ]
  }
};
