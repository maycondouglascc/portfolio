import React, { useState } from 'react';
import {
  Calendar,
  MessageSquare,
  Plus,
  ChevronRight,
} from 'react-feather';
import type { Deal, PipelineStage } from './types';

interface VenddKanbanProps {
  deals: Deal[];
  onSelectDeal: (deal: Deal) => void;
  onAdvanceStage: (dealId: string) => void;
  onAddDeal: (newDeal: Partial<Deal>) => void;
}

const COLUMNS: { id: PipelineStage; title: string; color: string }[] = [
  { id: 'aguardando', title: 'Aguardando', color: 'border-amber-500/50 text-amber-300' },
  { id: 'contato_realizado', title: 'Contato Realizado', color: 'border-blue-500/50 text-blue-300' },
  { id: 'reuniao_agendada', title: 'Reunião Agendada', color: 'border-purple-500/50 text-purple-300' },
];

export const VenddKanban: React.FC<VenddKanbanProps> = ({
  deals,
  onSelectDeal,
  onAdvanceStage,
  onAddDeal,
}) => {
  const [addingToStage, setAddingToStage] = useState<PipelineStage | null>(null);
  const [newClientName, setNewClientName] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const [newValue, setNewValue] = useState('1997');

  const handleCreateDeal = (stage: PipelineStage) => {
    if (!newClientName.trim()) return;
    onAddDeal({
      clientName: newClientName,
      mainProduct: newProduct || 'Trilogia Russell Brunson - Segredos',
      totalValue: Number(newValue) || 1997,
      totalValueFormatted: `R$ ${Number(newValue) || 1997},00`,
      stage,
      statusLabel: stage === 'aguardando' ? 'Aguardando' : stage === 'contato_realizado' ? 'Contato Realizado' : 'Reunião Agendada',
      dueLabel: 'Hoje',
      dueUrgency: 'urgent',
      platform: 'Hotmart',
      startDate: 'Hoje',
      avatarUrl: '/files/cases/vendd-web/avatars/avatar-marilia.png',
      createdAtDaysAgo: 1,
      cartProducts: [
        {
          id: `p-${Date.now()}`,
          name: newProduct || 'Trilogia Russell Brunson - Segredos',
          status: 'Aguardando Contato',
          price: Number(newValue) || 1997,
          priceFormatted: `R$ ${Number(newValue) || 1997},00`,
          commission: Math.round((Number(newValue) || 1997) * 0.15),
          commissionFormatted: `R$ ${Math.round((Number(newValue) || 1997) * 0.15)},00`,
          date: 'Hoje',
        },
      ],
      activities: [],
      chatHistory: [],
    });
    setNewClientName('');
    setNewProduct('');
    setNewValue('1997');
    setAddingToStage(null);
  };

  return (
    <div className="flex h-full w-full gap-5 overflow-x-auto p-4 sm:p-6 select-none">
      {COLUMNS.map((column) => {
        const columnDeals = deals.filter((d) => d.stage === column.id);
        const columnTotal = columnDeals.reduce((acc, curr) => acc + curr.totalValue, 0);

        return (
          <div
            key={column.id}
            className="flex h-full w-[340px] sm:w-[370px] shrink-0 flex-col rounded-xl border border-zinc-800 bg-[#18181B] shadow-lg"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">
                  {column.title}
                </span>
                <span className="flex h-5 items-center justify-center rounded-full bg-zinc-800 px-2 text-[11px] font-medium text-zinc-400">
                  {columnDeals.length}
                </span>
              </div>
              <span className="text-xs font-medium text-zinc-400">
                R$ {columnTotal.toLocaleString('pt-BR')}
              </span>
            </div>

            {/* Cards List */}
            <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5">
              {columnDeals.map((deal) => {
                const urgencyBg =
                  deal.dueUrgency === 'urgent'
                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    : deal.dueUrgency === 'warning'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-zinc-800/80 text-zinc-300';

                return (
                  <div
                    key={deal.id}
                    className="group relative rounded-lg border border-zinc-700/60 bg-[#27272A]/70 p-3.5 transition-all hover:border-[#155DFC]/60 hover:bg-[#27272A] hover:shadow-md cursor-pointer"
                    onClick={() => onSelectDeal(deal)}
                  >
                    {/* Top: Avatar & Client Name & Indicators */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={deal.avatarUrl}
                          alt={deal.clientName}
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                          className="h-7 w-7 rounded-full object-cover ring-1 ring-zinc-700 shrink-0"
                        />
                        <span className="truncate text-xs font-semibold text-zinc-100 group-hover:text-white">
                          {deal.clientName}
                        </span>
                      </div>

                      {/* Icons: Calendar Task + Chat Indicator */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${urgencyBg}`}
                        >
                          <Calendar size={11} />
                          <span>{deal.dueLabel}</span>
                        </span>
                        <span
                          title="Histórico de mensagens disponível"
                          className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 group-hover:text-zinc-200"
                        >
                          <MessageSquare size={11} />
                        </span>
                      </div>
                    </div>

                    {/* Middle: Product Title & Tag */}
                    <div className="mt-2.5 flex items-center justify-between gap-2">
                      <span className="truncate text-[11px] font-medium text-zinc-300">
                        {deal.mainProduct}
                      </span>
                      {deal.extraProductsCount ? (
                        <span className="shrink-0 rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400">
                          +{deal.extraProductsCount}
                        </span>
                      ) : null}
                    </div>

                    {/* Bottom: Price & Platform */}
                    <div className="mt-3 flex items-center justify-between border-t border-zinc-700/50 pt-2.5 text-xs">
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-zinc-400">
                          Valor Total
                        </span>
                        <span className="text-xs font-bold text-white">
                          {deal.totalValueFormatted}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="rounded bg-zinc-800/90 px-1.5 py-0.5 text-[10px] font-medium text-zinc-300">
                          {deal.platform}
                        </span>

                        {/* Quick advance stage button */}
                        {column.id !== 'reuniao_agendada' && (
                          <button
                            type="button"
                            title="Avançar para próxima etapa"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAdvanceStage(deal.id);
                            }}
                            className="flex h-6 w-6 items-center justify-center rounded bg-zinc-700/60 text-zinc-300 hover:bg-[#155DFC] hover:text-white transition-colors"
                          >
                            <ChevronRight size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Add Deal Form when active in this column */}
              {addingToStage === column.id ? (
                <div className="rounded-lg border border-[#155DFC]/50 bg-[#27272A] p-3 space-y-2 animate-in fade-in">
                  <input
                    type="text"
                    placeholder="Nome do cliente..."
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="w-full rounded border border-zinc-700 bg-[#18181B] px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-[#155DFC] focus:outline-none"
                    autoFocus
                  />
                  <input
                    type="text"
                    placeholder="Produto abandonado..."
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                    className="w-full rounded border border-zinc-700 bg-[#18181B] px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-[#155DFC] focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Valor (R$)"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="w-full rounded border border-zinc-700 bg-[#18181B] px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-[#155DFC] focus:outline-none"
                  />
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setAddingToStage(null)}
                      className="rounded px-2.5 py-1 text-xs text-zinc-400 hover:text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCreateDeal(column.id)}
                      className="rounded bg-[#155DFC] px-3 py-1 text-xs font-medium text-white hover:bg-blue-600 transition-colors"
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Bottom Add Deal Trigger */}
            <div className="border-t border-zinc-800/80 p-2.5">
              <button
                type="button"
                onClick={() => setAddingToStage(column.id)}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-zinc-700/80 py-2 text-xs font-medium text-zinc-400 transition-colors hover:border-zinc-500 hover:bg-zinc-800/40 hover:text-white"
              >
                <Plus size={14} />
                <span>Adicionar Negócio</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
