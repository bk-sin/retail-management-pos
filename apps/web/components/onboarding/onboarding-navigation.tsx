import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { UseFormReturn } from "react-hook-form";
import { OnboardingFormData } from "@/schemas/onboarding-schema";
import { ONBOARDING_STEPS, StepConfig } from "@/constants/onboarding-mock";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  nextStep,
  prevStep,
  onboardingSelector,
  updateData,
} from "@/features/onboarding/onboarding.slice";

type OnboardingNavigationProps = {
  form: UseFormReturn<OnboardingFormData>;
  stepConfig: StepConfig;
};

export const OnboardingNavigation = ({
  form,
  stepConfig,
}: OnboardingNavigationProps) => {
  const dispatch = useAppDispatch();
  const { currentStep } = useAppSelector(onboardingSelector);
  const isSubmitting = form.formState.isSubmitting;
  const isLastStep = useMemo(
    () => currentStep === ONBOARDING_STEPS.length - 1,
    [currentStep]
  );

  const handleNext = async () => {
    const fieldsToValidate = stepConfig.fields || [];
    const isValid = await form.trigger(fieldsToValidate);

    if (isValid) {
      dispatch(updateData(form.getValues()));
      dispatch(nextStep());
    }
  };

  const handlePrev = () => {
    dispatch(prevStep());
  };

  return (
    <div className="flex justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={handlePrev}
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
