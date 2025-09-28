import { ONBOARDING_STEPS } from "@/constants/onboarding-mock";
import { cn } from "@/lib/utils";

interface OnboardingHeaderProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function OnboardingHeader({
  currentStep,
  onStepClick,
}: OnboardingHeaderProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto pb-2">
        {ONBOARDING_STEPS.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div
              key={step.id}
              onClick={() => isCompleted && onStepClick(step.id)}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors duration-200",
                {
                  "bg-primary text-primary-foreground": isActive,
                  "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer":
                    isCompleted,
                  "text-muted-foreground": !isActive && !isCompleted,
                }
              )}
            >
              <step.icon className="h-4 w-4" />
              <span className="text-sm font-medium hidden sm:inline">
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
