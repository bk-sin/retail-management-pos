import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control } from "react-hook-form";
import { OnboardingFormData } from "@/schemas/onboarding-schema";
import { IvaCondition } from "@bksin/database";

export type LegalInfoStepProps = {
  control: Control<OnboardingFormData>;
};

export const LegalInfoStep = ({ control }: LegalInfoStepProps) => {
  console.log(IvaCondition);
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="legalName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Razón Social *</FormLabel>
            <FormControl>
              <Input placeholder="Ej: Mi Empresa S.A." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="cuit"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CUIT *</FormLabel>
            <FormControl>
              <Input placeholder="Ej: 20-12345678-9" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="ivaCondition"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Condición ante el IVA *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu condición" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(IvaCondition).map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition
                      .replace(/_/g, " ")
                      .toLowerCase()
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
