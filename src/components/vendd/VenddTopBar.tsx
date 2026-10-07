import React from 'react';

interface VenddTopBarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const VenddTopBar: React.FC<VenddTopBarProps> = ({
  activeTab = 'CRM',
  onTabChange,
}) => {
  return (
    <header className="relative flex h-14 w-full items-center justify-between border-b border-zinc-800 bg-[#18181B] px-4 sm:px-6 select-none">
      {/* Left: Logo & Navigation */}
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2">
          <img
            src="/files/cases/vendd-web/vendd-logo.svg"
            alt="Vendd Logo"
            className="h-6 w-5 object-contain"
          />
          <span className="text-body-15-medium font-semibold tracking-tight text-white">
            Vendd
          </span>
        </div>

        <div className="h-4 w-px bg-zinc-700/60" aria-hidden="true" />

        <nav className="flex items-center gap-6 text-sm">
          {(['Pages', 'CRM', 'VSL'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onTabChange?.(tab)}
                className={`relative py-4 text-sm font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tab}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t bg-[#155DFC]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right: User Avatar */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-800/60 px-2.5 py-1 text-xs text-zinc-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Vendd Web v2.4</span>
        </div>

        <button
          type="button"
          aria-label="Perfil do usuário"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#155DFC] text-xs font-semibold text-white shadow-sm ring-2 ring-zinc-700/50 hover:opacity-90 transition-opacity"
        >
          M
        </button>
      </div>
    </header>
  );
};
