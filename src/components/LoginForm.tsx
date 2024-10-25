"use client"

import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "./ui/form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useLoginForm } from "@/lib/auth-forms"
import { z } from "zod"
import axios from "axios"
import { useState } from "react"

const LoginForm = () => {
    const { form, schema } = useLoginForm()

    const [loading, setLoading] = useState<boolean>(false)

    async function onSubmit(values: z.infer<typeof schema>) {
        setLoading(true)

        try {
            const { data } = await axios.post("/api/auth/login", values)
            
            if (!data) {
                return console.error("An error occurred on our end, please try again later.")
            }
        } catch (error) {
            console.error("Login failed", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[90%] sm:w-[80%] md:w-[45%] xl:w-[60%] 2xl:w-[40%] space-y-5">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="janedoe@gmail.com"
                                    type="email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="your password"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button 
                    type="submit"
                    disabled={loading}
                >
                    Submit
                </Button>
            </form>
        </Form>
    )
}

export default LoginForm