import type { PrismaClient } from '@prisma/client'

declare global {
    /// <reference types="@sveltejs/kit" />
    declare namespace App {
        interface Locals {
            auth: import('lucia-auth').AuthRequest
        }
    }
    var __prisma: PrismaClient

    declare namespace Lucia {
        type Auth = import('$lib/server/lucia').Auth
        type UserAttributes = {
            username: string
            email: string
            email_verified: int
            role: Role
            bio: string
            pronouns?: string
            avatar_url?: string
            date_joined: Date
        }
    }
}
