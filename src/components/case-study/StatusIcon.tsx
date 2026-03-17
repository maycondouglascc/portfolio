import { Check, Info, AlertTriangle } from "react-feather";

export type StatusIconVariant = "positive" | "negative" | "neutral";

type StatusIconProps = {
  variant: StatusIconVariant;
  className?: string;
};

const bgMap: Record<StatusIconVariant, string> = {
  positive: "bg-lime-500/20",
  negative: "bg-red-500/20",
  neutral: "bg-gray-500/20",
};

const labelMap: Record<StatusIconVariant, string> = {
  positive: "Positive",
  negative: "Negative",
  neutral: "Neutral",
};

function StatusIcon({ variant, className }: StatusIconProps) {
  const bg = bgMap[variant];
  const iconMap: Record<StatusIconVariant, string> = {
    positive: "text-lime-600",
    negative: "text-red-600",
    neutral: "text-gray-600",
  };
  const iconClassName = iconMap[variant];

  return (
    <span
      className={[
        "inline-flex shrink-0 items-center justify-center rounded-full size-10",
        bg,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="img"
      aria-label={labelMap[variant]}
    >
      {variant === "positive" && (
        <Check
          size={16}
          strokeWidth={2}
          className={iconClassName}
          aria-hidden="true"
        />
      )}
      {variant === "negative" && (
        <AlertTriangle
          size={16}
          strokeWidth={2}
          className={iconClassName}
          aria-hidden="true"
        />
      )}
      {variant === "neutral" && (
        <Info
          size={16}
          strokeWidth={2}
          className={iconClassName}
          aria-hidden="true"
        />
      )}
    </span>
  );
}

export default StatusIcon;
