<style lang="postcss">
.fade-in {
    animation: fadeIn 0.2s forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>

<script lang="ts">
import { replaceStateWithQuery } from '@/lib/helpers/replaceStateWithQuery'
import { t } from 'svelte-i18n'
import AssetItem from '@/components/Asset/AssetItem.svelte'
import { cubicOut, quintOut } from 'svelte/easing'
import { fly, fade } from 'svelte/transition'
import { onMount } from 'svelte'
import type { AcceptableParams } from '@/lib/types/acceptableParams'
import { fixCasing } from '@/lib/helpers/casing/fixCasing'
import { writable } from 'svelte/store'
import { mapGame, mapAssetType } from '@/lib/helpers/casing/gameMapping'
import { debounce } from 'lodash'

// TODO: seperate this into its own components, helper functions, etc AFTER all functions are implemented & optimized because this is a mess
// eg components: AssetItems, AssetCategories, Games, SearchBar, etc, all of this code is only temporary

export let data
const { games, recent, user } = data

let numAssetsToDisplay = 50
let results = recent
let selectedGames = writable([])
let selectedAssetCategories = writable([])
const allAssetCategories = []
let validAssetCategories = []
// let validGameCategories = []
let focusedImageElement: HTMLImageElement
let searchInput: HTMLInputElement
let focusedImage = 'honkai-star-rail'
let isFading = false
let nextImage = ''

function getAssetCategoriesFromGames() {
    games.forEach((game) => {
        game.assetCategories.forEach((category) => {
            if (!allAssetCategories.includes(category)) {
                allAssetCategories.push(category)
            }
        })
    })
    // console.log('allAssetCategories', allAssetCategories)
}

function getValidAssetCategoriesFromGames() {
    validAssetCategories = []
    games.forEach((game) => {
        if ($selectedGames.includes(game.name)) {
            game.assetCategories.forEach((category) => {
                if (!validAssetCategories.includes(category)) {
                    validAssetCategories.push(category)
                }
            })
        }
    })
    $selectedAssetCategories = $selectedAssetCategories.filter((category) =>
        validAssetCategories.includes(category)
    )
    // console.log('validAssetCategories', validAssetCategories)
}

onMount(() => {
    const params = new URLSearchParams(window.location.search)
    const { query, game, asset } = Object.fromEntries(
        params.entries()
    ) as AcceptableParams
    console.log(query, game, asset)
    if (query) {
        searchInput.value = query
    }
    if (game) {
        selectedGames.update((games) => [...games, ...game.split(',')])
        getValidAssetCategoriesFromGames()
    }
    if (asset) {
        $selectedAssetCategories = [
            ...$selectedAssetCategories,
            ...asset.split(','),
        ]
    }
    if (game || asset || query) {
        makeRequest()
    }
})

function makeRequest() {
    const filteredGames = $selectedGames.filter((game) => game !== '')
    const filteredAssetCategories = $selectedAssetCategories.filter(
        (category) => category !== ''
    )
    const query = searchInput.value.trim().replace(/ /g, '-')

    let url = 'https://v2-api-testing.wanderer.moe/search?'

    if (query) url += new URLSearchParams({ query })

    if (filteredGames.length > 0) url += `&game=${filteredGames.join(',')}`

    if (filteredAssetCategories.length > 0)
        url += `&asset=${filteredAssetCategories.join(',')}`

    fetch(url)
        .then((res) => res.json())
        .then((res) => {
            data = res
            results = res.results
        })
}

function searchForAssets() {
    replaceStateWithQuery({
        query: searchInput.value.replace(/ /g, '-') || '',
        game: $selectedGames.join(',') || '',
        asset: $selectedAssetCategories.join(',') || '',
    })
    makeRequest()
}

function handleImageChange(newImage: string) {
    nextImage = newImage
    focusedImageElement.src = `https://cdn.wanderer.moe/${newImage}/cover.png`
    isFading = true
}

function toggleAssetCategory(asset: string): void {
    if (!$selectedAssetCategories.includes(asset)) {
        selectedAssetCategories.update((assets) => [...assets, asset])
    } else {
        selectedAssetCategories.update((assets) =>
            assets.filter((selectedAsset) => selectedAsset !== asset)
        )
    }
}

function handleGameSelection(game: string): void {
    handleImageChange(game)

    if (!$selectedGames.includes(game)) {
        selectedGames.update((games) => [...games, game])
    } else {
        selectedGames.update((games) =>
            games.filter((selectedGame) => selectedGame !== game)
        )
    }

    validAssetCategories = []
    games.forEach((game) => {
        if ($selectedGames.includes(game.name)) {
            game.assetCategories.forEach((category) => {
                if (!validAssetCategories.includes(category)) {
                    validAssetCategories.push(category)
                }
            })
        }
    })

    if ($selectedGames.length === 0 && $selectedAssetCategories.length > 0) {
        return
    }

    selectedAssetCategories.set(
        $selectedAssetCategories.filter((category) =>
            validAssetCategories.includes(category)
        )
    )
}

function handleViewMore() {
    numAssetsToDisplay += 50
}

getAssetCategoriesFromGames()
</script>

<svelte:head>
    <title>wanderer.moe</title>
    <meta
        name="description"
        content="wanderer.moe is a website that allows you to search for and download thousands of assets from various games." />
</svelte:head>

<div class="min-h-screen">
    <div class="mb-8">
        <div class="px-2 md:px-12 lg:px-48">
            <div class="relative my-8">
                <img
                    src="https://cdn.wanderer.moe/{focusedImage}/cover.png"
                    class="absolute inset-0 h-48 w-full rounded-md object-cover"
                    style="object-position: 50% 20%;"
                    alt="{focusedImage} cover" />
                <img
                    src=""
                    class="absolute inset-0 h-48 w-full rounded-md object-cover opacity-0"
                    style="object-position: 50% 20%;"
                    bind:this="{focusedImageElement}"
                    alt=""
                    class:fade-in="{isFading}"
                    on:animationend="{() => {
                        if (isFading) {
                            focusedImage = nextImage
                            isFading = false
                        }
                    }}" />
                <div class="relative h-48 rounded-md bg-main-500/50">
                    <div
                        class="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
                        <div
                            class="flex flex-col items-center justify-between xl:flex-row">
                            <div>
                                <h1
                                    class="max-w-lg text-3xl font-bold text-white sm:text-4xl sm:leading-none">
                                    wanderer.moe
                                </h1>
                                <h2 class="max-w-xl text-xl text-white">
                                    {$t('home.description')}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- todo: fix this monstrosity -->
            <div>
                <div>
                    <div class="flex gap-2">
                        <input
                            type="text"
                            bind:this="{searchInput}"
                            placeholder="Search"
                            class="mb-4 w-full rounded-md border border-main-300 bg-main-500 px-4 py-4 text-lg text-white transition hover:border-main-200 focus:outline-none" />
                        <button
                            class="mb-4 flex items-center rounded-md border border-main-300 bg-main-500 px-4 py-2 text-lg text-white transition hover:border-main-200"
                            on:click="{searchForAssets}">
                            <i class="fas fa-search mr-2"></i>
                            Search</button>
                    </div>
                    <div class="mb-4">
                        <div class="flex flex-wrap gap-2">
                            {#each games as game}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div
                                    class="cursor-pointer rounded-md border bg-main-500 px-4 py-1.5 text-lg text-white transition hover:border-main-200
                                    {$selectedGames.includes(game.name)
                                        ? 'border-main-200'
                                        : 'border-main-300'}
                                    "
                                    on:click="{() =>
                                        handleGameSelection(game.name)}">
                                    <div>
                                        <!-- <img
                                        src="https://cdn.wanderer.moe/{game.name}/icon.png"
                                        class="mr-2 h-8 w-8 rounded-md"
                                        alt="{game.name} icon" /> -->
                                        {mapGame(game.name)}
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                    <div class="mb-8">
                        <div class="flex flex-wrap gap-2">
                            {#each allAssetCategories as asset}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div
                                    on:click="{() =>
                                        validAssetCategories.length === 0 ||
                                        validAssetCategories.includes(asset)
                                            ? toggleAssetCategory(asset)
                                            : null}"
                                    class="rounded-md border bg-main-500 px-4 py-1.5 text-lg text-white transition
                                    {validAssetCategories.length === 0 ||
                                    validAssetCategories.includes(asset)
                                        ? 'cursor-pointer hover:border-main-200'
                                        : 'cursor-not-allowed opacity-50'} 
                                    {$selectedAssetCategories.includes(asset)
                                        ? 'border-main-200'
                                        : 'border-main-300'} ">
                                    {mapAssetType(asset)}
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
                {#if results.length > 0}
                    <div class="grid grid-cols-1 gap-7 lg:grid-cols-2">
                        {#each results.slice(0, numAssetsToDisplay) as asset}
                            <div transition:fly="{{ y: 200, delay: 100 }}">
                                <AssetItem asset="{asset}" user="{user}" />
                            </div>
                        {/each}
                        <!-- {#if results.length % 2 !== 0}
                            <div></div>
                        {/if} -->
                    </div>
                {/if}
                {#if results.length === 0}
                    <div>
                        <p class="text-center text-2xl text-white">
                            No results found.
                        </p>
                    </div>
                {:else if results.length > numAssetsToDisplay}
                    <div class="flex justify-center">
                        <button
                            class="my-8 cursor-pointer rounded-md border border-main-300 bg-main-500 px-20 py-2.5 text-lg text-white hover:border-main-200"
                            on:click="{handleViewMore}">
                            View More
                        </button>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>
