import { auth, passwordResetToken } from '$lib/server/lucia'
import { fail, type Actions } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma'
import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { env } from '$env/dynamic/private'
import { sendPasswordResetEmail } from '$lib/server/resend'

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const form = await request.formData()
        const email = form.get('email')
        console.log(form)
        if (!email || typeof email !== 'string') {
            return fail(400, {
                message: 'Invalid input',
            })
        }

        const dbUser = await prisma.authUser.findFirst({
            where: {
                email: email,
            },
        })
        if (!dbUser) {
            return fail(400, {
                message: 'Email not found',
            })
        }

        const user = auth.transformDatabaseUser(dbUser)
        const token = await passwordResetToken.issue(user.userId)
        const link = `${
            env.BASE_URL
        }/account/forgot-password/${token.toString()}`

        await sendPasswordResetEmail(email, link, user.username)

        return {
            success: true,
        }
    },
}

export const load: PageServerLoad = async ({ locals }) => {
    const { session } = await locals.auth.validateUser()
    if (session) throw redirect(302, '/')
    return {}
}
