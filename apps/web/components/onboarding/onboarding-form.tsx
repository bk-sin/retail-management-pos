"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { ONBOARDING_STEPS } from "@/constants/onboarding-mock";
import {
  OnboardingFormData,
  onboardingSchema,
} from "@/schemas/onboarding-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { OnboardingHeader } from "./onboarding-header";
import { OnboardingNavigation } from "./onboarding-navigation";
import { OnboardingProgress } from "./onboarding-progress";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  goToStep as goToStepAction,
  onboardingSelector,
  updateData as updateDataAction,
} from "@/features/onboarding/onboardingSlice";

export default function BusinessOnboardingForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentStep, data } = useAppSelector(onboardingSelector);
  const stepConfig = ONBOARDING_STEPS[currentStep];

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: data,
  });

  const onSubmit = async (formData: OnboardingFormData) => {
    try {
      console.log("Finalizando configuración:", formData);
      dispatch(updateDataAction(formData));
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/dashboard");
    } catch (error) {
      console.error("Error al finalizar:", error);
    } finally {
    }
  };

  const goToStep = (step: number) => {
    dispatch(goToStepAction(step));
  };

  if (!stepConfig) {
    return <div>Error: Paso no encontrado</div>;
  }

  const StepComponent = stepConfig.component;

  const stepProps = {
    control: form.control,
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-balance mb-2">
            Configuración de tu Negocio
          </h1>
          <p className="text-muted-foreground text-pretty">
            Configura los datos esenciales de tu empresa para comenzar a
            facturar
          </p>
        </div>
        <OnboardingHeader currentStep={currentStep} onStepClick={goToStep} />
        <OnboardingProgress />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <stepConfig.icon className="h-5 w-5" />
                  {stepConfig.title}
                </CardTitle>
                <CardDescription>{stepConfig.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <StepComponent {...stepProps} />
              </CardContent>
            </Card>
            <OnboardingNavigation form={form} stepConfig={stepConfig} />
          </form>
        </Form>
      </div>
    </div>
  );
}
