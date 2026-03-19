import StatusIcon, { type StatusIconVariant } from "./StatusIcon";

export type HighlightCardProps = {
  variant: StatusIconVariant;
  title: string;
  description: string;
};

function HighlightCard({ variant, title, description }: HighlightCardProps) {
  return (
    <div className="flex h-full min-w-[110px] flex-col items-start gap-2 rounded-md bg-zinc-50 p-4 dark:bg-zinc-800/20">
      <StatusIcon variant={variant} />
      <div className="flex flex-col gap-1 w-full">
        <p className="text-body-15-medium font-semibold text-zinc-900 tabular-nums dark:text-zinc-100">
          {title}
        </p>
        <p className="text-body-15-regular font-regular text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  );
}

export default HighlightCard;
