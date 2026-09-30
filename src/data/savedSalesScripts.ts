/**
 * ARQUIVO DE BACKUP / EXPORTAÇÃO PARA OUTROS PROJETOS
 * Scripts de Abordagem para Copiar e Mandar no WhatsApp
 * Guardado para uso em qualquer campanha, prospecção ou agência.
 */

export interface SalesScriptItem {
  id: string;
  niche: string;
  title: string;
  target: string;
  message: string;
  suggestedFollowUp?: string;
}

export const SAVED_WHATSAPP_SALES_SCRIPTS: SalesScriptItem[] = [
  {
    id: 'script-burger',
    niche: 'Hamburguerias & Diners',
    title: 'Script 1: Para Hamburguerias, Diners e Lanchonetes',
    target: 'Proprietário ou Gerente de Hamburgueria',
    message: `Olá, tudo bem? Notei que a sua hamburgueria tem uma proposta bem marcante e com personalidade!

Eu desenvolvi um modelo visual temático no estilo dos clássicos diners dos anos 50/60 para o seu cardápio e para posts no Instagram que aumenta muito o engajamento e as vendas nos fins de semana.

Fiz uma prévia com o estilo do seu negócio. Posso te enviar a foto sem compromisso para você ver como ficaria?`,
    suggestedFollowUp: 'Oi! Conseguiu dar uma olhada na foto? O que achou do visual para a hamburgueria?'
  },
  {
    id: 'script-barber',
    niche: 'Barbearias Vintage & Cutelaria',
    title: 'Script 2: Para Barbearias Vintage e Cavalheiros',
    target: 'Proprietário ou Gerente de Barbearia',
    message: `Fala pessoal da barbearia, tudo certo?

Acompanho o trabalho de vocês e o ambiente rústico/vintage de vocês combina 100% com a publicidade clássica da Era de Ouro dos anos 50 (corte clássico, navalha e elegância tradicional).

Criei artes retrô autênticas em alta definição tanto para o Instagram quanto para vocês imprimirem em placas de metal ou quadros para decorar a barbearia.

Se fizer sentido, me avisa que te mostro uma amostra personalizada com o nome da barbearia!`,
    suggestedFollowUp: 'Fala mestre! Posso te mandar o modelo com a logo da barbearia para você ver?'
  },
  {
    id: 'script-coffee',
    niche: 'Cafeterias & Confeitarias',
    title: 'Script 3: Para Cafeterias, Torrefações e Confeitarias',
    target: 'Dono ou Gestor de Cafeteria',
    message: `Olá, equipe da cafeteria! Tudo bem?

Vi as fotos do café e do espaço de vocês e achei de extremo bom gosto!

Desenvolvi uma série de artes com tipografia clássica dos anos 50/60 para cafeterias artesanais, perfeitas para destacar os cafés coados, tortas e receitas da casa, tanto no Instagram quanto em quadros decorativos para as mesas.

Gostaria de ver uma prévia de como ficaria com a marca de vocês? Envio uma sem compromisso!`,
    suggestedFollowUp: 'Olá! Preparei uma amostra rápida com um café coado. Posso te mostrar?'
  },
  {
    id: 'script-beer',
    niche: 'Cervejarias Artesanais & Pubs',
    title: 'Script 4: Para Cervejarias Artesanais, Pubs e Choperias',
    target: 'Proprietário de Pub ou Mestre Cervejeiro',
    message: `Boa tarde, pessoal do pub/cervejaria! Tudo beleza?

O ambiente de vocês pede artes publicitárias à altura da qualidade do chopp artesanal!

Criei modelos de cartazes ilustrados estilo anos 50/60 (estilo anúncio clássico de cervejaria tradicional) com selos de garantia de pureza e destaque de torneiras para bombar o happy hour de quinta e sexta.

Fiz um rascunho temático para vocês. Posso enviar no WhatsApp para darem uma olhada?`,
    suggestedFollowUp: 'Opa, tudo bem? Sexta-feira chegando, seria perfeito testar essa arte no feed!'
  },
  {
    id: 'script-fashion',
    niche: 'Brechós & Moda Vintage',
    title: 'Script 5: Para Brechós, Boutiques e Moda Retrô',
    target: 'Proprietária de Brechó ou Loja Vintage',
    message: `Olá! Admiro muito a curadoria de peças que vocês fazem no brechó/boutique!

O público que compra moda vintage ama o conceito estético dos anos 50 e 60. Eu crio artes publicitárias clássicas que parecem páginas de revistas de moda da época para valorizar os achados da loja e gerar desejo imediato nas seguidoras.

Posso te mandar uma arte de teste para vocês avaliarem?`,
    suggestedFollowUp: 'Olá! Tenho uma ideia de post para os garimpos da semana. Posso te mandar?'
  },
  {
    id: 'script-garage',
    niche: 'Oficinas & Estética Automotiva',
    title: 'Script 6: Para Oficinas Mecânicas de Clássicos e Lava-Rápidos',
    target: 'Dono de Oficina ou Restaurador Automotivo',
    message: `Boa tarde, mestre! Tudo bem?

Dono de carro e moto antiga é extremamente apaixonado por estética de época.

Eu trabalho criando quadros decorativos e anúncios retrô nos padrões das montadoras dos anos 50 e 60 (com ilustrações de carros clássicos e certificados de revisão) para colocar na recepção da oficina e no Instagram.

Vou te mandar uma foto de exemplo de como fica a placa com o nome da oficina. Pode ser?`,
    suggestedFollowUp: 'Boa tarde! Chegou a ver a placa com o visual dos anos 50?'
  },
  {
    id: 'script-package-monthly',
    niche: 'Comércios em Geral',
    title: 'Script 7: Proposta Fechada de Pacote Mensal (4 Artes)',
    target: 'Comércios Locais em Geral',
    message: `Olá! Preparei um pacote especial de 4 artes publicitárias retrô exclusivas para o seu negócio este mês:

✅ 1 Arte de Oferta Especial (Feed + Stories)
✅ 1 Arte de Destaque do Carro-Chefe da casa
✅ 1 Arte Institucional sobre Tradição e Qualidade
✅ 1 Arte pronta para impressão de Quadro Decorativo ou Placa

Tudo em alta definição (300 DPI) com textos persuasivos que vendem.
O pacote completo sai por apenas R$ 240 (sai R$ 60 por arte). Podemos rodar a primeira hoje?`
  },
  {
    id: 'script-frames',
    niche: 'Decoração e Espaço Físico',
    title: 'Script 8: Venda de Quadros Impressos para Decoração de Parede',
    target: 'Comércios que estão reformando ou decorando o salão',
    message: `Olá! Vocês já pensaram em valorizar a parede da recepção e do salão de atendimento com quadros decorativos retrô personalizados com o nome da loja?

Eu entrego as artes prontas em ultra resolução (4K / 300 DPI) no tamanho A3 com moldura clássica e proteção de vidro. O cliente entra, tira foto na frente do quadro e marca o seu estabelecimento nas redes sociais.

O kit com 2 quadros emoldurados fica em R$ 190. Quer que eu faça uma prévia sem compromisso para você ver na parede?`
  }
];
