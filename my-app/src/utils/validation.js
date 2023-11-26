import { z } from "zod";

export const User = z.object({
  email: z.string().email({ message: "Пожалуйста, введите правильный Email" }),
  password: z
    .string()
    .min(8, { message: "(Пожалуйста, введите правильный Password)  " })
    .regex(/[a-z]/, "(Пароль должен содержать хотя бы одну строчную букву)  ")
    .regex(/[A-Z]/, "(Пароль должен содержать хотя бы одну заглавную букву)  ")
    .regex(/[0-9]/, "(Пароль должен содержать хотя бы одну цифру) "),
   dateSignUp: z.date(),
});
