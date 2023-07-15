import { auth } from '$lib/server/lucia'

import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
    const { user } = await locals.auth.validateUser()
    if (!user) {
        throw redirect(302, '/account/login')
    }
    return {
        user,
    }
}
