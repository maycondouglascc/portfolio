import type { ProcessStep } from "../../data/projects";

type ProcessStepsProps = {
  title?: string;
  steps: ProcessStep[];
};

function ProcessSteps({ title, steps }: ProcessStepsProps) {
  return (
    <div className="w-full">
      {title && (
        <h2 className="mb-6 text-subheading-20-medium font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>
      )}
      <ol className="flex flex-col">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <li key={index} className="flex gap-4">
              {/* Left column: badge + connector line */}
              <div className="flex flex-col items-center">
                <div
                  className="flex shrink-0 items-center justify-center size-10 rounded-full border border-zinc-100 bg-zinc-50 dark:border-zinc-800/40 dark:bg-zinc-800/10"
                  aria-hidden="true"
                >
                  <span className="text-caption-12-medium font-medium text-zinc-500 dark:text-zinc-400">
                    {index + 1}
                  </span>
                </div>
                {!isLast && (
                  <div className="flex-1 w-px border-l border-zinc-200 dark:border-zinc-800/40" />
                )}
              </div>

              {/* Right column: label + description */}
              <div
                className={[
                  "flex flex-col gap-1",
                  isLast ? "pb-0" : "pb-6",
                ].join(" ")}
              >
                <p className="mt-2 text-body-15-medium font-medium text-zinc-900 dark:text-zinc-100">
                  {step.label}
                </p>
                <p className="text-body-15-regular font-normal text-zinc-500 dark:text-zinc-400">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default ProcessSteps;
