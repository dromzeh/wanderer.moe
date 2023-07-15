<script>
import { t } from 'svelte-i18n'
import DiscordUser from '@/components/Discord/DiscordUser.svelte'
import Banner from '@/components/Banner/GameBanner.svelte'
// import { fade } from 'svelte/transition'

export let data
const { contributors } = data

const categories = {
    Development: {
        description: 'Managing and developing the project codebase',
        roles: ['Project Lead', 'Developer'],
    },
    Staff: {
        description: 'Moderating and managing the community',
        roles: ['Admin', 'Senior Moderator', 'Moderator'],
    },
    Contributors: {
        description: 'Contributing with assets and translations',
        roles: ['Translator', 'Contributor'],
    },
    Supporters: {
        description: 'Really cool people',
        roles: ['Server Booster'],
    },
}

const roleColors = {
    'Project Lead': 'bg-indigo-300',
    Developer: 'bg-indigo-200',
    Admin: 'bg-blue-300',
    'Senior Moderator': 'bg-purple-300',
    Moderator: 'bg-purple-200',
    Translator: 'bg-violet-100',
    Contributor: 'bg-violet-200',
    'Server Booster': 'bg-yellow-200',
}

function getTopmostCategory(contributor) {
    for (const [category, { roles }] of Object.entries(categories)) {
        if (roles.some((role) => contributor.roles.includes(role))) {
            return category
        }
    }
}
</script>

<svelte:head>
    <title>Contributors | wanderer.moe</title>
</svelte:head>

<div class="min-h-screen">
    <div class="mb-8">
        <div class="px-2 md:px-12 lg:px-48">
            <!-- {$t('contributors.title')} && {$t('contributors.desc')} -->
            <Banner
                title="{$t('contributors.title')}"
                description="{$t('contributors.desc')}"
                url="https://cdn.wanderer.moe/goddess-of-victory-nikke/cover.png" />
            <div>
                {#each Object.entries(categories) as [category, { description, roles }]}
                    <div id="{category}" class="mb-8">
                        <p class="mb-2 text-3xl font-bold text-white">
                            {category}
                        </p>
                        <p class="text-md mb-2 text-white">
                            {description}
                        </p>
                        <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
                            {#each contributors.filter((contributor) => roles.some( (role) => contributor.roles.includes(role) ) && getTopmostCategory(contributor) === category) as contributor}
                                <DiscordUser
                                    contributor="{contributor}"
                                    roleColors="{roleColors}" />
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
