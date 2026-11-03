import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  ArrowRight,
} from 'react-feather';
import type { Deal } from './types';

interface VenddTableProps {
  deals: Deal[];
  onSelectDeal: (deal: Deal) => void;
  onAdvanceStage: (dealId: string) => void;
}

export const VenddTable: React.FC<VenddTableProps> = ({
  deals,
  onSelectDeal,
  onAdvanceStage,
}) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({
    'deal-1': true, // Marília expanded by default matching Figma
    'deal-diego': true,
  });

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === deals.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(deals.map((d) => d.id));
    }
  };

  const toggleSelectOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#131316] p-4 sm:p-6 select-none">
      {/* Table Container Card */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-zinc-800 bg-[#18181B] shadow-xl">
        {/* Bulk Action Bar if items selected */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between border-b border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs text-blue-200">
            <span className="font-medium">
              {selectedIds.length} negócio{selectedIds.length > 1 ? 's' : ''} selecionado{selectedIds.length > 1 ? 's' : ''}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded bg-[#155DFC] px-3 py-1 font-semibold text-white shadow hover:bg-blue-600 transition-colors"
                onClick={() => {
                  selectedIds.forEach((id) => onAdvanceStage(id));
                  setSelectedIds([]);
                }}
              >
                Avançar Etapa Selecionados
              </button>
              <button
                type="button"
                onClick={() => setSelectedIds([])}
                className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-zinc-300 hover:text-white"
              >
                Limpar
              </button>
            </div>
          </div>
        )}

        {/* Table Header */}
        <div className="grid grid-cols-12 items-center border-b border-zinc-800 px-4 py-3 text-xs font-semibold text-zinc-400">
          <div className="col-span-4 sm:col-span-4 flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedIds.length === deals.length && deals.length > 0}
              onChange={toggleSelectAll}
              className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-[#155DFC] focus:ring-0 focus:ring-offset-0 cursor-pointer"
            />
            <span>Negócio</span>
          </div>
          <div className="col-span-3 sm:col-span-2">Status</div>
          <div className="col-span-2 sm:col-span-2 text-right sm:text-left">Valor</div>
          <div className="hidden sm:block col-span-2">Comissão</div>
          <div className="hidden sm:block col-span-1">Início</div>
          <div className="col-span-3 sm:col-span-1 text-right">Ações</div>
        </div>

        {/* Table Rows */}
        <div className="flex-1 overflow-y-auto divide-y divide-zinc-800/80">
          {deals.map((deal) => {
            const isExpanded = !!expandedRows[deal.id];
            const isSelected = selectedIds.includes(deal.id);

            const statusColors =
              deal.stage === 'aguardando'
                ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                : deal.stage === 'contato_realizado'
                ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                : 'bg-purple-500/10 text-purple-300 border border-purple-500/20';

            return (
              <div
                key={deal.id}
                className={`transition-colors ${
                  isSelected ? 'bg-blue-950/20' : 'hover:bg-zinc-800/30'
                }`}
              >
                {/* Primary Row */}
                <div
                  className="grid grid-cols-12 items-center px-4 py-3 text-xs cursor-pointer"
                  onClick={() => onSelectDeal(deal)}
                >
                  {/* Negócio & Avatar */}
                  <div className="col-span-4 sm:col-span-4 flex items-center gap-3 min-w-0">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onClick={(e) => toggleSelectOne(deal.id, e)}
                      onChange={() => {}}
                      className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-[#155DFC] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                    />

                    <button
                      type="button"
                      aria-label="Expandir produtos do lead"
                      onClick={(e) => toggleRow(deal.id, e)}
                      className="text-zinc-500 hover:text-zinc-300"
                    >
                      {isExpanded ? (
                        <ChevronDown size={15} />
                      ) : (
                        <ChevronRight size={15} />
                      )}
                    </button>

                    <img
                      src={deal.avatarUrl}
                      alt={deal.clientName}
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                      className="h-6 w-6 rounded-full object-cover ring-1 ring-zinc-700 shrink-0"
                    />

                    <span className="truncate font-medium text-white hover:text-blue-400">
                      {deal.clientName}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="col-span-3 sm:col-span-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${statusColors}`}
                    >
                      {deal.statusLabel}
                    </span>
                  </div>

                  {/* Valor */}
                  <div className="col-span-2 sm:col-span-2 text-right sm:text-left font-semibold text-zinc-100">
                    {deal.totalValueFormatted}
                  </div>

                  {/* Comissão */}
                  <div className="hidden sm:block col-span-2 font-medium text-emerald-400">
                    {deal.commissionFormatted}
                  </div>

                  {/* Data Início */}
                  <div className="hidden sm:block col-span-1 text-zinc-400">
                    {deal.startDate}
                  </div>

                  {/* Ações */}
                  <div className="col-span-3 sm:col-span-1 flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      title="Avançar etapa"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdvanceStage(deal.id);
                      }}
                      className="flex h-6 w-6 items-center justify-center rounded bg-zinc-800 text-zinc-400 hover:bg-[#155DFC] hover:text-white transition-colors"
                    >
                      <ArrowRight size={13} />
                    </button>
                    <button
                      type="button"
                      title="Ver detalhes"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDeal(deal);
                      }}
                      className="flex h-6 w-6 items-center justify-center rounded bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                    >
                      <ExternalLink size={13} />
                    </button>
                  </div>
                </div>

                {/* Secondary Row (Nested Abandoned Cart Items matching Figma secondaryRowWrapper) */}
                {isExpanded && deal.cartProducts.length > 0 && (
                  <div className="border-t border-zinc-800/60 bg-[#131316]/80 px-4 py-2.5 pl-14 sm:pl-16">
                    <div className="mb-1.5 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                      <span>Itens do Carrinho ({deal.cartProducts.length})</span>
                      <span>Plataforma: {deal.platform}</span>
                    </div>

                    <div className="rounded-lg border border-zinc-800 bg-[#18181B] divide-y divide-zinc-800/60">
                      {/* Secondary Header */}
                      <div className="grid grid-cols-12 px-3 py-1.5 text-[10px] font-semibold text-zinc-400">
                        <div className="col-span-5">Produto</div>
                        <div className="col-span-3">Status do Item</div>
                        <div className="col-span-2">Valor</div>
                        <div className="col-span-2">Comissão</div>
                      </div>

                      {/* Secondary Rows */}
                      {deal.cartProducts.map((prod) => (
                        <div
                          key={prod.id}
                          className="grid grid-cols-12 items-center px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800/30"
                        >
                          <div className="col-span-5 truncate font-medium text-zinc-200">
                            {prod.name}
                          </div>
                          <div className="col-span-3">
                            <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-400">
                              {prod.status}
                            </span>
                          </div>
                          <div className="col-span-2 font-medium text-white">
                            {prod.priceFormatted}
                          </div>
                          <div className="col-span-2 text-emerald-400 text-[11px]">
                            {prod.commissionFormatted}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
