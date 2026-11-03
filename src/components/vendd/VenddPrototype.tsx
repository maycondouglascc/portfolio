import React, { useState, useMemo } from 'react';
import {
  Columns,
  List,
  Smartphone,
  Search,
  RotateCcw,
} from 'react-feather';

const SparklesIcon: React.FC<{ size?: number; className?: string }> = ({ size = 14, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3l1.912 4.686L18.6 9.6l-4.686 1.912L12 16.2l-1.912-4.688L5.4 9.6l4.688-1.914L12 3z" />
    <path d="M19 16l.956 2.343L22.3 19.3l-2.344.956L19 22.6l-.956-2.344L15.7 19.3l2.344-.957L19 16z" />
  </svg>
);
import { VenddTopBar } from './VenddTopBar';
import { VenddSidebar } from './VenddSidebar';
import { VenddKanban } from './VenddKanban';
import { VenddTable } from './VenddTable';
import { VenddDealDrawer } from './VenddDealDrawer';
import { VenddGpt } from './VenddGpt';
import { VenddMobile } from './VenddMobile';
import { INITIAL_DEALS } from './mockData';
import type { Deal, PipelineStage } from './types';

export type PrototypeViewMode = 'kanban' | 'table' | 'mobile' | 'gpt';

interface VenddPrototypeProps {
  initialViewMode?: PrototypeViewMode;
  className?: string;
}

export const VenddPrototype: React.FC<VenddPrototypeProps> = ({
  initialViewMode = 'kanban',
  className = '',
}) => {
  const [viewMode, setViewMode] = useState<PrototypeViewMode>(initialViewMode);
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | PipelineStage>('all');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState('Negócios');

  // Handle stage advances
  const handleAdvanceStage = (dealId: string) => {
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id !== dealId) return d;
        let nextStage: PipelineStage = d.stage;
        let nextLabel: Deal['statusLabel'] = d.statusLabel;

        if (d.stage === 'aguardando') {
          nextStage = 'contato_realizado';
          nextLabel = 'Contato Realizado';
        } else if (d.stage === 'contato_realizado') {
          nextStage = 'reuniao_agendada';
          nextLabel = 'Reunião Agendada';
        } else if (d.stage === 'reuniao_agendada') {
          nextStage = 'ganho';
          nextLabel = 'Ganho';
        }

        return { ...d, stage: nextStage, statusLabel: nextLabel };
      })
    );
  };

  const handleUpdateStage = (dealId: string, newStage: PipelineStage) => {
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id !== dealId) return d;
        const labelMap: Record<PipelineStage, Deal['statusLabel']> = {
          aguardando: 'Aguardando',
          contato_realizado: 'Contato Realizado',
          reuniao_agendada: 'Reunião Agendada',
          ganho: 'Ganho',
          perdido: 'Perdido',
        };
        return { ...d, stage: newStage, statusLabel: labelMap[newStage] };
      })
    );
    if (selectedDeal?.id === dealId) {
      setSelectedDeal((prev) =>
        prev
          ? {
              ...prev,
              stage: newStage,
              statusLabel:
                newStage === 'aguardando'
                  ? 'Aguardando'
                  : newStage === 'contato_realizado'
                  ? 'Contato Realizado'
                  : newStage === 'reuniao_agendada'
                  ? 'Reunião Agendada'
                  : newStage === 'ganho'
                  ? 'Ganho'
                  : 'Perdido',
            }
          : null
      );
    }
  };

  const handleAddDeal = (newDeal: Partial<Deal>) => {
    const fullDeal: Deal = {
      id: `deal-${Date.now()}`,
      clientName: newDeal.clientName || 'Novo Cliente',
      avatarUrl: newDeal.avatarUrl || '/files/cases/vendd-web/avatars/avatar-marilia.png',
      stage: newDeal.stage || 'aguardando',
      statusLabel: newDeal.statusLabel || 'Aguardando',
      dueLabel: 'Hoje',
      dueUrgency: 'urgent',
      mainProduct: newDeal.mainProduct || 'Produto Vendd',
      totalValue: newDeal.totalValue || 1997,
      totalValueFormatted: newDeal.totalValueFormatted || 'R$ 1.997,00',
      commission: newDeal.commission || 297,
      commissionFormatted: newDeal.commissionFormatted || 'R$ 297,00',
      startDate: 'Hoje',
      platform: newDeal.platform || 'Hotmart',
      createdAtDaysAgo: 0,
      cartProducts: newDeal.cartProducts || [],
      activities: [],
      chatHistory: [],
    };
    setDeals((prev) => [fullDeal, ...prev]);
  };

  const handleResetData = () => {
    setDeals(INITIAL_DEALS);
    setSearchQuery('');
    setStatusFilter('all');
  };

  // Filtered deals
  const filteredDeals = useMemo(() => {
    return deals.filter((d) => {
      const matchSearch =
        d.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.mainProduct.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'all' || d.stage === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [deals, searchQuery, statusFilter]);

  // Aggregate stats
  const totalPipelineValue = useMemo(() => {
    return deals.reduce((acc, curr) => acc + curr.totalValue, 0);
  }, [deals]);

  const totalCommissions = useMemo(() => {
    return deals.reduce((acc, curr) => acc + curr.commission, 0);
  }, [deals]);

  const handleOpenDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsDrawerOpen(true);
  };

  const handleSidebarSelect = (item: string) => {
    setActiveSidebarItem(item);
    if (item === 'Vendd GPT') {
      setViewMode('gpt');
    } else if (item === 'Negócios') {
      if (viewMode === 'gpt') setViewMode('kanban');
    }
  };

  return (
    <div
      className={`relative flex flex-col w-full rounded-2xl border border-zinc-800 bg-[#131316] text-white shadow-2xl overflow-hidden select-none ${className}`}
    >
      {/* Prototype Control Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 bg-[#18181B] px-4 py-3 gap-3">
        {/* Left: View Mode Toggles */}
        <div className="flex items-center gap-1.5 rounded-lg border border-zinc-700/80 bg-[#131316] p-1">
          <button
            type="button"
            onClick={() => setViewMode('kanban')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              viewMode === 'kanban'
                ? 'bg-[#155DFC] text-white shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Columns size={14} />
            <span>Quadro</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              viewMode === 'table'
                ? 'bg-[#155DFC] text-white shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <List size={14} />
            <span>Tabela</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('gpt')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              viewMode === 'gpt'
                ? 'bg-purple-600 text-white shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <SparklesIcon size={14} />
            <span>Vendd GPT</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              viewMode === 'mobile'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Smartphone size={14} />
            <span>Mobile</span>
          </button>
        </div>

        {/* Center: Live Stats */}
        <div className="hidden lg:flex items-center gap-6 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span>Total em Recuperação:</span>
            <strong className="text-white">
              R$ {totalPipelineValue.toLocaleString('pt-BR')},00
            </strong>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Comissão Prevista:</span>
            <strong className="text-emerald-400">
              R$ {totalCommissions.toLocaleString('pt-BR')},00
            </strong>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const diego = deals.find((d) => d.id === 'deal-diego') || deals[0];
              handleOpenDeal(diego);
            }}
            className="flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800/80 px-2.5 py-1.5 text-xs text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
          >
            <span>Ver Detalhes do Negócio</span>
          </button>

          <button
            type="button"
            title="Restaurar dados originais do protótipo"
            onClick={handleResetData}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Secondary Search & Filter Bar (matching Figma interactions bar #93:4639) */}
      {viewMode !== 'mobile' && viewMode !== 'gpt' && (
        <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 bg-[#131316] px-4 py-2.5 gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold text-white tracking-tight">
              Recuperar vendas
            </h2>
            <span className="hidden sm:inline-block rounded-full bg-zinc-800 px-2 py-0.5 text-[11px] font-medium text-zinc-400">
              {filteredDeals.length} oportunidades
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-1 max-w-md justify-end">
            {/* Search Input (matching Figma 93:4652) */}
            <div className="relative w-full max-w-xs">
              <Search
                size={13}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500"
              />
              <input
                type="text"
                placeholder="Pesquisar por cliente ou produto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-zinc-700/80 bg-[#18181B] py-1.5 pl-8 pr-3 text-xs text-white placeholder-zinc-500 focus:border-[#155DFC] focus:outline-none"
              />
            </div>

            {/* Filter Dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | PipelineStage)}
              className="rounded-lg border border-zinc-700/80 bg-[#18181B] px-2.5 py-1.5 text-xs text-zinc-300 focus:border-[#155DFC] focus:outline-none"
            >
              <option value="all">Todos os Status</option>
              <option value="aguardando">Aguardando</option>
              <option value="contato_realizado">Contato Realizado</option>
              <option value="reuniao_agendada">Reunião Agendada</option>
            </select>
          </div>
        </div>
      )}

      {/* Main Workspace Frame */}
      <div className="flex h-[740px] w-full flex-col overflow-hidden bg-[#131316]">
        {/* Vendd App TopBar */}
        {viewMode !== 'mobile' && <VenddTopBar activeTab="CRM" />}

        {/* Content Viewport with Sidebar */}
        <div className="flex flex-1 overflow-hidden">
          {viewMode !== 'mobile' && (
            <VenddSidebar
              activeMenuItem={activeSidebarItem}
              onSelectMenuItem={handleSidebarSelect}
              className="hidden md:flex"
            />
          )}

          {/* Active Interactive Subview */}
          <main className="flex-1 overflow-hidden bg-[#131316]">
            {viewMode === 'kanban' && (
              <VenddKanban
                deals={filteredDeals}
                onSelectDeal={handleOpenDeal}
                onAdvanceStage={handleAdvanceStage}
                onAddDeal={handleAddDeal}
              />
            )}

            {viewMode === 'table' && (
              <VenddTable
                deals={filteredDeals}
                onSelectDeal={handleOpenDeal}
                onAdvanceStage={handleAdvanceStage}
              />
            )}

            {viewMode === 'gpt' && <VenddGpt />}

            {viewMode === 'mobile' && (
              <VenddMobile
                deals={deals}
                onSelectDeal={handleOpenDeal}
                onAdvanceStage={handleAdvanceStage}
              />
            )}
          </main>
        </div>
      </div>

      {/* Interactive Deal Detail Drawer / Modal */}
      <VenddDealDrawer
        deal={selectedDeal}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onUpdateStage={handleUpdateStage}
      />
    </div>
  );
};
