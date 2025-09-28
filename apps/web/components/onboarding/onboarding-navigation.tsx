import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import useOnboardingStore from "./onboarding-store";
import { UseFormReturn } from "react-hook-form";
import { OnboardingFormData } from "@/schemas/onboarding-schema";
import { ONBOARDING_STEPS, StepConfig } from "@/constants/onboarding-mock";
import { useMemo } from "react";

type OnboardingNavigationProps = {
  form: UseFormReturn<OnboardingFormData>;
  stepConfig: StepConfig;
};

export const OnboardingNavigation = ({
  form,
  stepConfig,
}: OnboardingNavigationProps) => {
  const { currentStep, prevStep, updateData, nextStep } = useOnboardingStore();
  const isSubmitting = form.formState.isSubmitting;
  const isLastStep = useMemo(
    () => currentStep === ONBOARDING_STEPS.length - 1,
    [currentStep]
  );
  const handleNext = async () => {
    const fieldsToValidate = stepConfig.fields || [];
    const isValid = await form.trigger(fieldsToValidate);

    if (isValid) {
      updateData(form.getValues());
      nextStep();
    }
  };

  return (
    <div className="flex justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={prevStep}
        disabled={currentStep === 0}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
      </Button>
      {isLastStep ? (
        <Button type="submit" disabled={isSubmitting}>
          <CheckCircle className="mr-2 h-4 w-4" />
          {isSubmitting ? "Finalizando..." : "Finalizar Configuración"}
        </Button>
      ) : (
        <Button type="button" onClick={handleNext}>
          Siguiente <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
