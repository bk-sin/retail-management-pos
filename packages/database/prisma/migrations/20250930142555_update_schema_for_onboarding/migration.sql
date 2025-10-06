/*
  Warnings:

  - You are about to drop the column `isVerified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastLogin` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'VENDEDOR');

-- CreateEnum
CREATE TYPE "public"."TaxType" AS ENUM ('PERCENTAGE', 'FIXED_AMOUNT');

-- CreateEnum
CREATE TYPE "public"."PaymentMethodType" AS ENUM ('CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'MERCADO_PAGO', 'DIGITAL_WALLET', 'CHECK', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."PaymentFeeType" AS ENUM ('PERCENTAGE', 'FIXED_AMOUNT');

-- CreateEnum
CREATE TYPE "public"."IvaCondition" AS ENUM ('RESPONSABLE_INSCRIPTO', 'MONOTRIBUTO', 'EXENTO');

-- DropIndex
DROP INDEX "public"."users_email_idx";

-- DropIndex
DROP INDEX "public"."users_isActive_idx";

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "isVerified",
DROP COLUMN "lastLogin",
ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'VENDEDOR';

-- CreateTable
CREATE TABLE "public"."company_config" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "legalName" TEXT NOT NULL,
    "cuit" TEXT NOT NULL,
    "ivaCondition" "public"."IvaCondition" NOT NULL,
    "name" TEXT,
    "address" TEXT,
    "city" TEXT,
    "province" TEXT,
    "postalCode" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "logoUrl" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'ARS',
    "timezone" TEXT NOT NULL DEFAULT 'America/Argentina/Buenos_Aires',
    "receiptFooter" TEXT,
    "pointOfSale" INTEGER DEFAULT 1,
    "selectedTaxes" INTEGER[],
    "selectedPaymentMethods" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."taxes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "rate" DECIMAL(5,4) NOT NULL,
    "type" "public"."TaxType" NOT NULL DEFAULT 'PERCENTAGE',
    "afipCode" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "taxes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payment_methods" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "public"."PaymentMethodType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "requiresAuth" BOOLEAN NOT NULL DEFAULT false,
    "processingFee" DECIMAL(5,4),
    "feeType" "public"."PaymentFeeType" DEFAULT 'PERCENTAGE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_config_cuit_key" ON "public"."company_config"("cuit");

-- CreateIndex
CREATE INDEX "taxes_isActive_idx" ON "public"."taxes"("isActive");

-- CreateIndex
CREATE INDEX "taxes_isDefault_idx" ON "public"."taxes"("isDefault");

-- CreateIndex
CREATE INDEX "payment_methods_type_idx" ON "public"."payment_methods"("type");

-- CreateIndex
CREATE INDEX "payment_methods_isActive_idx" ON "public"."payment_methods"("isActive");

-- CreateIndex
CREATE INDEX "payment_methods_isDefault_idx" ON "public"."payment_methods"("isDefault");
