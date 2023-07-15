import { redirect } from '@sveltejs/kit'
export const load = async ({ locals, url }) => {
    url.href
    const { user } = await locals.auth.validateUser()
    if (!user) {
        throw redirect(302, '/account/login')
    }
    return {
        user,
    }
}
