import type { User, Role } from "@bksin/database";

/**
 * @description Datos para mostrar públicamente. NUNCA incluyas la contraseña.
 */
export type UserPublicProfile = Omit<User, "password">;

/**
 * @description DTO para el endpoint de creación de usuario.
 * Usamos Pick para seleccionar solo los campos necesarios del modelo original.
 */
export interface CreateUserDto
  extends Pick<User, "email" | "firstName" | "lastName" | "password"> {
  // Se pueden añadir campos que no están en el modelo User si es necesario
  username?: string;
  role?: Role; // El rol podría ser opcional y asignado por defecto en el backend
}

/**
 * @description DTO para actualizar un usuario. Todos los campos son opcionales.
 * La contraseña se suele manejar en un endpoint separado, pero aquí se incluye como ejemplo.
 */
export interface UpdateUserDto
  extends Partial<
    Pick<
      User,
      "firstName" | "lastName" | "isActive" | "role" | "password" | "username"
    >
  > {}
