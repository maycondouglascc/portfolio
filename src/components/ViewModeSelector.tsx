import { useLanguage } from "../context/LanguageContext";
import { useViewMode } from "../context/ViewModeContext";
import { VIEW_MODES, type ViewMode } from "../data/projects";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const labelKeys: Record<
  ViewMode,
  "viewMode.visual" | "viewMode.overview" | "viewMode.detailed"
> = {
  visual: "viewMode.visual",
  overview: "viewMode.overview",
  detailed: "viewMode.detailed",
};

const descriptionKeys: Record<
  ViewMode,
  | "viewMode.visualDescription"
  | "viewMode.overviewDescription"
  | "viewMode.detailedDescription"
> = {
  visual: "viewMode.visualDescription",
  overview: "viewMode.overviewDescription",
  detailed: "viewMode.detailedDescription",
};

export default function ViewModeSelector() {
  const { t } = useLanguage();
  const { viewMode, setViewMode } = useViewMode();

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex flex-col gap-2 w-fit">
        <span className="text-caption-14-medium font-medium text-zinc-900 dark:text-zinc-100">
          {t("viewMode.selectorLabel")}
        </span>
        <div
          role="radiogroup"
          aria-label={t("viewMode.selectorLabel")}
          className="inline-flex items-center gap-0.5 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-900"
        >
          {VIEW_MODES.map((mode) => {
            const isActive = viewMode === mode;
            return (
              <Tooltip key={mode}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    onClick={() => setViewMode(mode)}
                    className={`flex-1 rounded-md px-2.5 h-8 text-caption-12-regular font-medium transition-colors duration-200 whitespace-nowrap ${
                      isActive
                        ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100"
                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    }`}
                  >
                    {t(labelKeys[mode])}
                  </button>
                </TooltipTrigger>
                <TooltipContent>{t(descriptionKeys[mode])}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
