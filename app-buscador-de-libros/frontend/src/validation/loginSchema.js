import { z } from 'zod';

export const loginSchema = z.object({
    userType: z.enum(['administrador', 'cliente']),
    email: z.string().email('El correo electrónico es inválido'),
    password: z.string()
        .min(6, 'La contraseña debe contener al menos 6 caracteres')
        .regex(/.*[A-Z].*/, 'La contraseña debe contener al menos una letra mayúscula'),
});

// Formulario de registro
export const registerSchema = z.object({
    email: z.string().email('El correo electrónico es inválido'),
    password: z.string()
        .min(6, 'La contraseña debe contener al menos 6 caracteres')
        .regex(/.*[A-Z].*/, 'La contraseña debe contener al menos una letra mayúscula'),
});