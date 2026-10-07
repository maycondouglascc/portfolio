import React, { useState } from 'react';
import {
  Calendar,
  MessageSquare,
  Filter,
  Search,
  Home,
  DollarSign,
  Mail,
  Menu,
  ChevronRight,
  Wifi,
  Battery,
} from 'react-feather';
import type { Deal, PipelineStage } from './types';

interface VenddMobileProps {
  deals: Deal[];
  onSelectDeal: (deal: Deal) => void;
  onAdvanceStage: (dealId: string) => void;
}

const COLUMNS: { id: PipelineStage; label: string }[] = [
  { id: 'aguardando', label: 'Aguardando' },
  { id: 'contato_realizado', label: 'Contato Realizado' },
  { id: 'reuniao_agendada', label: 'Reunião Agendada' },
];

export const VenddMobile: React.FC<VenddMobileProps> = ({
  deals,
  onSelectDeal,
  onAdvanceStage,
}) => {
  const [activeStageTab, setActiveStageTab] = useState<PipelineStage>('aguardando');
  const [activeNavTab, setActiveNavTab] = useState<'home' | 'crm' | 'chat' | 'menu'>('crm');

  const filteredDeals = deals.filter((d) => d.stage === activeStageTab);

  return (
    <div className="flex h-full w-full items-center justify-center p-4 bg-[#131316] select-none">
      {/* iPhone Device Mockup Frame */}
      <div className="relative flex h-[780px] w-[375px] flex-col overflow-hidden rounded-[48px] border-[10px] border-zinc-800 bg-[#18181B] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] ring-1 ring-zinc-700">
        {/* iOS Dynamic Island & Status Bar (matching Figma 93:4886) */}
        <div className="relative z-20 flex h-11 w-full items-center justify-between px-7 pt-2 text-[13px] font-semibold text-white">
          <span>9:41</span>
          <div className="h-5 w-24 rounded-full bg-black shadow-inner" />
          <div className="flex items-center gap-1.5 text-zinc-300">
            <Wifi size={13} />
            <Battery size={15} />
          </div>
        </div>

        {/* Mobile Header (matching Figma 93:4880) */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 px-4 py-3">
          <div className="flex items-center gap-2">
            <img
              src="/files/cases/vendd-web/vendd-logo.svg"
              alt="Vendd"
              className="h-5 w-4 object-contain"
            />
            <h1 className="text-sm font-bold tracking-tight text-white">
              Recuperar Vendas
            </h1>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 hover:text-white"
            >
              <Search size={14} />
            </button>
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 hover:text-white"
            >
              <Filter size={14} />
            </button>
          </div>
        </div>

        {/* Pipeline Stage Tabs Bar */}
        <div className="flex border-b border-zinc-800 bg-[#131316] px-2 py-1.5 gap-1 overflow-x-auto">
          {COLUMNS.map((col) => {
            const count = deals.filter((d) => d.stage === col.id).length;
            const isActive = activeStageTab === col.id;
            return (
              <button
                key={col.id}
                type="button"
                onClick={() => setActiveStageTab(col.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#155DFC] text-white shadow'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                }`}
              >
                <span>{col.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    isActive ? 'bg-blue-700 text-white' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Board Cards Scroll Area (matching Figma 93:4661 boards) */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {filteredDeals.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center text-xs text-zinc-500">
              Nenhum negócio nesta coluna
            </div>
          ) : (
            filteredDeals.map((deal) => {
              const urgencyColor =
                deal.dueUrgency === 'urgent'
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  : deal.dueUrgency === 'warning'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-zinc-800 text-zinc-300';

              return (
                <div
                  key={deal.id}
                  onClick={() => onSelectDeal(deal)}
                  className="rounded-xl border border-zinc-700/60 bg-[#27272A]/80 p-3 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
                >
                  {/* Top Client info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={deal.avatarUrl}
                        alt={deal.clientName}
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                        className="h-6 w-6 rounded-full object-cover ring-1 ring-zinc-700"
                      />
                      <span className="text-xs font-semibold text-white">
                        {deal.clientName}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${urgencyColor}`}
                      >
                        <Calendar size={10} />
                        <span>{deal.dueLabel}</span>
                      </span>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-800 text-zinc-400">
                        <MessageSquare size={10} />
                      </span>
                    </div>
                  </div>

                  {/* Product Title */}
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="truncate text-xs text-zinc-300">
                      {deal.mainProduct}
                    </span>
                    {deal.extraProductsCount ? (
                      <span className="shrink-0 rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400">
                        +{deal.extraProductsCount}
                      </span>
                    ) : null}
                  </div>

                  {/* Price and Action */}
                  <div className="mt-2.5 flex items-center justify-between border-t border-zinc-700/60 pt-2 text-xs">
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-zinc-400">
                        Valor Total
                      </span>
                      <span className="text-xs font-bold text-white">
                        {deal.totalValueFormatted}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-300">
                        {deal.platform}
                      </span>
                      {activeStageTab !== 'reuniao_agendada' && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAdvanceStage(deal.id);
                          }}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-[#155DFC] text-white"
                        >
                          <ChevronRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Navigation Bar (matching Figma 93:4197 Active Page=Negócios) */}
        <div className="flex h-16 w-full items-center justify-around border-t border-zinc-800 bg-[#18181B] px-3 pb-2 text-[10px]">
          <button
            type="button"
            onClick={() => setActiveNavTab('home')}
            className={`flex flex-col items-center gap-1 ${
              activeNavTab === 'home' ? 'text-[#155DFC] font-semibold' : 'text-zinc-400'
            }`}
          >
            <Home size={17} />
            <span>Início</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveNavTab('crm')}
            className={`flex flex-col items-center gap-1 ${
              activeNavTab === 'crm' ? 'text-[#155DFC] font-semibold' : 'text-zinc-400'
            }`}
          >
            <DollarSign size={17} />
            <span>Negócios</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveNavTab('chat')}
            className={`flex flex-col items-center gap-1 ${
              activeNavTab === 'chat' ? 'text-[#155DFC] font-semibold' : 'text-zinc-400'
            }`}
          >
            <Mail size={17} />
            <span>Mensagens</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveNavTab('menu')}
            className={`flex flex-col items-center gap-1 ${
              activeNavTab === 'menu' ? 'text-[#155DFC] font-semibold' : 'text-zinc-400'
            }`}
          >
            <Menu size={17} />
            <span>Mais</span>
          </button>
        </div>

        {/* iOS Home Indicator Bar */}
        <div className="flex h-4 w-full items-center justify-center bg-[#18181B] pb-1">
          <div className="h-1 w-32 rounded-full bg-zinc-600" />
        </div>
      </div>
    </div>
  );
};
