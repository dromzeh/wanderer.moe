export const load = async ({ locals, url }) => {
    url.href
    const { user } = await locals.auth.validateUser()
    return {
        user,
    }
}
