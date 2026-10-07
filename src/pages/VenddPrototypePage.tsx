import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'react-feather';
import Wrapper from '../components/Wrapper';
import { VenddPrototype } from '../components/vendd/VenddPrototype';
import { useLanguage } from '../context/LanguageContext';

export const VenddPrototypePage: React.FC = () => {
  const { language } = useLanguage();
  const isPt = language === 'pt';

  return (
    <Wrapper>
      <div className="mx-auto max-w-[1300px] py-8 space-y-6">
        {/* Navigation Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            <span>{isPt ? 'Voltar ao Portfólio' : 'Back to Portfolio'}</span>
          </Link>

          <Link
            to="/projects/vendd-web"
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/80 px-3 py-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            <span>{isPt ? 'Ver Case Study Completo' : 'View Full Case Study'}</span>
            <ExternalLink size={13} />
          </Link>
        </div>

        {/* Page Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#155DFC]/30 bg-[#155DFC]/10 px-3 py-1 text-xs font-semibold text-[#155DFC] dark:text-blue-400">
            <span>Figma Node 212-11891 • Base de Protótipos</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {isPt
              ? 'Vendd Web — Protótipos Interativos & Desdobramentos'
              : 'Vendd Web — Interactive Prototypes & System Explorations'}
          </h1>
          <p className="max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
            {isPt
              ? 'Ambiente interativo com os desdobramentos de layout da Vendd Web. Alterne entre Quadro Kanban, Tabela com produtos aninhados, Detalhes de Negócio com linha do tempo de atividades, Vendd GPT e Simulador Mobile.'
              : 'Interactive sandbox exploring Vendd Web layout extensions. Switch between the Kanban Board, nested products Table, Deal Drawer with activity timeline, Vendd GPT, and Mobile device simulator.'}
          </p>
        </div>

        {/* Master Prototype Component */}
        <div className="pt-2">
          <VenddPrototype />
        </div>
      </div>
    </Wrapper>
  );
};

export default VenddPrototypePage;
