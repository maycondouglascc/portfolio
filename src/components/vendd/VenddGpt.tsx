import React, { useState } from 'react';
import {
  Send,
  Copy,
  Check,
} from 'react-feather';

const SparklesIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
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

interface AIModel {
  id: string;
  name: string;
  icon: string;
  provider: string;
}

const MODELS: AIModel[] = [
  { id: 'gemini', name: 'Gemini 1.5 Pro', icon: '/files/cases/vendd-web/icon-gemini.svg', provider: 'Google' },
  { id: 'claude', name: 'Claude 3.5 Sonnet', icon: '/files/cases/vendd-web/icon-anthropic.svg', provider: 'Anthropic' },
  { id: 'openai', name: 'GPT-4o', icon: '/files/cases/vendd-web/icon-openai.svg', provider: 'OpenAI' },
];

export const VenddGpt: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>('gemini');
  const [credits, setCredits] = useState<number>(1450);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const [messages, setMessages] = useState<{ id: string; role: 'user' | 'assistant'; text: string }[]>([
    {
      id: 'm1',
      role: 'user',
      text: 'Como recuperar um cliente cujo Pix expirou ontem no curso English Speed Faster?',
    },
    {
      id: 'm2',
      role: 'assistant',
      text: `Aqui está um roteiro altamente eficaz testado para recuperação de Pix expirado:

"Olá, [Nome do Cliente]! Tudo bem?

Vi que você tentou garantir sua vaga no *English Speed Faster* ontem via Pix, mas o código acabou expirando antes da compensação.

Para que você não perca o bônus de conversação e o desconto especial da turma, gerei uma nova chave Pix exclusiva válida pelas próximas 2 horas:

🔗 *Link com valor reservado:* vendd.link/pix-reserva-772

Se tiver qualquer problema com o banco ou preferir passar em 2 cartões, é só me responder por aqui que eu te ajudo na hora!"`,
    },
  ]);

  const quickPrompts = [
    'Mensagem amigável para carrinho abandonado',
    'Oferecer desconto de 10% para fechar hoje',
    'Argumentos para contornar objeção de preço',
    'Script de áudio curto para WhatsApp',
  ];

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg = { id: `u-${Date.now()}`, role: 'user' as const, text: promptText };
    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsGenerating(true);
    setCredits((prev) => Math.max(0, prev - 15));

    setTimeout(() => {
      let replyText = '';
      if (promptText.toLowerCase().includes('desconto')) {
        replyText = `Aqui está uma mensagem para envio de cupom com senso de urgência:\n\n"Oi, [Nome]! Tudo bem por aí?\n\nConversei com a nossa coordenação e liberei um cupom exclusivo de 10% de desconto (*DESCONTO10*) para você entrar hoje no curso.\n\n👉 Aproveite o link atualizado: vendd.link/oferta-exclusiva\n\nEssa condição expira hoje às 23:59. Te vejo na área de membros!"`;
      } else if (promptText.toLowerCase().includes('carrinho')) {
        replyText = `Script direto para carrinho abandonado:\n\n"Olá, [Nome]! Percebi que você quase finalizou seu pedido do [Produto], mas faltou um passinho.\n\nAconteceu algum problema na página de pagamento? Se precisar de ajuda para parcelar ou pagar no boleto/Pix, estou à disposição!"`;
      } else {
        replyText = `Sugestão gerada pelo modelo selecionado:\n\n"Olá! Separamos sua inscrição com condições facilitadas de parcelamento. Acesse o link oficial para revisar seu pedido: vendd.link/checkout-facil. Qualquer dúvida, estou por aqui!"`;
      }

      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: 'assistant', text: replyText },
      ]);
      setIsGenerating(false);
    }, 800);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#131316] p-4 sm:p-6 select-none">
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-zinc-800 bg-[#18181B] shadow-2xl">
        {/* Top Bar inside Vendd GPT */}
        <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 px-6 py-3.5 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <SparklesIcon size={16} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Vendd GPT</h2>
              <span className="text-[11px] text-zinc-400">
                Assistente de IA para Recuperação de Vendas
              </span>
            </div>
          </div>

          {/* Model Selector & Credit Balance (matching Figma Desktop - 4 #93:5203) */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
              <img
                src="/files/cases/vendd-web/icon-coin.svg"
                alt="Coin"
                className="h-3.5 w-3.5"
              />
              <span>{credits} créditos</span>
            </div>

            <div className="flex items-center gap-1 rounded-lg border border-zinc-700 bg-[#131316] p-1">
              {MODELS.map((model) => (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => setSelectedModel(model.id)}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    selectedModel === model.id
                      ? 'bg-zinc-800 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <img src={model.icon} alt={model.name} className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{model.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => {
            const isMe = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-xl p-4 text-xs leading-relaxed ${
                    isMe
                      ? 'bg-[#155DFC] text-white rounded-tr-none'
                      : 'bg-[#27272A] text-zinc-100 rounded-tl-none border border-zinc-700/80 shadow'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {!isMe && (
                    <div className="mt-3 flex items-center justify-end border-t border-zinc-700/60 pt-2">
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="flex items-center gap-1.5 rounded bg-zinc-800 px-2.5 py-1 text-[11px] font-medium text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check size={12} className="text-emerald-400" />
                            <span className="text-emerald-400">Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Copiar Mensagem</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isGenerating && (
            <div className="flex items-center gap-2 text-xs text-purple-400 animate-pulse">
              <SparklesIcon size={14} />
              <span>Vendd GPT gerando copy personalizada...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts Chips */}
        <div className="border-t border-zinc-800/80 bg-[#131316] px-6 py-2.5">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="shrink-0 text-[11px] font-medium text-zinc-500">
              Sugestões:
            </span>
            {quickPrompts.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendPrompt(chip)}
                className="shrink-0 rounded-full border border-zinc-700 bg-zinc-800/80 px-3 py-1 text-[11px] text-zinc-300 hover:border-[#155DFC] hover:text-white transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Query Input */}
        <div className="border-t border-zinc-800 bg-[#18181B] p-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Peça à IA para redigir um roteiro, calcular desconto ou analisar lead..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt(inputQuery)}
              className="flex-1 rounded-lg border border-zinc-700 bg-[#131316] px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-[#155DFC] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleSendPrompt(inputQuery)}
              disabled={isGenerating || !inputQuery.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#155DFC] text-white hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
