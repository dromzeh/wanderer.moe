import { error } from '@sveltejs/kit'

export async function load() {
    try {
        const res = await fetch(`https://api.wanderer.moe/discord/contributors`)
        if (res.ok) {
            const response = await res.json()
            const data = {
                contributors: response.contributors,
            }
            return data
        }
    } catch (err) {
        throw error(500, 'API Error')
    }
}
