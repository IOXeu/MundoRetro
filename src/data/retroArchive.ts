import retro50sPaper from '../assets/images/retro_50s_paper_1790754541650.jpg';
import retro50sAd from '../assets/images/retro_50s_ad_1790754556128.jpg';
import retro60sAd from '../assets/images/retro_60s_ad_1790754566952.jpg';
import retroWomanPointing from '../assets/images/retro_woman_pointing_1790755479872.jpg';
import retroFoodBurger from '../assets/images/retro_food_burger_1790755491056.jpg';
import retroVintageCar from '../assets/images/retro_vintage_car_1790755758787.jpg';
import retroCleanserCan from '../assets/images/retro_cleanser_can_1790755795272.jpg';
import retroLiptonKnives from '../assets/images/retro_lipton_knives_1790755807043.jpg';
import retroBgSunburst from '../assets/images/retro_bg_sunburst_1790755983183.jpg';
import retroBgDinerMint from '../assets/images/retro_bg_diner_mint_1790755997746.jpg';
import retroBgKraftPaper from '../assets/images/retro_bg_kraft_paper_1790756010649.jpg';
import { RetroDecade, RetroFrame, RetroRibbon, RetroPreset, HistoricalRule, CanvasLayer } from '../types/retro';

export {
  retro50sPaper,
  retro50sAd,
  retro60sAd,
  retroWomanPointing,
  retroFoodBurger,
  retroVintageCar,
  retroCleanserCan,
  retroLiptonKnives,
  retroBgSunburst,
  retroBgDinerMint,
  retroBgKraftPaper
};

export interface RetroImageItem {
  id: string;
  name: string;
  category: 'veiculos' | 'personagens' | 'produtos' | 'alimentos' | 'texturas' | 'archive_org';
  year: string;
  imageUrl: string;
  description: string;
  source?: string;
}

export const RETRO_IMAGE_GALLERY: RetroImageItem[] = [
  // Curated Visuals
  {
    id: 'img-burger',
    name: 'Hambúrguer & Fritas Diner Retrô',
    category: 'alimentos',
    year: '1955',
    imageUrl: retroFoodBurger,
    description: 'Hambúrguer suculento com batatas fritas crocantes no prato clássico.'
  },
  {
    id: 'img-vintage-car',
    name: 'Carro Clássico Touring Car (Ford / Studebaker)',
    category: 'veiculos',
    year: '1908-1930',
    imageUrl: retroVintageCar,
    description: 'Automóvel calhambeque clássico com capota aberta e acabamento nobre.'
  },
  {
    id: 'img-woman-pointing',
    name: 'Moça dos Anos 50 Apontando',
    category: 'personagens',
    year: '1954',
    imageUrl: retroWomanPointing,
    description: 'Ilustração com sorriso caloroso e penteado ondulado indicando seu produto.'
  },
  {
    id: 'img-cleanser-can',
    name: 'Lata de Limpeza & Mascote (Old Dutch)',
    category: 'produtos',
    year: '1947',
    imageUrl: retroCleanserCan,
    description: 'Embalagem clássica amarela e vermelha com mascote de avental.'
  },
  {
    id: 'img-lipton-knives',
    name: 'Conjunto de Facas & Chá (Lipton)',
    category: 'produtos',
    year: '1949',
    imageUrl: retroLiptonKnives,
    description: 'Facas de cozinha com cabo vermelho e caixa de chá clássica.'
  },
  {
    id: 'img-creme-lady',
    name: 'Dama no Espelho com Creme Facial',
    category: 'personagens',
    year: '1954',
    imageUrl: retro50sAd,
    description: 'Ilustração guache refinada de senhora elegante cuidando da pele.'
  },
  {
    id: 'img-mod-60s',
    name: 'Moda Pop Art dos Anos 60',
    category: 'personagens',
    year: '1966',
    imageUrl: retro60sAd,
    description: 'Estilo vibrante serigráfico com óculos geométricos e cores pop.'
  },
  {
    id: 'img-paper-texture',
    name: 'Papel Jornal Envelhecido 1954',
    category: 'texturas',
    year: '1954',
    imageUrl: retro50sPaper,
    description: 'Textura de celulose amarelada original com granulação de linotipo.'
  },

  // Internet Archive Collection (archive.org/details/magazineart-advertisingart)
  {
    id: 'arc-lipton-1949',
    name: 'Lipton Tea "Twin Knives 25¢ Offer"',
    category: 'archive_org',
    year: '1949',
    imageUrl: 'https://archive.org/services/img/LiptonTea1949B',
    description: 'Anúncio clássico com selo amarelo de 25¢, tirinha e cupom pontilhado.',
    source: 'Internet Archive · MagazineArt.org'
  },
  {
    id: 'arc-old-dutch-1947',
    name: 'Old Dutch Cleanser "Activated Seismotite"',
    category: 'archive_org',
    year: '1947',
    imageUrl: 'https://archive.org/services/img/OldDutchCleanser1947A',
    description: 'Titular gigante vermelho com balões nuvem e mascote holandesa.',
    source: 'Internet Archive · MagazineArt.org'
  },
  {
    id: 'arc-ford-1930',
    name: 'Ford Convertible Cabriolet',
    category: 'archive_org',
    year: '1930',
    imageUrl: 'https://archive.org/services/img/FordCars1930A',
    description: 'Ilustração do cabriolet conversível com acabamento Art Déco.',
    source: 'Internet Archive · Good Housekeeping 1930'
  },
  {
    id: 'arc-ford-1908',
    name: 'Ford Model T Touring Car ($850)',
    category: 'archive_org',
    year: '1908',
    imageUrl: 'https://archive.org/services/img/FordCars1908A',
    description: 'Moldura de colunas arquitetônicas e calhambeque original.',
    source: 'Internet Archive · Detroit 1908'
  },
  {
    id: 'arc-studebaker-1930',
    name: 'Studebaker "Builder of Champions"',
    category: 'archive_org',
    year: '1930',
    imageUrl: 'https://archive.org/services/img/StudebakerCars1930A',
    description: 'Cenário de feira com flores na vila européia e carro de luxo.',
    source: 'Internet Archive · 1930'
  },
  {
    id: 'arc-chiclets-1911',
    name: 'Chiclets Dainty Mint Gum',
    category: 'archive_org',
    year: '1911',
    imageUrl: 'https://archive.org/services/img/ChicletsGum1911B',
    description: 'Moldura floral Art Nouveau com medalhão camafeu e tipografia gótica suave.',
    source: 'Internet Archive · Sen-Sen Chiclet Co. 1911'
  },
  {
    id: 'arc-hinds-1916',
    name: 'Hinds Honey and Almond Cream',
    category: 'archive_org',
    year: '1916',
    imageUrl: 'https://archive.org/services/img/HindsHoneyandAlmondCream1916A',
    description: 'Cena de verão na praia com crianças e caixas de sabonete e loção.',
    source: 'Internet Archive · Portland 1916'
  },
  {
    id: 'arc-adams-1920',
    name: 'Adams Pure Chewing Gum',
    category: 'archive_org',
    year: '1920',
    imageUrl: 'https://archive.org/services/img/AdamsChewingGum1920A',
    description: 'Colagem de embalagens coloridas clássicas de tutti-frutti e chicletes.',
    source: 'Internet Archive · 1920'
  },
  {
    id: 'arc-perrier-1910',
    name: 'Perrier "Champagne of Table Waters"',
    category: 'archive_org',
    year: '1910',
    imageUrl: 'https://archive.org/services/img/PerrierWater1910A',
    description: 'Cristal lapidado e rodelas de limão em água mineral gaseificada.',
    source: 'Internet Archive · Life Magazine 1910'
  },
  {
    id: 'arc-prince-albert-1939',
    name: 'Prince Albert Comic Strip Layout',
    category: 'archive_org',
    year: '1939',
    imageUrl: 'https://archive.org/services/img/PrinceAlbertTobacco1939A',
    description: 'Diagramação de histórias em quadrinhos dos anos 30.',
    source: 'Internet Archive · Liberty Magazine 1939'
  },
  {
    id: 'arc-ivory-1913',
    name: 'Ivory Soap "It Floats 99 44/100%"',
    category: 'archive_org',
    year: '1913',
    imageUrl: 'https://archive.org/services/img/IvorySoap1913A',
    description: 'Senhora distinta comprando tecidos nobres cuidados com sabão neutro.',
    source: 'Internet Archive · Woman’s Home Companion 1913'
  },
  {
    id: 'arc-miller-1946',
    name: 'Miller High Life "Champagne of Bottle Beer"',
    category: 'archive_org',
    year: '1946',
    imageUrl: 'https://archive.org/services/img/MillerHighLife1946A',
    description: 'Ilustração elegante pós-guerra de cerveja nobre em garrafa dourada.',
    source: 'Internet Archive · 1946'
  }
];


export const MICROFOODBR_DEFAULT_LAYERS: CanvasLayer[] = [
  {
    id: 'layer-top-banner',
    type: 'brand_header',
    name: 'Cabeçalho / Marca (Topo)',
    x: 50,
    y: 8,
    scale: 1,
    rotation: 0,
    zIndex: 10,
    visible: true,
    content: {
      text: 'MicroFoodBr',
      subtext: 'SUA MICROLOJA, DO SEU JEITO',
      color: '#1a4136',
      accentColor: '#f7f2e4'
    }
  },
  {
    id: 'layer-headline',
    type: 'headline',
    name: 'Titular de Impacto',
    x: 32,
    y: 22,
    scale: 1,
    rotation: -2,
    zIndex: 15,
    visible: true,
    content: {
      text: 'Seu cardápio\nna internet,',
      subtext: 'sem complicação.',
      color: '#c4421a',
      accentColor: '#173f32',
      fontFamily: 'font-satisfy'
    }
  },
  {
    id: 'layer-character',
    type: 'retro_character',
    name: 'Moça dos Anos 50 (Apontando)',
    x: 80,
    y: 20,
    scale: 1,
    rotation: 0,
    zIndex: 12,
    visible: true,
    content: {
      imageUrl: retroWomanPointing
    }
  },
  {
    id: 'layer-product',
    type: 'product_image',
    name: 'Foto do Produto (Arrastável)',
    x: 32,
    y: 47,
    scale: 1,
    rotation: 0,
    zIndex: 20,
    visible: true,
    content: {
      imageUrl: retroFoodBurger,
      text: 'Hambúrguer Artesanal com Fritas'
    }
  },
  {
    id: 'layer-seal',
    type: 'value_seal',
    name: 'Selo de Valor / Oferta (Arrastável)',
    x: 58,
    y: 38,
    scale: 1,
    rotation: 8,
    zIndex: 35,
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
    id: 'layer-benefits',
    type: 'benefit_list',
    name: 'Lista de Benefícios (Ícones)',
    x: 82,
    y: 47,
    scale: 1,
    rotation: 0,
    zIndex: 18,
    visible: true,
    content: {
      items: [
        'Link e QR Code do cardápio',
        'Pedido somado, sem erro de conta',
        'Pagamento por PIX na hora'
      ],
      color: '#1a4136'
    }
  },
  {
    id: 'layer-cta',
    type: 'cta_banner',
    name: 'Faixa de Chamada / CTA Preço',
    x: 28,
    y: 72,
    scale: 1,
    rotation: -1,
    zIndex: 25,
    visible: true,
    content: {
      text: 'TESTE GRÁTIS POR 7 DIAS ➔',
      subtext: 'Depois, apenas R$ 47,00/mês',
      color: '#c4421a',
      accentColor: '#f7f2e4'
    }
  },
  {
    id: 'layer-qrcode',
    type: 'qr_code_box',
    name: 'Caixa de QR Code / Link',
    x: 75,
    y: 72,
    scale: 1,
    rotation: 0,
    zIndex: 25,
    visible: true,
    content: {
      text: 'Aponte a câmera e comece agora!',
      subtext: 'microfoodbr.pages.dev/#cadastro'
    }
  },
  {
    id: 'layer-footer',
    type: 'custom_text',
    name: 'Barra de Rodapé',
    x: 50,
    y: 94,
    scale: 1,
    rotation: 0,
    zIndex: 10,
    visible: true,
    content: {
      text: 'MicroFoodBr — SUA MICROLOJA, DO SEU JEITO',
      color: '#ffffff'
    }
  }
];


export const HISTORICAL_RULES: Record<RetroDecade, HistoricalRule> = {
  '1950': {
    title: 'Anos 50: "Anos Dourados & A Promessa do Pós-Guerra"',
    period: '1950 - 1959',
    focus: 'Elegância, sofisticação doméstica, pintura guache/litografia e civilidade refinada',
    description:
      'A publicidade dos anos 50 refletia a reconstrução do pós-guerra e o otimismo da "Era JK" e dos "Anos Dourados" no Brasil, bem como a Madison Avenue nos EUA. Os anúncios eram minuciosamente ilustrados com pinturas gouache e litografias realistas de traço suave. O texto era cortês, explicativo e de alta autoridade moral.',
    typography: [
      'Bodoni & Didot (Serifas com contraste extremo para titulares)',
      'Brush Script & Cursivas Manuscritas (Para toque afetuoso e pessoal)',
      'Clarendon & Egyptienne (Para solidez bancária e preços firmes)',
      'Futura & Grotescas Finas (Para subtítulos técnicos e especificações)'
    ],
    colorPalette: [
      { name: 'Creme Papiro Envelhecido', hex: '#F6F0E2' },
      { name: 'Vermelho Carmim Vintage', hex: '#B83227' },
      { name: 'Azul Petróleo / Oxford', hex: '#1C3B4E' },
      { name: 'Verde Menta Pastel', hex: '#88B49E' },
      { name: 'Ouro Queimado', hex: '#CBA135' }
    ],
    authenticPhrases: [
      'Para a distinta dona de casa moderna',
      'Uma conquista da ciência ao serviço do seu bem-estar',
      'Exija nas boas casas do ramo o legítimo',
      'Não aceite imitações que lhe custarão caro',
      'Mais tempo livre para quem você mais ama'
    ],
    iconicReferences: [
      'Revista O Cruzeiro (Brasil, 1950-1959)',
      'Seleções do Reader’s Digest',
      'Saturday Evening Post e Norman Rockwell',
      'Publicidade clássica Philco, Rhodia, Guaraná Antarctica e Panair'
    ]
  },
  '1960': {
    title: 'Anos 60: "A Era Mod, Jovem Guarda & A Revolução Criativa"',
    period: '1960 - 1969',
    focus: 'Cores elétricas, tipografia encorpada, serigrafia, quebra de convenções e ironia sutil',
    description:
      'Liderada pela Revolução Criativa de Bill Bernbach (DDB) nos EUA e a ascensão da publicidade moderna e da Bossa Nova / Jovem Guarda no Brasil. O texto tornou-se mais conciso, com tiradas inteligentes, contrastes dramáticos, retícula mecânica (halftone) exposta e a icônica fonte Cooper Black.',
    typography: [
      'Cooper Black (O peso gordo e caloroso característico da era mod)',
      'Helvetica & Grotesk (O modernismo suíço racional invadindo as agências)',
      'Didone Extra Bold / Compacta (Grandes chamadas de impacto)',
      'Letraset Display & Tipos Pop Art (Curvas geométricas e psicodélicas no fim da década)'
    ],
    colorPalette: [
      { name: 'Amarelo Mostarda Solar', hex: '#E5A93C' },
      { name: 'Laranja Terracota Pop', hex: '#D85C27' },
      { name: 'Azul Turquesa Elétrico', hex: '#1B7F79' },
      { name: 'Preto Grafite Impresso', hex: '#21201E' },
      { name: 'Rosa Chiclete Vintage', hex: '#E2738E' }
    ],
    authenticPhrases: [
      'Pense Pequeno (Think Small) — O revolucionário',
      'Para a juventude que dita a moda de hoje',
      'O mundo mudou. O seu estilo também.',
      'Sabor jovem que conquista à primeira vista',
      'Simplicidade genial que funciona sempre'
    ],
    iconicReferences: [
      'Campanhas clássicas da DDB para Volkswagen Fusca',
      'Revista Manchete e Realidade (anos 60)',
      'Capas de discos da Tropicália, Bossa Nova e Beatles',
      'Pop Art de Andy Warhol e Roy Lichtenstein'
    ]
  }
};

export const RETRO_FRAMES: RetroFrame[] = [
  {
    id: 'frame-double-border',
    name: 'Filete Duplo Nobre com Cantos Gregos',
    decade: '1950',
    description: 'Borda dupla clássica com linhas finas e cantos decorativos geométricos típicos das páginas centrais de revistas dos anos 50.',
    svgType: 'filete-duplo'
  },
  {
    id: 'frame-coupon-dash',
    name: 'Cupom de Recorte Serrilhado',
    decade: '1950',
    description: 'Borda tracejada clássica com ícone de tesoura e dizeres "Recorte e Remeta Hoje Mesmo".',
    svgType: 'selo-recorte'
  },
  {
    id: 'frame-googie-starburst',
    name: 'Estilo Atômico & Starbursts',
    decade: '1950',
    description: 'Linhas assimétricas e estrelas de 4 pontas da estética espacial "Googie" e da arquitetura do início da era dos jatos.',
    svgType: 'googie-starburst'
  },
  {
    id: 'frame-press-block',
    name: 'Bloco de Imprensa Offset 60s',
    decade: '1960',
    description: 'Quadro tipográfico robusto com moldura espessa chanfrada e faixas sólidas de alto contraste.',
    svgType: 'press-block'
  },
  {
    id: 'frame-cameo-oval',
    name: 'Camafeu Oval Vitoriano / Vintage',
    decade: '1950',
    description: 'Moldura em formato oval com guirlandas ou folhas laterais, ideal para perfumes, sabonetes e cremes finos.',
    svgType: 'cameo-oval'
  },
  {
    id: 'frame-pop-art',
    name: 'Pop Art Duotone Mod',
    decade: '1960',
    description: 'Moldura externa vibrante com listras diagonais de advertência visual e retícula exposta.',
    svgType: 'pop-art-offset'
  }
];

export const RETRO_RIBBONS: RetroRibbon[] = [
  {
    id: 'ribbon-novidade',
    name: 'Faixa Diagonal "Sensacional!"',
    text: 'SENSACIONAL!',
    colorScheme: 'red',
    position: 'top-left'
  },
  {
    id: 'ribbon-garantia',
    name: 'Selo Redondo "Qualidade de Ouro"',
    text: '100% GARANTIDO',
    colorScheme: 'gold',
    position: 'top-right'
  },
  {
    id: 'ribbon-aprovado',
    name: 'Carimbo de Teste Oficial',
    text: 'TESTADO & APROVADO',
    colorScheme: 'black',
    position: 'center-seal'
  },
  {
    id: 'ribbon-kicker',
    name: 'Faixa "Exclusividade"',
    text: 'LANÇAMENTO DO ANO',
    colorScheme: 'teal',
    position: 'diagonal-kicker'
  }
];

export const AUTHENTIC_CTAS = [
  {
    label: 'Cruzeiros Antigos (Anos 50/60)',
    value: 'Apenas Cr$ 1.950,00 à vista'
  },
  {
    label: 'Plano em Prestações Suaves',
    value: 'Em 10 suaves prestações sem entrada'
  },
  {
    label: 'Chamada de Cupom de Revista',
    value: 'Corte o cupom e remeta pelo correio hoje mesmo'
  },
  {
    label: 'Distribuição Tradicional',
    value: 'À venda nas boas casas do ramo e drogarias'
  },
  {
    label: 'Exigência de Autenticidade',
    value: 'Exija o legítimo pelo nome e recuse imitações'
  },
  {
    label: 'Demonstração Gratuita',
    value: 'Peça uma demonstração sem compromisso em seu lar'
  },
  {
    label: 'Moeda Dólar de Época',
    value: 'A sensational value at only $4.95'
  }
];

export const AUTHENTIC_SLOGANS = [
  'A escolha unânime dos lares de bom gosto.',
  'Beleza radiante que desafia a passagem do tempo.',
  'O segredo do encanto e da elegância natural.',
  'Mais descanso e facilidade para a esposa moderna.',
  'Tradição e perfeição desde a primeira gota.',
  'Uma conquista moderna que você pode desfrutar hoje.',
  'Não basta ser bom: tem que ser o melhor.',
  'A distinção que se faz notar em qualquer ambiente.'
];

export const PRESET_ADS: RetroPreset[] = [
  {
    id: 'preset-creme-50s',
    title: 'Creme Facial de Juventude Dourada (1954)',
    category: 'Cosméticos & Cuidados',
    decade: '1950',
    kicker: 'UM SEGREDO MILAGROSO PARA SUA CUTIS',
    headline: 'Encanto que o Tempo não Apaga',
    headlineFont: 'font-playfair',
    subheadline: 'A fórmula refinada que as senhoras elegantes de todo o país adotaram com entusiasmo',
    bodyCopy:
      'Descubra a suavidade que transforma a expressão diária. Elaborado com óleos botânicos purificados, este elixir devolve o viço da juventude e confere frescor incomparável desde a primeira aplicação. Conquiste elogios onde quer que passe.',
    priceCta: 'Apenas Cr$ 85,00 nas boas farmácias',
    classicSlogan: 'O encanto eterno da mulher distinta.',
    footerCredit: 'Laboratórios de Beleza Guanabara S.A. — Rio de Janeiro',
    frameId: 'frame-double-border',
    ribbonId: 'ribbon-novidade',
    paperTexture: 'litho-cream',
    imageUrl: retro50sAd,
    primaryColor: '#8a241b',
    accentColor: '#cfa643'
  },
  {
    id: 'preset-moda-60s',
    title: 'Moda Jovem & Acessórios Mod (1966)',
    category: 'Moda & Estilo',
    decade: '1960',
    kicker: 'DIRETO DE LONDRES E PARIS',
    headline: 'O Ritmo Novo da Sua Moda',
    headlineFont: 'font-shrikhand',
    subheadline: 'Para quem vive a velocidade e as cores vibrantes do momento',
    bodyCopy:
      'Chega de tons acinzentados e formatos sem vida! A nova coleção traz a atitude da juventude antenada: formas geométricas, solidez incomparável e o design arrojado que você exigia para marcar presença nas praias e avenidas.',
    priceCta: 'Facilitado em suaves parcelas de Cr$ 450',
    classicSlogan: 'Esteja onde o futuro acontece agora!',
    footerCredit: 'Boutique Moderna & Confecções — São Paulo / Ipanema',
    frameId: 'frame-press-block',
    ribbonId: 'ribbon-kicker',
    paperTexture: 'halftone-screen',
    imageUrl: retro60sAd,
    primaryColor: '#c84422',
    accentColor: '#177e77'
  },
  {
    id: 'preset-eletro-50s',
    title: 'Refrigerador de Luxo Moderno (1957)',
    category: 'Eletrodomésticos & Lar',
    decade: '1950',
    kicker: 'MAIOR REPOUSO PARA A DONA DE CASA',
    headline: 'O Orgulho de Toda a Família',
    headlineFont: 'font-dmserif',
    subheadline: 'Espaçoso, silencioso e com garantia perpétua de refrigeração uniforme',
    bodyCopy:
      'Conserve a frescura das frutas e carnes por muito mais tempo. Com vedação magnética hermética e motor ultra silencioso, é a peça indispensável que traz tranquilidade e economia real para o orçamento familiar.',
    priceCta: 'Pelo crediário amigo em até 12 vezes',
    classicSlogan: 'A certeza de servir sempre o melhor.',
    footerCredit: 'Indústrias Metalúrgicas Reunidas — Revendedor Autorizado',
    frameId: 'frame-coupon-dash',
    ribbonId: 'ribbon-garantia',
    paperTexture: 'aged-newsprint',
    imageUrl: retro50sPaper,
    primaryColor: '#1e384d',
    accentColor: '#b83227'
  }
];

export const RETRO_FONTS = [
  { id: 'font-playfair', name: 'Playfair Display (Didone / Bodoni Elegante 50s)' },
  { id: 'font-abril', name: 'Abril Fatface (Titular Forte de Prensa 50s)' },
  { id: 'font-shrikhand', name: 'Shrikhand (Cooper Black / Pop Art 60s)' },
  { id: 'font-alfa', name: 'Alfa Slab (Slab Serif Robusto / Cartaz)' },
  { id: 'font-dmserif', name: 'DM Serif (Editorial Jornal Clássico)' },
  { id: 'font-satisfy', name: 'Satisfy (Brush Script / Cursiva Anos 50)' },
  { id: 'font-cinzel', name: 'Cinzel (Monumento / Inscrição Dourada)' },
  { id: 'font-outfit', name: 'Outfit / Sans (Grotesca Suíça dos Anos 60)' }
];
