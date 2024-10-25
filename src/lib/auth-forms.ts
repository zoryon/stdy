import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type UseFormReturn } from "react-hook-form"
import { z, type ZodSchema } from "zod"

// schema with shared properites
const baseSchema = z.object({
    email: z
        .string()
        .email()
        .min(3, "Email must be at least 3 characters long"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(30, "Password must be less than 30 characters"),
})

// register schema
const registerSchema = baseSchema.extend({
    username: z
        .string()
        .min(2, "username must be at least 2 characters long")
        .max(15, "username must be less than 15 characters"),
})

// login schema
const loginSchema = baseSchema.extend({})

// hook to create a form
function useCustomForm<T extends ZodSchema>( 
    schema: T,
    defaultValues: z.infer<T>
): UseFormReturn<z.infer<T>> {
    return useForm<z.infer<T>>({
        resolver: zodResolver(schema),
        defaultValues,
    })
}

// register hook form
export const useRegisterForm = () => {
    const form = useCustomForm(registerSchema, {
        email: "",
        password: "",
        username: "",
    })

    return {
        form,
        schema: registerSchema,
    }
}

// login hook form
export const useLoginForm = () => {
    const form = useCustomForm(loginSchema, {
        email: "",
        password: "",
    })

    return {
        form,
        schema: loginSchema,
    }
}
