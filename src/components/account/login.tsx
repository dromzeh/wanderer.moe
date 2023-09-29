'use client'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { DiscordLogoIcon, GlobeIcon } from '@radix-ui/react-icons'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { siteConfig } from '@/config/site'
import { AlternateAuthProviders } from '@/components/account/alternate-auth-providers'
import { useToast } from '@/components/ui/use-toast'
import { z } from 'zod'

const LoginSchema = z.object({
    username: z
        .string({
            required_error: 'Username is required',
            invalid_type_error: 'Username must be a string',
        })
        .min(3, 'Username must be at least 3 characters long')
        .max(32, 'Username must be at most 32 characters long'),
    password: z
        .string({
            required_error: 'Password is required',
            invalid_type_error: 'Password must be a string',
        })
        .regex(new RegExp('.*[A-Z].*'), 'One uppercase character is required')
        .regex(new RegExp('.*[a-z].*'), 'One lowercase character is required')
        .regex(new RegExp('.*\\d.*'), 'One number is required')
        .regex(
            new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
            'One special character is required',
        )
        .min(8, 'Password must be at least 8 characters long')
        .max(128, 'Password must be at most 128 characters long'),
})

export function Login() {
    const [isLoading, setIsLoading] = useState(false)

    const { toast } = useToast()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)

        const data = LoginSchema.safeParse(Object.fromEntries(formData))

        if (!data.success) {
            // TODO(dromzeh): error dependant on field instead of toast
            const errorMessage = data.error.issues
                .map((issue) => issue.message)
                .join(', ')

            toast({
                title: 'Invalid form data',
                description: errorMessage,
            })
            setIsLoading(false)
            return
        }

        try {
            const res = await fetch(`${siteConfig.urls.api}/auth/login`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            })

            if (res.ok && res.status === 200) {
                window.location.href = '/'
            } else {
                throw new Error('Response failed')
            }
        } catch (error) {
            console.error(error)
            toast({
                title: 'Something went wrong',
                description: 'Please try again later',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full sm:w-2/3">
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-center text-2xl">
                            Login to account
                        </CardTitle>
                        <CardDescription>
                            <AlternateAuthProviders />
                            <Separator className="mt-4" />
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                disabled={isLoading}
                                id="username"
                                name="username"
                                type="username"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                disabled={isLoading}
                                id="password"
                                name="password"
                                type="password"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            disabled={isLoading}
                            className="w-full font-semibold">
                            {isLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Login
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}
