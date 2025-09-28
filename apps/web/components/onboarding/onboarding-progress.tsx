import { ONBOARDING_STEPS } from "@/constants/onboarding-mock";
import { Progress } from "../ui/progress";
import useOnboardingStore from "./onboarding-store";
import { useMemo } from "react";

export const OnboardingProgress = () => {
  const { currentStep } = useOnboardingStore();
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
