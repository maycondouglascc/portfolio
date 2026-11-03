export type PipelineStage = 'aguardando' | 'contato_realizado' | 'reuniao_agendada' | 'ganho' | 'perdido';

export type DealStatus = 'Aguardando' | 'Contato Realizado' | 'Reunião Agendada' | 'Ganho' | 'Perdido';

export interface CartProduct {
  id: string;
  name: string;
  status: 'Aguardando Contato' | 'Adicionado ao Carrinho' | 'Em Andamento' | 'Finalizado' | 'Cancelado';
  price: number;
  priceFormatted: string;
  commission: number;
  commissionFormatted: string;
  date: string;
}

export interface ActivityEvent {
  id: string;
  type: 'compra_concluida' | 'compra_iniciada' | 'compra_expirada' | 'compra_cancelada' | 'email_enviado' | 'whatsapp_enviado' | 'padrao';
  title: string;
  time: string;
  actor: 'Usuário' | 'Sistema';
  action: string;
  description?: string;
}

export interface ActivityGroup {
  date: string;
  countLabel: string;
  events: ActivityEvent[];
}

export interface ChatMessage {
  id: string;
  sender: 'lead' | 'agent' | 'bot';
  text: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
}

export interface Deal {
  id: string;
  clientName: string;
  avatarUrl: string;
  stage: PipelineStage;
  statusLabel: DealStatus;
  dueLabel: string;
  dueUrgency: 'urgent' | 'warning' | 'normal';
  mainProduct: string;
  extraProductsCount?: number;
  totalValue: number;
  totalValueFormatted: string;
  commission: number;
  commissionFormatted: string;
  startDate: string;
  platform: 'Hotmart' | 'Kiwify' | 'Vendd Pay';
  phone?: string;
  email?: string;
  createdAtDaysAgo: number;
  cartProducts: CartProduct[];
  activities: ActivityGroup[];
  chatHistory: ChatMessage[];
  notes?: string;
}
