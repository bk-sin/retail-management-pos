import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { OnboardingFormData } from "@/schemas/onboarding-schema";
import { useGetPaymentMethodsQuery } from "@/features/payment-methods/payment-methods.api";

export type PaymentMethodStepProps = {
  control: Control<OnboardingFormData>;
};

export const PaymentMethodStep = ({ control }: PaymentMethodStepProps) => {
  const { data: paymentMethods } = useGetPaymentMethodsQuery();
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Configura los métodos de pago disponibles
      </h3>
      <FormField
        control={control}
        name="selectedPaymentMethods"
        render={() => (
          <FormItem>
            <div className="grid gap-4">
              {paymentMethods?.length &&
                paymentMethods.map((method) => (
                  <FormField
                    key={method.id}
                    control={control}
                    name="selectedPaymentMethods"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={method.id}
                          className="flex items-center space-x-3 space-y-0 p-4 border rounded-lg"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(method.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, method.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: number) => value !== method.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <FormLabel className="font-medium cursor-pointer">
                                {method.name}
                              </FormLabel>
                              {method.isDefault && (
                                <Badge variant="secondary">Por defecto</Badge>
                              )}
                              {method.requiresAuth && (
                                <Badge variant="outline">
                                  Requiere autorización
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {method.description}
                            </p>
                            {method.processingFee && (
                              <p className="text-sm text-muted-foreground">
                                Comisión:{" "}
                                {(Number(method.processingFee) * 100).toFixed(
                                  2
                                )}
                                %
                              </p>
                            )}
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
