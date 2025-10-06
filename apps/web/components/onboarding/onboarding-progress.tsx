import { ONBOARDING_STEPS } from "@/constants/onboarding-mock";
import { Progress } from "../ui/progress";
import { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { onboardingSelector } from "@/features/onboarding/onboardingSlice";

export const OnboardingProgress = () => {
  const { currentStep } = useAppSelector(onboardingSelector);
  const progress = useMemo(
    () => ((currentStep + 1) / ONBOARDING_STEPS.length) * 100,
    [currentStep]
  );

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium">
          Paso {currentStep + 1} de {ONBOARDING_STEPS.length}
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round(progress)}% completado
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};
