<script lang="ts">
import {
    possibleRoutes,
    calculateLevenshtein,
} from '$lib/helpers/possibleRoutes'
import { t } from 'svelte-i18n'
import { page } from '$app/stores'
import { onMount } from 'svelte'

let routeName = $page.url.pathname
let misspelledRoute = ''

onMount(() => {
    if ($page.status === 404) {
        console.log(routeName)
        const matches = possibleRoutes.map((route) => {
            return {
                route,
                distance: calculateLevenshtein(route, routeName),
            }
        })

        // console.log(matches)
        matches.sort((a, b) => a.distance - b.distance)

        if (matches[0].distance < 5) {
            console.warn(
                `Possible misspelled route: ${matches[0].route} (distance: ${matches[0].distance})`
            )
            misspelledRoute = matches[0].route
        }
    }
})

// console.log($page)
</script>

<svelte:head>
    <title>{$page.status}</title>
</svelte:head>

<div class="flex h-screen">
    <div class="m-auto">
        <p class="text-3xl font-semibold my-2">
            <span class="rounded-lg bg-red-400 px-3 text-main-400"
                >{$page.status}
            </span>
            <span class="text-white">
                {$t(`errors.${$page.status === 404 ? '404' : '500'}`)}
            </span>
        </p>
        <div>
            {#if misspelledRoute}
                <div class="items-center flex">
                    <img
                        src="https://cdn.wanderer.moe/genshin-impact/emotes/keqing-3.png"
                        alt="keqing"
                        class="inline h-8 w-8 mr-2" />
                    <p class="my-2 text-gray-400">
                        Maybe you meant to go to
                        <a href="{misspelledRoute}" class="text-white">
                            {misspelledRoute}
                        </a> instead?
                    </p>
                </div>
            {/if}
            <button
                class="text-white mt-4"
                on:click="{() => (window.location.href = '/')}">
                Go Back <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    </div>
</div>

<div class="text-center">
    {#if $page.error?.message}
        <p class="my-2 text-red-100 text-xs">
            Boring error message: {$page.error.message}
        </p>
    {/if}
</div>
