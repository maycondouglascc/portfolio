import React, { useState } from 'react';
import {
  ChevronLeft,
  MoreVertical,
  Grid,
  Package,
  MessageSquare,
  Users,
  Plus,
  Send,
  ChevronDown,
  ChevronUp,
  Copy,
} from 'react-feather';
import type { Deal, PipelineStage, ChatMessage } from './types';

interface VenddDealDrawerProps {
  deal: Deal | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStage: (dealId: string, newStage: PipelineStage) => void;
}

const STAGES: { id: PipelineStage; label: string }[] = [
  { id: 'aguardando', label: 'Novos' },
  { id: 'contato_realizado', label: 'Em Andamento' },
  { id: 'reuniao_agendada', label: 'Ganho' },
  { id: 'perdido', label: 'Perdido' },
];

export const VenddDealDrawer: React.FC<VenddDealDrawerProps> = ({
  deal,
  isOpen,
  onClose,
  onUpdateStage,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'chat' | 'contacts'>('overview');
  const [isAllCollapsed, setIsAllCollapsed] = useState(false);
  const [newChatText, setNewChatText] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(deal?.chatHistory || []);
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [newActivityNote, setNewActivityNote] = useState('');

  // Sync chat if deal changes
  React.useEffect(() => {
    if (deal) {
      setChatMessages(deal.chatHistory);
    }
  }, [deal]);

  if (!isOpen || !deal) return null;

  const handleSendMessage = () => {
    if (!newChatText.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'agent',
      text: newChatText,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setNewChatText('');
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'compra_concluida':
        return '/files/cases/vendd-web/event-compra-concluida.svg';
      case 'compra_iniciada':
        return '/files/cases/vendd-web/event-compra-iniciada.svg';
      case 'compra_expirada':
        return '/files/cases/vendd-web/event-compra-expirada.svg';
      case 'compra_cancelada':
        return '/files/cases/vendd-web/event-compra-cancelada.svg';
      case 'email_enviado':
        return '/files/cases/vendd-web/event-email-enviado.svg';
      case 'whatsapp_enviado':
        return '/files/cases/vendd-web/event-whatsapp-enviado.svg';
      default:
        return '/files/cases/vendd-web/event-padrao.svg';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm animate-in fade-in select-none">
      {/* Drawer Container */}
      <div className="relative flex h-full w-full max-w-4xl flex-col bg-[#18181B] border-l border-zinc-800 shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Top Header */}
        <div className="flex h-16 items-center justify-between border-b border-zinc-800 px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2.5">
              <img
                src={deal.avatarUrl}
                alt={deal.clientName}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
                className="h-8 w-8 rounded-full object-cover ring-1 ring-zinc-700"
              />
              <h2 className="text-base font-semibold text-white">
                {deal.clientName}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="block text-[10px] uppercase tracking-wider text-zinc-400">
                Valor do Negócio
              </span>
              <span className="text-sm font-bold text-white">
                {deal.totalValueFormatted}
              </span>
            </div>

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800/80 text-zinc-400 hover:text-white"
            >
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Pipeline Status Progress Stepper */}
        <div className="border-b border-zinc-800 bg-[#131316] px-6 py-3">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-300">Status do Funil</span>
            <span className="text-zinc-500">
              Criado há {deal.createdAtDaysAgo} dias • {deal.platform}
            </span>
          </div>

          {/* Stepper Chevrons */}
          <div className="grid grid-cols-4 gap-2">
            {STAGES.map((s) => {
              const isCurrent =
                (s.id === 'aguardando' && deal.stage === 'aguardando') ||
                (s.id === 'contato_realizado' && deal.stage === 'contato_realizado') ||
                (s.id === 'reuniao_agendada' && deal.stage === 'reuniao_agendada') ||
                (s.id === 'perdido' && deal.stage === 'perdido');

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onUpdateStage(deal.id, s.id)}
                  className={`flex h-9 items-center justify-center rounded-md text-xs font-semibold transition-all ${
                    isCurrent
                      ? 'bg-[#155DFC] text-white shadow-md'
                      : 'border border-zinc-700/80 bg-zinc-800/50 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
                  }`}
                >
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Body Container: Submenu + Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Submenu (matching Figma sideMenu) */}
          <div className="w-48 shrink-0 border-r border-zinc-800 bg-[#18181B] p-3 space-y-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
              }`}
            >
              <Grid size={15} />
              <span>Visão Geral</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 font-medium transition-colors ${
                activeTab === 'products'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package size={15} />
                <span>Produtos</span>
              </div>
              <span className="rounded bg-zinc-700 px-1.5 py-0.2 text-[10px] text-zinc-300">
                {deal.cartProducts.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 font-medium transition-colors ${
                activeTab === 'chat'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare size={15} />
                <span>Conversas</span>
              </div>
              {chatMessages.length > 0 && (
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('contacts')}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 font-medium transition-colors ${
                activeTab === 'contacts'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
              }`}
            >
              <Users size={15} />
              <span>Contatos</span>
            </button>
          </div>

          {/* Right Main Content */}
          <div className="flex-1 overflow-y-auto bg-[#131316] p-6">
            {/* TAB: VISÃO GERAL & ATIVIDADES */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">
                    Linha do Tempo de Atividades
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsAllCollapsed(!isAllCollapsed)}
                    className="flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300 hover:text-white"
                  >
                    <span>{isAllCollapsed ? 'Expandir todos' : 'Colapsar todos'}</span>
                    {isAllCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                  </button>
                </div>

                {/* Activity Groups */}
                <div className="space-y-4">
                  {deal.activities.map((group, gIdx) => (
                    <div
                      key={`group-${gIdx}`}
                      className="rounded-xl border border-zinc-800 bg-[#18181B] p-4 shadow-sm"
                    >
                      <div className="mb-3 flex items-center justify-between border-b border-zinc-800/80 pb-2 text-xs">
                        <span className="font-bold text-white">{group.date}</span>
                        <span className="text-zinc-400">{group.countLabel}</span>
                      </div>

                      {!isAllCollapsed && (
                        <div className="space-y-3">
                          {group.events.map((ev) => (
                            <div
                              key={ev.id}
                              className="flex items-start gap-3 rounded-lg border border-zinc-800/80 bg-[#131316] p-3 text-xs"
                            >
                              <img
                                src={getEventIcon(ev.type)}
                                alt={ev.title}
                                className="h-7 w-7 shrink-0 object-contain"
                              />

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-semibold text-zinc-100">
                                    {ev.title}
                                  </span>
                                  <span className="text-[11px] text-zinc-400">
                                    {ev.time}
                                  </span>
                                </div>

                                <div className="mt-1 flex items-center gap-2 text-[11px] text-zinc-400">
                                  <span className="rounded bg-zinc-800 px-1.5 py-0.2 font-medium text-zinc-300">
                                    {ev.actor}
                                  </span>
                                  <span className="truncate">{ev.action}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Activity Input */}
                {isAddingActivity ? (
                  <div className="rounded-xl border border-[#155DFC]/60 bg-[#18181B] p-4 space-y-3">
                    <span className="block text-xs font-semibold text-white">
                      Registrar Nova Atividade / Nota
                    </span>
                    <textarea
                      placeholder="Descreva a interação com o cliente..."
                      value={newActivityNote}
                      onChange={(e) => setNewActivityNote(e.target.value)}
                      className="w-full rounded-lg border border-zinc-700 bg-[#131316] p-2.5 text-xs text-white placeholder-zinc-500 focus:border-[#155DFC] focus:outline-none"
                      rows={3}
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingActivity(false)}
                        className="rounded px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!newActivityNote.trim()) return;
                          deal.activities.unshift({
                            date: 'Hoje',
                            countLabel: '1 atividade',
                            events: [
                              {
                                id: `ev-${Date.now()}`,
                                type: 'whatsapp_enviado',
                                title: 'Nota Adicionada',
                                time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                                actor: 'Usuário',
                                action: newActivityNote,
                              },
                            ],
                          });
                          setNewActivityNote('');
                          setIsAddingActivity(false);
                        }}
                        className="rounded bg-[#155DFC] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-600"
                      >
                        Salvar Atividade
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            {/* TAB: PRODUTOS */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">
                    Produtos Abandonados no Carrinho
                  </h3>
                  <span className="text-xs text-zinc-400">
                    Plataforma: {deal.platform}
                  </span>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-[#18181B] divide-y divide-zinc-800/80">
                  {deal.cartProducts.map((prod) => (
                    <div key={prod.id} className="p-4 flex items-center justify-between text-xs">
                      <div>
                        <span className="block font-medium text-white">{prod.name}</span>
                        <span className="mt-0.5 inline-block rounded bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400">
                          {prod.status} • Abandonado em {prod.date}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="block font-bold text-white">{prod.priceFormatted}</span>
                        <span className="text-[11px] text-emerald-400">Comissão: {prod.commissionFormatted}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-zinc-800 bg-[#18181B] p-4 text-xs space-y-2">
                  <span className="font-semibold text-white">Link de Recuperação Rápida</span>
                  <div className="flex items-center gap-2">
                    <input
                      readOnly
                      value={`https://checkout.vendd.com.br/recover?lead=${deal.id}&token=rec_89a712`}
                      className="w-full rounded bg-[#131316] border border-zinc-700 px-3 py-1.5 text-zinc-300 font-mono text-[11px]"
                    />
                    <button
                      type="button"
                      title="Copiar link"
                      className="flex items-center gap-1.5 rounded bg-[#155DFC] px-3 py-1.5 text-white font-medium hover:bg-blue-600 shrink-0"
                    >
                      <Copy size={13} />
                      <span>Copiar</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: CONVERSAS (WhatsApp Recovery Simulator) */}
            {activeTab === 'chat' && (
              <div className="flex h-full flex-col">
                <div className="mb-3 flex items-center justify-between border-b border-zinc-800 pb-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-semibold text-white">Simulador WhatsApp Vendd</span>
                  </div>
                  <span className="text-zinc-400">{deal.phone || '+55 11 98765-4321'}</span>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                  {chatMessages.length === 0 ? (
                    <div className="py-12 text-center text-xs text-zinc-500">
                      Nenhuma mensagem enviada ainda. Envie a primeira mensagem de recuperação abaixo!
                    </div>
                  ) : (
                    chatMessages.map((msg) => {
                      const isMe = msg.sender === 'agent' || msg.sender === 'bot';
                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs ${
                              isMe
                                ? 'bg-[#155DFC] text-white rounded-tr-none'
                                : 'bg-[#27272A] text-zinc-100 rounded-tl-none'
                            }`}
                          >
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                            <span
                              className={`mt-1 block text-right text-[10px] ${
                                isMe ? 'text-blue-200' : 'text-zinc-400'
                              }`}
                            >
                              {msg.time}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Chat Input */}
                <div className="mt-4 flex items-center gap-2 border-t border-zinc-800 pt-3">
                  <input
                    type="text"
                    placeholder="Digite uma mensagem de recuperação para o cliente..."
                    value={newChatText}
                    onChange={(e) => setNewChatText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 rounded-lg border border-zinc-700 bg-[#18181B] px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-[#155DFC] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#155DFC] text-white hover:bg-blue-600 transition-colors"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* TAB: CONTATOS */}
            {activeTab === 'contacts' && (
              <div className="space-y-4 text-xs">
                <h3 className="text-sm font-semibold text-white">Dados do Contato</h3>

                <div className="rounded-xl border border-zinc-800 bg-[#18181B] p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                    <span className="text-zinc-400">Nome Completo</span>
                    <span className="font-semibold text-white">{deal.clientName}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                    <span className="text-zinc-400">E-mail</span>
                    <span className="text-zinc-200">{deal.email || 'cliente@email.com'}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                    <span className="text-zinc-400">Telefone / WhatsApp</span>
                    <span className="text-zinc-200">{deal.phone || '+55 11 98765-4321'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Tags de Segmentação</span>
                    <div className="flex gap-1.5">
                      <span className="rounded bg-rose-500/10 px-2 py-0.5 text-[10px] text-rose-300 border border-rose-500/20">
                        Pix Expirado
                      </span>
                      <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-300">
                        Lead Quente
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Action Button (matching Figma FAB #93:5174) */}
        <button
          type="button"
          onClick={() => {
            setActiveTab('overview');
            setIsAddingActivity(true);
          }}
          className="absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#155DFC] text-white shadow-xl hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all"
          title="Adicionar Atividade ou Nota"
        >
          <Plus size={22} />
        </button>
      </div>
    </div>
  );
};
