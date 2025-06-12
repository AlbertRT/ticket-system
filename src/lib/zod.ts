// zod schema
import { z } from 'zod'

export const SignInSchema = z.object({
    email: z.string().email("Email tidak valid"),
    password: z.string().min(8, "Password tidak boleh kurang dari 8 karakter"),
})


export const RegisterSchema = z.object({
    name: z.string().min(1, "Usernama tidak boleh kurang dari 1 karakter"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(8, "Password tidak boleh kurang dari 8 karakter"),
    confirm_password: z.string().min(8, "Password tidak boleh kurang dari 8 karakter"),
}).refine(data => data.password === data.confirm_password, {
    message: 'Password tidak sama',
    path: ['confirm_password']
})

