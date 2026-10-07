import React, { useState } from 'react';
import {
  Home,
  Monitor,
  DollarSign,
  Filter,
  Link as LinkIcon,
  Globe,
  Mail,
  MessageSquare,
  Repeat,
  HelpCircle,
  ShoppingBag,
  ChevronDown,
  Check,
  Plus,
} from 'react-feather';

interface VenddSidebarProps {
  activeMenuItem?: string;
  onSelectMenuItem?: (item: string) => void;
  className?: string;
}

export const VenddSidebar: React.FC<VenddSidebarProps> = ({
  activeMenuItem = 'Negócios',
  onSelectMenuItem,
  className = '',
}) => {
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState('Agência Nova');

  const workspaces = [
    { id: 'w1', name: 'Agência Nova', active: true, color: 'bg-blue-600' },
    { id: 'w2', name: 'E-commerce Pro', active: false, color: 'bg-emerald-600' },
    { id: 'w3', name: 'Infoprodutos Brasil', active: false, color: 'bg-purple-600' },
  ];

  const handleSelectWorkspace = (name: string) => {
    setSelectedWorkspace(name);
    setIsWorkspaceMenuOpen(false);
  };

  return (
    <aside
      className={`relative flex w-64 flex-col border-r border-zinc-800 bg-[#18181B] text-zinc-300 select-none ${className}`}
    >
      {/* Workspace Switcher */}
      <div className="relative border-b border-zinc-800/80 p-3">
        <button
          type="button"
          onClick={() => setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-zinc-700/60 bg-[#131316] p-2 text-left transition-colors hover:border-zinc-600 hover:bg-zinc-800/50"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#155DFC] text-xs font-bold text-white shadow">
              AN
            </div>
            <div className="truncate">
              <span className="block truncate text-xs font-semibold text-white">
                {selectedWorkspace}
              </span>
              <span className="block text-[10px] text-zinc-400">
                Workspace Ativo
              </span>
            </div>
          </div>
          <ChevronDown
            size={14}
            className={`text-zinc-400 transition-transform ${
              isWorkspaceMenuOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Workspace Dropdown (Exploration of Figma Shot 2) */}
        {isWorkspaceMenuOpen && (
          <div className="absolute left-3 right-3 top-16 z-30 rounded-lg border border-zinc-700 bg-[#18181B] p-1.5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Workspaces da Conta
            </div>
            {workspaces.map((ws) => (
              <button
                key={ws.id}
                type="button"
                onClick={() => handleSelectWorkspace(ws.name)}
                className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs text-zinc-200 transition-colors hover:bg-zinc-800"
              >
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${ws.color}`} />
                  <span className={selectedWorkspace === ws.name ? 'font-semibold text-white' : ''}>
                    {ws.name}
                  </span>
                </div>
                {selectedWorkspace === ws.name && (
                  <Check size={14} className="text-[#155DFC]" />
                )}
              </button>
            ))}
            <div className="my-1 border-t border-zinc-800" />
            <button
              type="button"
              onClick={() => setIsWorkspaceMenuOpen(false)}
              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              <Plus size={14} />
              <span>Novo Workspace</span>
            </button>
          </div>
        )}
      </div>

      {/* Navigation Menus */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-5 text-xs">
        {/* Visão Geral */}
        <div>
          <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Visão Geral
          </div>
          <ul className="space-y-0.5">
            <li>
              <button
                type="button"
                onClick={() => onSelectMenuItem?.('Início')}
                className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 transition-colors ${
                  activeMenuItem === 'Início'
                    ? 'bg-zinc-800/80 font-medium text-white'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                }`}
              >
                <Home size={15} />
                <span>Início</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectMenuItem?.('Páginas')}
                className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 transition-colors ${
                  activeMenuItem === 'Páginas'
                    ? 'bg-zinc-800/80 font-medium text-white'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                }`}
              >
                <Monitor size={15} />
                <span>Páginas</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Gestão */}
        <div>
          <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Gestão
          </div>
          <ul className="space-y-0.5">
            <li>
              <button
                type="button"
                onClick={() => onSelectMenuItem?.('Negócios')}
                className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 transition-colors ${
                  activeMenuItem === 'Negócios'
                    ? 'bg-[#155DFC] font-semibold text-white shadow-sm'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                }`}
              >
                <DollarSign size={15} />
                <span>Negócios (CRM)</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectMenuItem?.('Captação de leads')}
                className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 transition-colors ${
                  activeMenuItem === 'Captação de leads'
                    ? 'bg-zinc-800/80 font-medium text-white'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                }`}
              >
                <Filter size={15} />
                <span>Captação de leads</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectMenuItem?.('Campanhas')}
                className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 transition-colors ${
                  activeMenuItem === 'Campanhas'
                    ? 'bg-zinc-800/80 font-medium text-white'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                }`}
              >
                <LinkIcon size={15} />
                <span>Campanhas</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectMenuItem?.('Domínios')}
                className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 transition-colors ${
                  activeMenuItem === 'Domínios'
                    ? 'bg-zinc-800/80 font-medium text-white'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                }`}
              >
                <Globe size={15} />
                <span>Domínios</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectMenuItem?.('Mensagem padrão')}
                className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 transition-colors ${
                  activeMenuItem === 'Mensagem padrão'
                    ? 'bg-zinc-800/80 font-medium text-white'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                }`}
              >
                <Mail size={15} />
                <span>Mensagem padrão</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Ferramentas */}
        <div>
          <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Ferramentas
          </div>
          <ul className="space-y-0.5">
            <li>
              <button
                type="button"
                onClick={() => onSelectMenuItem?.('Vendd GPT')}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 transition-colors ${
                  activeMenuItem === 'Vendd GPT'
                    ? 'bg-purple-600/20 text-purple-300 font-semibold border border-purple-500/30'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare size={15} className="text-purple-400" />
                  <span>Vendd GPT</span>
                </div>
                <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-[9px] font-medium text-purple-300">
                  IA
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectMenuItem?.('Integrações')}
                className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 transition-colors ${
                  activeMenuItem === 'Integrações'
                    ? 'bg-zinc-800/80 font-medium text-white'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                }`}
              >
                <Repeat size={15} />
                <span>Integrações</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectMenuItem?.('Tutoriais')}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 transition-colors ${
                  activeMenuItem === 'Tutoriais'
                    ? 'bg-zinc-800/80 font-medium text-white'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle size={15} />
                  <span>Tutoriais</span>
                </div>
                <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-blue-300">
                  Novo
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectMenuItem?.('Temas')}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 transition-colors ${
                  activeMenuItem === 'Temas'
                    ? 'bg-zinc-800/80 font-medium text-white'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag size={15} />
                  <span>Temas</span>
                </div>
                <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-blue-300">
                  Novo
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};
