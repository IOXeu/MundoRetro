/**
 * ARQUIVO DE BACKUP / EXPORTAÇÃO PARA OUTROS PROJETOS
 * Simulador de Renda Mensal com Vendas de Artes Retrô
 * Guardado para uso em outros projetos ou dashboards.
 */

import React, { useState } from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';

export const SavedProfitCalculator: React.FC = () => {
  const [artsPerMonth, setArtsPerMonth] = useState<number>(12);
  const [pricePerArt, setPricePerArt] = useState<number>(85);

  const estimatedTotal = artsPerMonth * pricePerArt;

  return (
    <div className="rounded-xl border border-[#2d2822] bg-[#181512] p-6 space-y-6 shadow-xl text-[#faf6ee] font-sans">
      <div>
        <h2 className="text-xl font-bold text-[#faf6ee] flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-[#cfa643]" />
          <span>Simulador de Renda Mensal com Vendas de Artes Retrô</span>
        </h2>
        <p className="text-xs text-[#a89d8d] mt-1">
          Ajuste os valores para planejar quantos clientes você precisa atender na sua cidade:
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-xs font-bold mb-2">
            <span className="text-[#ded5c6]">Quantas artes você quer vender por mês?</span>
            <span className="text-[#cfa643] text-sm">
              {artsPerMonth} artes ({Math.round(artsPerMonth / 4)} clientes com 4 artes cada)
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="40"
            value={artsPerMonth}
            onChange={(e) => setArtsPerMonth(Number(e.target.value))}
            className="w-full accent-[#cfa643] bg-[#2d2822] h-2 rounded-lg cursor-pointer"
          />
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
        </div>
      </div>

      <div className="rounded-xl border border-[#cfa643]/30 bg-[#201a12] p-4 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-[#cfa643]">
          Faturamento Estimado
        </span>
        <div className="text-3xl font-black text-emerald-400 mt-1">
          R$ {estimatedTotal.toLocaleString('pt-BR')},00
        </div>
      </div>
    </div>
  );
};
