export enum TaxType {
  PERCENTAGE = "PERCENTAGE",
  FIXED_AMOUNT = "FIXED_AMOUNT",
}

export const TAX_TYPE_VALUES = [...Object.values(TaxType)] as [
  string,
  ...string[],
];
