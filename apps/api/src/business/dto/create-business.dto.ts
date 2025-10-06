import { IvaCondition } from '@prisma/client';

export class CreateBusinessDto {
  legalName: string;
  cuit: string;
  ivaCondition: IvaCondition;
  name?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  phone: string;
  email: string;
  website?: string;
  logoUrl?: string;
  currency: string;
  timezone: string;
  receiptFooter?: string;
  selectedTaxes: number[];
  selectedPaymentMethods: number[];
}
