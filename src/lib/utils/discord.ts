import axios from 'axios'
import type { AxiosResponse } from 'axios'

export async function getDiscordData(): Promise<number | string> {
    try {
        const {
            data: { presence_count: onlineUsers },
        }: AxiosResponse<{
            presence_count: number
        }> = await axios.get(
            'https://discord.com/api/guilds/982385887000272956/widget.json'
        )
        return onlineUsers
    } catch (e) {
        console.log('Error fetching discord data')
        return '???'
    }
}
