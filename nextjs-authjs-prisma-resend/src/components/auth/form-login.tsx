"use client"

import { loginSchema } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState, useTransition } from "react"
import { loginAction } from "@/actions/auth-action"
import { useRouter } from "next/navigation"


export default function FormLogin({
    isVerifield,
}: {
    isVerifield: boolean
}) {
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    // 1. Define your form.
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof loginSchema>) {
        setError(null)
        startTransition(async () => {
            const response = await loginAction(values)
            console.log(response)
            if (response.error) {
                setError(response.error)
            } else {
                router.push("/protected")
            }
        })
    }

    return (
        <Form {...form}>
            {
                isVerifield && (
                    <p className="text-center text-green-500 mb-5 text-sm">
                        Email verifield, you can now login
                    </p>
                )
            }
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" type="email" {...field} />
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
                                <Input placeholder="shadcn" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    error && <FormMessage>{error}</FormMessage>
                }
                <Button type="submit" disabled={isPending}>Submit</Button>
            </form>
        </Form>
    )
}