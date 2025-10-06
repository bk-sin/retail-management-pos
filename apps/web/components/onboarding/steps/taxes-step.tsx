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
import { useGetTaxesQuery } from "@/features/taxes/taxes.api";

export type TaxesStepProps = {
  control: Control<OnboardingFormData>;
};

export const TaxesStep = ({ control }: TaxesStepProps) => {
  const { data: taxes, error, isLoading } = useGetTaxesQuery();

  if (isLoading) return <div>Cargando impuestos...</div>;
  if (error || !taxes) return <div>Error al cargar los impuestos.</div>;
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Selecciona los impuestos que aplican a tu negocio
      </h3>
      <FormField
        control={control}
        name="selectedTaxes"
        render={() => (
          <FormItem>
            <div className="grid gap-4">
              {taxes.map((tax) => (
                <FormField
                  key={tax.id}
                  control={control}
                  name="selectedTaxes"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={tax.id}
                        className="flex items-center space-x-3 space-y-0 p-4 border rounded-lg"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(tax.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, tax.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: number) => value !== tax.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <FormLabel className="font-medium cursor-pointer">
                              {tax.name}
                            </FormLabel>
                            {tax.isDefault && (
                              <Badge variant="secondary">Por defecto</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {tax.description}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Tasa: {(Number(tax.rate) * 100).toFixed(2)}% |
                            Código AFIP: {tax.afipCode}
                          </p>
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
