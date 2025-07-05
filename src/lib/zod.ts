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


export const OrganizationSchema = z.object({
    organizer: z.string().min(1, "Nama organisasi tidak boleh kosong"),
    description: z.string().min(1, "Deskripsi organisasi tidak boleh kosong"),
    location: z.string().min(1, "Lokasi organisasi tidak boleh kosong"),
    url: z.string().min(1, "URL organisasi tidak boleh kosong"),
})