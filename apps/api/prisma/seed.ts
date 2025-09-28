import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create default admin user
  await createDefaultUser();

  // Create company config
  //await createCompanyConfig();

  // Create default taxes
  await createDefaultTaxes();

  // Create default payment methods
  await createDefaultPaymentMethods();

  console.log('✅ Database seeded successfully!');
}

async function createDefaultUser() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@rmpos.com' },
    update: {},
    create: {
      email: 'admin@rmpos.com',
      firstName: 'Administrador',
      lastName: 'Sistema',
      username: 'admin',
      password: hashedPassword,
      isActive: true,
      role: 'ADMIN',
    },
  });

  console.log('👤 Default admin user created');
}

/* async function createCompanyConfig() {
  await prisma.companyConfig.upsert({
    where: { id: 1 },
    update: {},
    create: {
      legalName: 'Mi Empresa S.A.',
      cuit: '20-12345678-9',
      ivaCondition: 'RESPONSABLE_INSCRIPTO',
      name: 'Mi Empresa',
      address: 'Av. Corrientes 1234',
      city: 'Ciudad Autónoma de Buenos Aires',
      province: 'CABA',
      postalCode: 'C1043AAZ',
      phone: '+54 11 1234-5678',
      email: 'contacto@miempresa.com',
      website: 'https://miempresa.com',
      currency: 'ARS',
      timezone: 'America/Argentina/Buenos_Aires',
      receiptFooter: 'Gracias por su compra - www.miempresa.com',
      pointOfSale: 1,
    },
  });

  console.log('🏢 Company configuration created');
} */

async function createDefaultTaxes() {
  const taxes = [
    {
      name: 'IVA 21%',
      description: 'Impuesto al Valor Agregado - Tasa General',
      rate: 0.21,
      type: 'PERCENTAGE' as const,
      afipCode: '5',
      isActive: true,
      isDefault: true,
    },
    {
      name: 'IVA 10.5%',
      description: 'Impuesto al Valor Agregado - Tasa Reducida',
      rate: 0.105,
      type: 'PERCENTAGE' as const,
      afipCode: '4',
      isActive: true,
      isDefault: false,
    },
    {
      name: 'IVA 27%',
      description: 'Impuesto al Valor Agregado - Tasa Adicional',
      rate: 0.27,
      type: 'PERCENTAGE' as const,
      afipCode: '6',
      isActive: true,
      isDefault: false,
    },
    {
      name: 'IVA 0%',
      description: 'Impuesto al Valor Agregado - Exento',
      rate: 0,
      type: 'PERCENTAGE' as const,
      afipCode: '3',
      isActive: true,
      isDefault: false,
    },
  ];

  for (const tax of taxes) {
    const existing = await prisma.tax.findFirst({
      where: { name: tax.name },
    });

    await prisma.tax.upsert({
      where: existing ? { id: existing.id } : { id: '___DUMMY___' },
      update: {},
      create: tax,
    });
  }

  console.log('💰 Default taxes created');
}

async function createDefaultPaymentMethods() {
  const paymentMethods = [
    {
      name: 'Efectivo',
      description: 'Pago en efectivo',
      type: 'CASH' as const,
      isActive: true,
      isDefault: true,
      requiresAuth: false,
      processingFee: null,
      feeType: null,
    },
    {
      name: 'Tarjeta de Débito',
      description: 'Pago con tarjeta de débito',
      type: 'DEBIT_CARD' as const,
      isActive: true,
      isDefault: false,
      requiresAuth: false,
      processingFee: 0.015,
      feeType: 'PERCENTAGE' as const,
    },
    {
      name: 'Tarjeta de Crédito',
      description: 'Pago con tarjeta de crédito',
      type: 'CREDIT_CARD' as const,
      isActive: true,
      isDefault: false,
      requiresAuth: false,
      processingFee: 0.025,
      feeType: 'PERCENTAGE' as const,
    },
    {
      name: 'Mercado Pago',
      description: 'Pago con Mercado Pago',
      type: 'MERCADO_PAGO' as const,
      isActive: true,
      isDefault: false,
      requiresAuth: false,
      processingFee: 0.0299,
      feeType: 'PERCENTAGE' as const,
    },
    {
      name: 'Transferencia Bancaria',
      description: 'Transferencia bancaria',
      type: 'BANK_TRANSFER' as const,
      isActive: true,
      isDefault: false,
      requiresAuth: true,
      processingFee: null,
      feeType: null,
    },
    {
      name: 'Billetera Digital',
      description: 'Ualá, Brubank, etc.',
      type: 'DIGITAL_WALLET' as const,
      isActive: true,
      isDefault: false,
      requiresAuth: false,
      processingFee: 0.02,
      feeType: 'PERCENTAGE' as const,
    },
  ];

  for (const method of paymentMethods) {
    const existing = await prisma.paymentMethod.findFirst({
      where: { name: method.name },
    });

    await prisma.paymentMethod.upsert({
      where: existing ? { id: existing.id } : { id: '___DUMMY___' },
      update: {},
      create: method,
    });
  }

  console.log('💳 Default payment methods created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
