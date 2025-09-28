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

export type LegalInfoStepProps = {
  control: Control<OnboardingFormData>;
};

export const LegalInfoStep = ({ control }: LegalInfoStepProps) => {
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
                <SelectItem value="RESPONSABLE_INSCRIPTO">
                  Responsable Inscripto
                </SelectItem>
                <SelectItem value="MONOTRIBUTO">Monotributo</SelectItem>
                <SelectItem value="EXENTO">Exento</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
