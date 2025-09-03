import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create default permissions
  //const permissions = await createPermissions();

  // Create default roles
  //const adminRole = await createRoles(permissions);

  // Create default admin user
  await createDefaultUser();

  // Create company config
  //await createCompanyConfig();

  // Create default system config
  //await createSystemConfig();

  console.log('✅ Database seeded successfully!');
}

/* async function createPermissions() {
  const modules = [
    'users',
    'roles',
    'config',
    'products',
    'customers',
    'sales',
  ];
  const actions = ['create', 'read', 'update', 'delete'];

  for (const module of modules) {
    for (const action of actions) {
      await prisma.permission.upsert({
        where: { name: `${module}.${action}` },
        update: {},
        create: {
          name: `${module}.${action}`,
          module,
          action,
          description: `${action.charAt(0).toUpperCase() + action.slice(1)} ${module}`,
        },
      });
    }
  }

  return prisma.permission.findMany();
} */

/* async function createRoles(permissions: any[]) {
  // Admin role with all permissions
  const adminRole = await prisma.role.upsert({
    where: { name: 'Administrador' },
    update: {},
    create: {
      name: 'Administrador',
      description: 'Acceso completo al sistema',
      isDefault: false,
    },
  });

  // Assign all permissions to admin
  for (const permission of permissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: permission.id,
      },
    });
  }

  return adminRole;
} */

async function createDefaultUser() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@rmpos.com' },
    update: {},
    create: {
      email: 'admin@rmpos.com',
      firstName: 'Administrador',
      username: 'Admin',
      lastName: 'Sistema',
      password: hashedPassword,
      isActive: true,
      isVerified: true,
    },
  });
}

/* async function createCompanyConfig() {
  await prisma.companyConfig.upsert({
    where: { cuit: '20123456789' },
    update: {},
    create: {
      businessName: 'Mi Empresa S.A.',
      tradeName: 'Mi Empresa',
      cuit: '20123456789',
      taxCondition: 'RESPONSABLE_INSCRIPTO',
      address: 'Calle Falsa 123',
      city: 'Ciudad Ejemplo',
      province: 'Buenos Aires',
      postalCode: '1234',
      phone: '+54 11 1234-5678',
      email: 'contacto@miempresa.com',
    },
  });
} */

/* async function createSystemConfig() {
  const configs = [
    { key: 'SYSTEM_NAME', value: 'AURA', description: 'Nombre del sistema' },
    {
      key: 'SYSTEM_VERSION',
      value: '1.0.0',
      description: 'Versión del sistema',
    },
    {
      key: 'INVOICE_NEXT_NUMBER',
      value: '1',
      type: 'NUMBER',
      description: 'Próximo número de factura',
    },
    {
      key: 'DEFAULT_TAX_RATE',
      value: '21.00',
      type: 'NUMBER',
      description: 'Tasa de IVA por defecto',
    },
  ];

  for (const config of configs) {
    await prisma.systemConfig.upsert({
      where: { key: config.key },
      update: {},
      create: config,
    });
  }
} */

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
