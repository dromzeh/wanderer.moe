import { error } from '@sveltejs/kit'

export async function load({ url, params }) {
    const { game } = params

    try {
        const gameInformation = await Promise.all([
            fetch(
                `https://v2-api-testing.wanderer.moe/oc-generator/${game}`
            ).then((res) => res.json()),
        ])

        if (gameInformation[0].status === 'error') {
            throw error(404, 'Game not found')
        }

        console.log(gameInformation[0].results[0])
        return {
            jsonFile: gameInformation[0].results[0],
            game,
        }
    } catch (err) {
        if (err.status === 404) {
            throw err
        } else {
            throw error(500, err)
        }
    }
}
