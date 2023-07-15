import { auth } from '$lib/server/lucia'
import { fail, type Actions } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'
import { LuciaError } from 'lucia-auth'
import type { PageServerLoad } from './$types'
import { sendEmailConfirmationEmail } from '$lib/server/resend'
import { emailVerificationToken } from '$lib/server/lucia'
import { env } from '$env/dynamic/private'
import {
    checkEmail,
    checkPassword,
    checkUsername,
} from '$lib/helpers/auth/account/check'
import { validateToken } from '$lib/utils/validateTokenResponse'

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const form = await request.formData()
        const username = form.get('username')
        const password = form.get('password')
        const email = form.get('email')
        // const token = form.get('cf-turnstile-response')

        // const { success, error } = await validateToken(token, env.CF_SECRET_KEY)

        // if (!success) {
        //     return fail(400, {
        //         message: 'Invalid captcha',
        //     })
        // }

        // idk why but vscode complains when modiying this, so I'm not going to touch it for now
        if (
            !username ||
            !password ||
            typeof username !== 'string' ||
            typeof password !== 'string' ||
            !email ||
            typeof email !== 'string'
        ) {
            return fail(400, {
                message: 'Invalid input',
            })
        }
        try {
            // create user with required mandatory fields
            const user = await auth.createUser({
                primaryKey: {
                    providerId: 'username',
                    providerUserId: username,
                    password,
                },
                attributes: {
                    username,
                    email,
                    role: 'USER',
                    email_verified: 0,
                    bio: 'No bio set',
                    date_joined: new Date(),
                },
            })

            // create session and send email verification
            const session = await auth.createSession(user.userId)
            locals.auth.setSession(session)
            const token = await emailVerificationToken.issue(user.userId)
            const link = `${
                env.BASE_URL
            }/account/verify-email/${token.toString()}`
            await sendEmailConfirmationEmail(email, link, username)
        } catch (error) {
            if (error.code === 'P2002' && error.message?.includes('username')) {
                return fail(400, {
                    message: 'Username is already being used',
                })
            }
            if (
                error instanceof LuciaError &&
                error.message === 'AUTH_DUPLICATE_KEY_ID'
            ) {
                return fail(400, {
                    message: 'Username is already being used',
                })
            }
            console.error(error)
            return fail(500, {
                message: 'An unknown error occurred while completing signup.',
            })
        }
    },
}

export const load: PageServerLoad = async ({ locals }) => {
    const { session } = await locals.auth.validateUser()
    if (session) throw redirect(302, '/account/')
    return {}
}
