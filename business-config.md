# Schema de Base de Datos - POS Argentina MVP

## Descripción General

Este schema está diseñado para un sistema de punto de venta (POS) específicamente para el mercado argentino. Incluye configuración empresarial, usuarios, impuestos y métodos de pago optimizados para la legislación fiscal argentina.

## Modelos

### 1. User (Usuarios del Sistema)

Gestiona los usuarios que pueden acceder al sistema POS.

| Campo       | Tipo                     | Descripción                      |
| ----------- | ------------------------ | -------------------------------- |
| `id`        | String (CUID)            | Identificador único del usuario  |
| `email`     | String (único)           | Email del usuario                |
| `username`  | String (único, opcional) | Nombre de usuario                |
| `firstName` | String                   | Nombre                           |
| `lastName`  | String                   | Apellido                         |
| `password`  | String                   | Contraseña hasheada              |
| `isActive`  | Boolean                  | Estado activo del usuario        |
| `role`      | Role                     | Rol del usuario (ADMIN/VENDEDOR) |
| `createdAt` | DateTime                 | Fecha de creación                |
| `updatedAt` | DateTime                 | Fecha de última actualización    |

### 2. CompanyConfig (Configuración de la Empresa)

Almacena la configuración única de la empresa. Solo puede existir un registro con ID = 1.

| Campo           | Tipo              | Descripción                              |
| --------------- | ----------------- | ---------------------------------------- |
| `id`            | Int (1)           | ID fijo para empresa única               |
| `legalName`     | String            | Razón social (obligatorio)               |
| `cuit`          | String (único)    | CUIT argentino                           |
| `ivaCondition`  | IvaCondition      | Condición frente al IVA                  |
| `name`          | String (opcional) | Nombre comercial                         |
| `address`       | String (opcional) | Dirección                                |
| `city`          | String (opcional) | Ciudad                                   |
| `province`      | String (opcional) | Provincia argentina                      |
| `postalCode`    | String (opcional) | Código postal                            |
| `phone`         | String (opcional) | Teléfono                                 |
| `email`         | String (opcional) | Email comercial                          |
| `website`       | String (opcional) | Sitio web                                |
| `logoUrl`       | String (opcional) | URL del logo                             |
| `currency`      | String            | Moneda (por defecto: ARS)                |
| `timezone`      | String            | Zona horaria (por defecto: Buenos Aires) |
| `receiptFooter` | String (opcional) | Pie de ticket personalizable             |
| `pointOfSale`   | Int (opcional)    | Punto de venta AFIP (por defecto: 1)     |
| `createdAt`     | DateTime          | Fecha de creación                        |
| `updatedAt`     | DateTime          | Fecha de última actualización            |

### 3. Tax (Impuestos)

Define los impuestos configurables para el sistema.

| Campo         | Tipo              | Descripción                                |
| ------------- | ----------------- | ------------------------------------------ |
| `id`          | String (CUID)     | Identificador único del impuesto           |
| `name`        | String            | Nombre del impuesto (ej: "IVA 21%")        |
| `description` | String (opcional) | Descripción detallada                      |
| `rate`        | Decimal(5,4)      | Tasa del impuesto (ej: 0.2100 = 21%)       |
| `type`        | TaxType           | Tipo de impuesto (PERCENTAGE/FIXED_AMOUNT) |
| `afipCode`    | String (opcional) | Código AFIP del impuesto                   |
| `isActive`    | Boolean           | Estado activo                              |
| `isDefault`   | Boolean           | Impuesto por defecto                       |
| `createdAt`   | DateTime          | Fecha de creación                          |
| `updatedAt`   | DateTime          | Fecha de última actualización              |

**Índices:**

- `isActive`
- `isDefault`

### 4. PaymentMethod (Métodos de Pago)

Define los métodos de pago disponibles en el sistema.

| Campo           | Tipo                      | Descripción                        |
| --------------- | ------------------------- | ---------------------------------- |
| `id`            | String (CUID)             | Identificador único del método     |
| `name`          | String                    | Nombre del método (ej: "Efectivo") |
| `description`   | String (opcional)         | Descripción detallada              |
| `type`          | PaymentMethodType         | Tipo de método de pago             |
| `isActive`      | Boolean                   | Estado activo                      |
| `isDefault`     | Boolean                   | Método por defecto                 |
| `requiresAuth`  | Boolean                   | Requiere autorización adicional    |
| `processingFee` | Decimal(5,4) (opcional)   | Comisión del método                |
| `feeType`       | PaymentFeeType (opcional) | Tipo de comisión                   |
| `createdAt`     | DateTime                  | Fecha de creación                  |
| `updatedAt`     | DateTime                  | Fecha de última actualización      |

**Índices:**

- `type`
- `isActive`
- `isDefault`

## Enums

### Role

- `ADMIN`: Administrador del sistema
- `VENDEDOR`: Usuario vendedor

### IvaCondition

- `RESPONSABLE_INSCRIPTO`: Responsable Inscripto
- `MONOTRIBUTO`: Régimen Simplificado (Monotributo)
- `EXENTO`: Exento

### TaxType

- `PERCENTAGE`: Porcentaje del monto
- `FIXED_AMOUNT`: Monto fijo

### PaymentMethodType

- `CASH`: Efectivo
- `CREDIT_CARD`: Tarjeta de Crédito
- `DEBIT_CARD`: Tarjeta de Débito
- `BANK_TRANSFER`: Transferencia Bancaria
- `MERCADO_PAGO`: Mercado Pago
- `DIGITAL_WALLET`: Billeteras digitales (Ualá, Brubank, etc.)
- `CHECK`: Cheque
- `OTHER`: Otro

### PaymentFeeType

- `PERCENTAGE`: Porcentaje del monto
- `FIXED_AMOUNT`: Monto fijo
