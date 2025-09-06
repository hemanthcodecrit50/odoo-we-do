const z = require('zod')

export const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(2),
  password: z.string().min(6)
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});