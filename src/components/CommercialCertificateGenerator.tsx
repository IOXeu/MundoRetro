import React, { useState, useRef } from 'react';
import {
  ShieldCheck,
  Check,
  Copy,
  Download,
  Printer,
  Sparkles,
  FileCode,
  FileText,
  Save,
  Award,
  ExternalLink,
  Code
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';

interface CommercialCertificateGeneratorProps {
  initialBusinessName?: string;
  initialResponsible?: string;
  initialProject?: string;
}

export const CommercialCertificateGenerator: React.FC<CommercialCertificateGeneratorProps> = ({
  initialBusinessName = 'Hamburgueria & Diner Vintage',
  initialResponsible = 'Marcelo Ribeiro',
  initialProject = 'Campanha Retrô Anos 50/60 - Redes Sociais, Cardápio e Quadros de Parede'
}) => {
  const [clientBusinessName, setClientBusinessName] = useState<string>(initialBusinessName);
  const [clientResponsible, setClientResponsible] = useState<string>(initialResponsible);
  const [agencyName, setAgencyName] = useState<string>('Estúdio & Agência Mundo Retrô');
  const [projectNiche, setProjectNiche] = useState<string>(initialProject);
  const [licenseKey, setLicenseKey] = useState<string>('RETRO-LIC-2026-X89B');
  const [validity, setValidity] = useState<string>('Vitalícia (Sem expiração)');
  const [emissionDate, setEmissionDate] = useState<string>(new Date().toLocaleDateString('pt-BR'));

  // Included permissions
  const [allowSocialMedia, setAllowSocialMedia] = useState<boolean>(true);
  const [allowPrintWall, setAllowPrintWall] = useState<boolean>(true);
  const [allowMenu, setAllowMenu] = useState<boolean>(true);
  const [allowPaidAds, setAllowPaidAds] = useState<boolean>(true);

  // States for feedback
  const [isCopiedText, setIsCopiedText] = useState<boolean>(false);
  const [isExportingPng, setIsExportingPng] = useState<boolean>(false);
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false);
  const [isCopiedCode, setIsCopiedCode] = useState<boolean>(false);

  const certCardRef = useRef<HTMLDivElement>(null);

  // Download High Resolution PNG of the certificate
  const handleDownloadPNG = async () => {
    if (!certCardRef.current) return;
    setIsExportingPng(true);
    try {
      const dataUrl = await toPng(certCardRef.current, {
        cacheBust: true,
        quality: 0.98,
        pixelRatio: 2.5
      });
      const link = document.createElement('a');
      link.download = `Certificado-Licenca-${clientBusinessName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    } catch (err) {
      console.error('Erro ao gerar imagem do certificado:', err);
    } finally {
      setIsExportingPng(false);
    }
  };

  // Copy formal certificate text
  const handleCopyText = () => {
    const certText = `========================================================
CERTIFICADO OFICIAL DE LICENÇA DE USO COMERCIAL
========================================================
CHAVE DE AUTENTICIDADE: ${licenseKey}
DATA DE EMISSÃO: ${emissionDate}
EMISSOR / AGÊNCIA: ${agencyName}

BENEFICIÁRIO: ${clientBusinessName}
RESPONSÁVEL LEGAL: ${clientResponsible}
PROJETO: ${projectNiche}
VALIDADE: ${validity}

DIREITOS E PERMISSÕES CONCEDIDAS:
${allowSocialMedia ? '• Divulgação em Redes Sociais (Instagram, Facebook, etc.)\n' : ''}${allowPaidAds ? '• Tráfego Pago e Anúncios Comerciais\n' : ''}${allowPrintWall ? '• Impressão de Quadros Decorativos e Placas de Parede\n' : ''}${allowMenu ? '• Impressão em Cardápios, Banners e Cavaletes\n' : ''}
STATUS: LICENÇA COMERCIAL REGULARIZADA
Padrão Técnico: Diagramação Histórica Retrô 1950–1960 em Alta Definição.

Documento emitido para fins de comprovação de titularidade e cessão patrimonial de direitos visuais.
========================================================`;
    navigator.clipboard.writeText(certText);
    setIsCopiedText(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
    setTimeout(() => setIsCopiedText(false), 2500);
  };

  // Print or Save as PDF
  const handlePrint = () => {
    window.print();
  };

  // Download certificate data as JSON backup
  const handleDownloadJSON = () => {
    const data = {
      tipo: 'CertificadoComercialRetro',
      chaveLicenca: licenseKey,
      dataEmissao: emissionDate,
      emissor: agencyName,
      cliente: clientBusinessName,
      responsavel: clientResponsible,
      projeto: projectNiche,
      validade: validity,
      permissoes: {
        redesSociais: allowSocialMedia,
        anunciosPagos: allowPaidAds,
        quadrosParede: allowPrintWall,
        cardapiosEBanners: allowMenu
      }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `licenca-${clientBusinessName.replace(/\s+/g, '-').toLowerCase()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Reusable standalone React component code that the user can copy to any other project
  const standaloneComponentCode = `// Componente Reutilizável: Certificado Comercial para Clientes
// Você pode colar este arquivo em qualquer outro projeto React (Next.js, Vite, etc.)
import React from 'react';

export interface CertificateData {
  clientName: string;
  responsible: string;
  project: string;
  licenseKey: string;
  emissionDate: string;
  agencyName: string;
}

export const CommercialCertificateCard: React.FC<{ data: CertificateData }> = ({ data }) => {
  return (
    <div style={{
      background: '#fbf8f1',
      border: '4px double #2b2416',
      padding: '32px',
      color: '#1a1714',
      fontFamily: 'serif',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      borderRadius: '8px'
    }}>
      <div style={{ textAlign: 'center', borderBottom: '2px solid #2b2416', paddingBottom: '16px', marginBottom: '20px' }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '11px', color: '#7a6a4f', margin: 0 }}>
          {data.agencyName}
        </p>
        <h2 style={{ fontSize: '24px', fontWeight: 900, margin: '8px 0', textTransform: 'uppercase' }}>
          Certificado de Licença Comercial
        </h2>
        <code style={{ fontSize: '12px', background: '#ede5d3', padding: '2px 8px', borderRadius: '4px' }}>
          CHAVE: {data.licenseKey}
        </code>
      </div>

      <p style={{ fontSize: '14px', lineHeight: 1.6 }}>
        Certifica-se que o estabelecimento <strong>{data.clientName}</strong>, sob responsabilidade de <strong>{data.responsible}</strong>, detém autorização irrevogável para uso comercial das artes produzidas para o projeto <em>{data.project}</em>.
      </p>

      <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #3b3325', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
        <span>Emitido em: {data.emissionDate}</span>
        <span style={{ color: '#822415', fontWeight: 'bold' }}>★ Licença Oficial Autenticada ★</span>
      </div>
    </div>
  );
};
`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(standaloneComponentCode);
    setIsCopiedCode(true);
    setTimeout(() => setIsCopiedCode(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-[#cfa643]/30 bg-gradient-to-r from-[#1c1914] via-[#161410] to-[#221c16] p-5">
        <div>
          <div className="flex items-center gap-2 text-[#cfa643] text-xs font-bold uppercase tracking-wider">
            <Award className="h-4 w-4" />
            <span>Módulo Comercial Independente</span>
          </div>
          <h2 className="font-playfair text-2xl font-bold text-[#faf6ee] mt-1">
            Gerador de Certificado Comercial para Clientes
          </h2>
          <p className="text-xs text-[#b8ad9c] mt-0.5">
            Emita certificados oficiais para entregar aos seus clientes junto com as artes. Salve em PNG, PDF ou guarde o modelo para usar em qualquer outro projeto.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowCodeModal(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#cfa643]/50 bg-[#cfa643]/15 px-3 py-2 text-xs font-bold text-[#f5c854] hover:bg-[#cfa643]/25 transition-colors"
          >
            <Code className="h-3.5 w-3.5" />
            <span>Código para Outro Projeto</span>
          </button>

          <button
            onClick={handleDownloadJSON}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#3b3428] bg-[#221c16] px-3 py-2 text-xs font-bold text-[#ded5c6] hover:bg-[#2e261f] transition-colors"
          >
            <Save className="h-3.5 w-3.5 text-[#cfa643]" />
            <span>Guardar Modelo (JSON)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Controls (Left Col) */}
        <div className="lg:col-span-5 rounded-xl border border-[#2d2822] bg-[#181512] p-5 space-y-4 shadow-xl">
          <h3 className="font-bold text-sm text-[#faf6ee] border-b border-[#252019] pb-2 flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#cfa643]" />
            <span>Dados da Empresa e Licença</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-[#ded5c6] mb-1">
                Nome do Estabelecimento / Cliente:
              </label>
              <input
                type="text"
                value={clientBusinessName}
                onChange={(e) => setClientBusinessName(e.target.value)}
                className="w-full rounded bg-[#100f0d] border border-[#2f2921] px-3 py-2 text-[#faf6ee] focus:border-[#cfa643] outline-none"
                placeholder="Ex: Big Burger Diner"
              />
            </div>

            <div>
              <label className="block font-bold text-[#ded5c6] mb-1">
                Nome do Proprietário / Responsável:
              </label>
              <input
                type="text"
                value={clientResponsible}
                onChange={(e) => setClientResponsible(e.target.value)}
                className="w-full rounded bg-[#100f0d] border border-[#2f2921] px-3 py-2 text-[#faf6ee] focus:border-[#cfa643] outline-none"
                placeholder="Ex: Carlos Oliveira"
              />
            </div>

            <div>
              <label className="block font-bold text-[#ded5c6] mb-1">
                Sua Agência / Nome do Emissor:
              </label>
              <input
                type="text"
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                className="w-full rounded bg-[#100f0d] border border-[#2f2921] px-3 py-2 text-[#faf6ee] focus:border-[#cfa643] outline-none"
                placeholder="Ex: Agência Vintage Media"
              />
            </div>

            <div>
              <label className="block font-bold text-[#ded5c6] mb-1">
                Finalidade / Descrição do Projeto:
              </label>
              <input
                type="text"
                value={projectNiche}
                onChange={(e) => setProjectNiche(e.target.value)}
                className="w-full rounded bg-[#100f0d] border border-[#2f2921] px-3 py-2 text-[#faf6ee] focus:border-[#cfa643] outline-none"
                placeholder="Ex: Artes de Cardápio e Quadros Decorativos"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-[#ded5c6] mb-1">Código de Licença:</label>
                <input
                  type="text"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  className="w-full rounded bg-[#100f0d] border border-[#2f2921] px-2.5 py-1.5 text-[#cfa643] font-mono outline-none text-[11px]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#ded5c6] mb-1">Validade:</label>
                <input
                  type="text"
                  value={validity}
                  onChange={(e) => setValidity(e.target.value)}
                  className="w-full rounded bg-[#100f0d] border border-[#2f2921] px-2.5 py-1.5 text-[#faf6ee] outline-none text-[11px]"
                />
              </div>
            </div>

            {/* Checkboxes for permissions */}
            <div className="rounded-lg bg-[#110f0d] p-3 border border-[#24201a] space-y-2">
              <span className="block font-bold text-[11px] text-[#cfa643] uppercase tracking-wider">
                Permissões Inclusas no Certificado:
              </span>
              <label className="flex items-center gap-2 cursor-pointer text-[#ded5c6]">
                <input
                  type="checkbox"
                  checked={allowSocialMedia}
                  onChange={(e) => setAllowSocialMedia(e.target.checked)}
                  className="accent-[#cfa643]"
                />
                <span>Redes Sociais (Instagram, Facebook)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[#ded5c6]">
                <input
                  type="checkbox"
                  checked={allowPaidAds}
                  onChange={(e) => setAllowPaidAds(e.target.checked)}
                  className="accent-[#cfa643]"
                />
                <span>Anúncios Pagos & Tráfego</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[#ded5c6]">
                <input
                  type="checkbox"
                  checked={allowPrintWall}
                  onChange={(e) => setAllowPrintWall(e.target.checked)}
                  className="accent-[#cfa643]"
                />
                <span>Quadros Decorativos & Placas de Parede</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[#ded5c6]">
                <input
                  type="checkbox"
                  checked={allowMenu}
                  onChange={(e) => setAllowMenu(e.target.checked)}
                  className="accent-[#cfa643]"
                />
                <span>Cardápios, Banners & Impressos</span>
              </label>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2 pt-2 border-t border-[#252019]">
            <button
              onClick={handleDownloadPNG}
              disabled={isExportingPng}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#cfa643] to-[#e6b94d] py-2.5 text-xs font-bold text-[#121110] hover:brightness-110 transition-all shadow"
            >
              <Download className="h-4 w-4" />
              <span>{isExportingPng ? 'Gerando Imagem...' : 'Baixar Imagem do Certificado (PNG)'}</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCopyText}
                className="inline-flex items-center justify-center gap-1.5 rounded bg-[#241e17] px-3 py-2 text-xs font-bold text-[#ded5c6] hover:bg-[#31281e] transition-colors border border-[#332b21]"
              >
                {isCopiedText ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-[#cfa643]" />}
                <span>{isCopiedText ? 'Copiado!' : 'Copiar Texto'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center justify-center gap-1.5 rounded bg-[#241e17] px-3 py-2 text-xs font-bold text-[#ded5c6] hover:bg-[#31281e] transition-colors border border-[#332b21]"
              >
                <Printer className="h-3.5 w-3.5 text-[#cfa643]" />
                <span>Imprimir / PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Certificate Card (Right Col) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div
            ref={certCardRef}
            className="w-full rounded-xl border-4 border-[#cfa643]/50 bg-[#f9f5eb] p-7 text-[#1a1714] shadow-2xl space-y-5 font-serif relative overflow-hidden"
          >
            {/* Vintage Ornamental Inner Border */}
            <div className="border-2 border-[#3b3223] p-6 space-y-4 bg-[#fdfbf6] relative">
              {/* Corner Ornaments */}
              <div className="absolute top-1 left-1 text-[#8f7e64] text-xs font-mono select-none">✦</div>
              <div className="absolute top-1 right-1 text-[#8f7e64] text-xs font-mono select-none">✦</div>
              <div className="absolute bottom-1 left-1 text-[#8f7e64] text-xs font-mono select-none">✦</div>
              <div className="absolute bottom-1 right-1 text-[#8f7e64] text-xs font-mono select-none">✦</div>

              {/* Certificate Header */}
              <div className="text-center space-y-1.5 border-b-2 border-[#2b2416] pb-4">
                <div className="text-[10px] tracking-widest uppercase font-bold text-[#7a6a4f]">
                  {agencyName || 'ESTÚDIO DE CRIAÇÃO E ARTE COMERCIAL'}
                </div>
                <h3 className="font-playfair text-2xl font-black text-[#1c1813] uppercase tracking-wide">
                  Certificado de Licença Comercial
                </h3>
                <div className="inline-block bg-[#ede5d3] px-3 py-0.5 rounded text-[11px] font-mono text-[#544837] border border-[#d6c7b0]">
                  CHAVE DE AUTENTICIDADE: {licenseKey}
                </div>
              </div>

              {/* Main Body */}
              <div className="space-y-3 text-xs leading-relaxed text-[#2c261e]">
                <p>
                  Certifica-se formalmente que o estabelecimento{' '}
                  <strong className="text-[#822415] uppercase tracking-wide">
                    {clientBusinessName || 'CLIENTE BENEFICIÁRIO'}
                  </strong>
                  , sob a titularidade e responsabilidade de{' '}
                  <strong>{clientResponsible || 'RESPONSÁVEL'}</strong>, obteve os direitos de uso e veiculação das obras e peças publicitárias produzidas sob o estilo Retrô 1950–1960.
                </p>

                <div className="bg-[#f2ecdd] p-3.5 rounded border border-[#dacdb9] text-[11px] space-y-1.5">
                  <div>
                    <strong>Finalidade Autorizada:</strong> {projectNiche}
                  </div>
                  <div>
                    <strong>Prazo de Validade:</strong> {validity}
                  </div>
                  <div className="pt-1 border-t border-[#d8cbbb]">
                    <strong>Permissões Concedidas:</strong>
                    <div className="grid grid-cols-2 gap-1 mt-1 text-[10px] text-[#443b2f]">
                      {allowSocialMedia && <div>✓ Redes Sociais & Feeds</div>}
                      {allowPaidAds && <div>✓ Anúncios Pagos & Tráfego</div>}
                      {allowPrintWall && <div>✓ Impressão de Quadros e Placas</div>}
                      {allowMenu && <div>✓ Cardápios e Comunicação Visual</div>}
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-[#635746] italic">
                  Este certificado garante ao beneficiário proteção contra reivindicações de direitos autorais, comprovando a autoria e a respectiva cessão patrimonial.
                </p>
              </div>

              {/* Signatures & Seal */}
              <div className="pt-4 border-t border-[#3b3325] flex items-end justify-between text-[11px]">
                <div className="space-y-1">
                  <div className="font-mono text-[10px] text-[#544837]">
                    Emissão: {emissionDate}
                  </div>
                  <div className="text-[10px] text-[#7a6a4f]">
                    Emissor: {agencyName}
                  </div>
                </div>

                {/* Round Stamp / Badge */}
                <div className="rounded-full border-2 border-dashed border-[#822415] bg-[#faebe8] px-3 py-2 text-center text-[#822415]">
                  <div className="text-[9px] font-bold uppercase tracking-wider">
                    ★ SELO OFICIAL ★
                  </div>
                  <div className="text-[10px] font-black uppercase">
                    COMERCIAL APROVADO
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Export Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#cfa643]/40 bg-[#161310] p-6 text-[#ded5c6] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#2b241c] pb-3">
              <div>
                <h3 className="font-bold text-base text-[#faf6ee] flex items-center gap-2">
                  <Code className="h-4 w-4 text-[#cfa643]" />
                  <span>Código React do Componente para Outro Projeto</span>
                </h3>
                <p className="text-xs text-[#a89d8d]">
                  Copie e cole este componente em qualquer outro aplicativo seu:
                </p>
              </div>
              <button
                onClick={() => setShowCodeModal(false)}
                className="text-[#a89d8d] hover:text-[#faf6ee] text-xs font-bold px-2 py-1 rounded bg-[#231e18]"
              >
                Fechar [x]
              </button>
            </div>

            <pre className="max-h-80 overflow-y-auto rounded-lg bg-[#0e0c0a] p-4 text-xs font-mono text-[#e6b94d] border border-[#29221a] leading-relaxed">
              {standaloneComponentCode}
            </pre>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#cfa643] px-4 py-2 text-xs font-bold text-[#121110] hover:bg-[#e0b654] transition-colors"
              >
                {isCopiedCode ? <Check className="h-4 w-4 text-emerald-900" /> : <Copy className="h-4 w-4" />}
                <span>{isCopiedCode ? 'Código Copiado!' : 'Copiar Código React'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
