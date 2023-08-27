export const siteConfig = {
    name: 'wanderer.moe',
    description: 'A centralized database of various game assets.',
    urls: {
        api: 'https://v2-api-testing.wanderer.moe',
        cdn: 'https://files.wanderer.moe',
        site: 'https://wanderer.moe',
        status: 'https://status.wanderer.moe',
    },
    socials: {
        github: 'https://git.wanderer.moe',
        discord: 'https://discord.wanderer.moe',
    },
    discord: {
        server_id: '982385887000272956', // for the [count] online component
    },
    support: {
        email: 'support@wanderer.moe',
        server: 'https://discord.wanderer.moe',
    },
}

// for import
export type SiteConfig = typeof siteConfig
