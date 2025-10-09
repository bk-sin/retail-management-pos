import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CreditCard, FileText } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import { onboardingSelector } from "@/features/onboarding/onboarding.slice";
import { useGetTaxesQuery } from "@/features/taxes/taxes.api";
import { useGetPaymentMethodsQuery } from "@/features/payment-methods/payment-methods.api";
import { IvaCondition, TaxType } from "@bksin/database";

export const SummaryStep = () => {
  const { data } = useAppSelector(onboardingSelector);
  const { data: taxes } = useGetTaxesQuery();
  const { data: paymentMethods } = useGetPaymentMethodsQuery();
  console.log("paymentMethods", paymentMethods);
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Resumen de Configuración</h3>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Información de la Empresa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Información Legal */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Información Legal
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong className="text-sm font-medium">Razón Social:</strong>
                <p className="text-sm mt-1">{data.legalName}</p>
              </div>
              <div>
                <strong className="text-sm font-medium">CUIT:</strong>
                <p className="text-sm mt-1">{data.cuit}</p>
              </div>
              <div className="md:col-span-2">
                <strong className="text-sm font-medium">Condición IVA:</strong>
                <p className="text-sm mt-1">
                  {Object.values(IvaCondition).find(
                    (cond) => cond === data.ivaCondition
                  )}
                </p>
              </div>
              {data.name && (
                <div className="md:col-span-2">
                  <strong className="text-sm font-medium">
                    Nombre Comercial:
                  </strong>
                  <p className="text-sm mt-1">{data.name}</p>
                </div>
              )}
            </div>
          </div>

          {/* Información de Contacto */}
          {(data.phone || data.email || data.website) && (
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                Información de Contacto
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.phone && (
                  <div>
                    <strong className="text-sm font-medium">Teléfono:</strong>
                    <p className="text-sm mt-1">{data.phone}</p>
                  </div>
                )}
                {data.email && (
                  <div>
                    <strong className="text-sm font-medium">Email:</strong>
                    <p className="text-sm mt-1">{data.email}</p>
                  </div>
                )}
                {data.website && (
                  <div className="md:col-span-2">
                    <strong className="text-sm font-medium">Sitio Web:</strong>
                    <p className="text-sm mt-1">{data.website}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Dirección */}
          {(data.address || data.city || data.province || data.postalCode) && (
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                Dirección
              </h4>
              <div className="space-y-2">
                {data.address && (
                  <div>
                    <strong className="text-sm font-medium">Dirección:</strong>
                    <p className="text-sm mt-1">{data.address}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data.city && (
                    <div>
                      <strong className="text-sm font-medium">Ciudad:</strong>
                      <p className="text-sm mt-1">{data.city}</p>
                    </div>
                  )}
                  {data.province && (
                    <div>
                      <strong className="text-sm font-medium">
                        Provincia:
                      </strong>
                      <p className="text-sm mt-1">{data.province}</p>
                    </div>
                  )}
                  {data.postalCode && (
                    <div>
                      <strong className="text-sm font-medium">
                        Código Postal:
                      </strong>
                      <p className="text-sm mt-1">{data.postalCode}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Impuestos Configurados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {data.selectedTaxes.map((taxId: number) => {
              const tax = taxes?.find((t) => t.id === taxId);
              return tax ? (
                <div key={taxId} className="flex justify-between">
                  <span>{tax.name}</span>
                  <span>{(Number(tax.rate) * 100).toFixed(2)}%</span>
                </div>
              ) : null;
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Métodos de Pago
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {data.selectedPaymentMethods.map((methodId: number) => {
              const method = paymentMethods?.find((m) => m.id === methodId);
              return method ? (
                <div key={methodId} className="flex justify-between">
                  <span>{method.name}</span>
                  {method.feeType === TaxType.PERCENTAGE && (
                    <span className="text-sm text-muted-foreground">
                      {(Number(method.processingFee) * 100).toFixed(2)}%
                      comisión
                    </span>
                  )}
                  {method.feeType === TaxType.FIXED_AMOUNT && (
                    <span className="text-sm text-muted-foreground">
                      {(Number(method.processingFee) * 100).toFixed(2)} comisión
                    </span>
                  )}
                </div>
              ) : null;
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
