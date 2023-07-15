<script lang="ts">
// import axios from 'axios'
import { onMount } from 'svelte'
import { fixCasing } from '@/lib/helpers/casing/fixCasing'
import { writable } from 'svelte/store'
import { mapGame } from '@/lib/helpers/casing/gameMapping'
// import { t } from "svelte-i18n"; TODO: i18n support maybe?

export let data

const { game, jsonFile, user } = data

console.log(game, jsonFile)

let options = writable([])

// randomizes all unlocked options
function randomize() {
    options.update((opts) => {
        return opts.map((option) => {
            if (!option.locked) {
                const randomIndex = Math.floor(
                    Math.random() * option.entries.length
                )
                return { ...option, value: option.entries[randomIndex] }
            }
            return option
        })
    })
}

// copies to clipboard for easy sharing
function copyToClipboard(options) {
    const text = options
        .filter(({ value }) => value)
        .map(({ name, value }) => `${name} - ${value}`)
        .join('\n')
    const textWithPath = `${text}\n\n${window.location.href}`
    navigator.clipboard.writeText(textWithPath)
}

// toggles the lock on an option
function toggleLock(option) {
    options.update((opts) => {
        return opts.map((opt) => {
            if (opt.name === option.name) {
                return { ...opt, locked: !opt.locked }
            }
            return opt
        })
    })
}

onMount(async () => {
    options.set(jsonFile.data.options)
    options.update((opts) => {
        return opts.map((opt) => {
            return { ...opt, value: 'None' }
        })
    })
})
</script>

<svelte:head>
    <title>OC Generator ({mapGame(game)}) | wanderer.moe</title>
    <meta
        name="description"
        content="Generate your own OC for {mapGame(
            game
        )} using this randomizer!" />
</svelte:head>

<div class="min-h-screen">
    <div class="mb-8">
        <div class="px-2 md:px-12 lg:px-48">
            <div class="relative my-8">
                <img
                    src="https://cdn.wanderer.moe/{game}/cover.png"
                    class="absolute inset-0 h-48 w-full rounded-md object-cover"
                    style="object-position: 50% 20%;"
                    alt="{game} cover" />
                <div class="relative h-48 rounded-md bg-main-500/50">
                    <div
                        class="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
                        <div
                            class="flex flex-col items-center justify-between xl:flex-row">
                            <div>
                                <h1
                                    class="max-w-lg text-3xl font-bold text-white sm:text-4xl sm:leading-none">
                                    {mapGame(game)}
                                </h1>
                                <h2 class="max-w-xl text-lg text-white">
                                    OC Generator
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div
                        class="mb-2 rounded-lg bg-main-500 p-2 text-white border border-main-300">
                        <div class="mb-3 flex flex-wrap gap-2 text-sm">
                            <button
                                class="btn p-2"
                                on:click="{() => randomize()}">
                                <i class="fa fa-random"></i> Randomize
                            </button>
                            <button
                                class="btn p-2"
                                on:click="{() => copyToClipboard($options)}">
                                <i class="fa-regular fa-clipboard"></i> Copy
                            </button>
                            <button
                                class="btn p-2"
                                on:click="{() =>
                                    options.update((opts) =>
                                        opts.map((opt) => ({
                                            ...opt,
                                            locked: true,
                                        }))
                                    )}">
                                <i class="fa fa-unlock"></i> Lock All
                            </button>
                            <button
                                class="btn p-2"
                                on:click="{() =>
                                    options.update((opts) =>
                                        opts.map((opt) => ({
                                            ...opt,
                                            locked: false,
                                        }))
                                    )}">
                                <i class="fa fa-lock"></i> Unlock All
                            </button>
                        </div>
                        <div>
                            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {#if $options}
                                    {#each $options as option}
                                        <div class="">
                                            <p class="font-semibold text-white">
                                                {option.name}
                                            </p>
                                            <div class="flex items-center">
                                                <button
                                                    class="btn mr-2 p-2"
                                                    on:click="{() =>
                                                        toggleLock(option)}">
                                                    {#if option.locked}
                                                        <i class="fas fa-lock"
                                                        ></i>
                                                    {:else}
                                                        <i class="fas fa-unlock"
                                                        ></i>
                                                    {/if}
                                                </button>
                                                <input
                                                    type="text"
                                                    class="h-10 w-full rounded-lg bg-main-600 text-center text-indigo-400 {option.value &&
                                                    option.locked
                                                        ? 'text-red-200'
                                                        : 'text-accent-200'} border border-main-300 transition focus:outline-none"
                                                    value="{option.value}"
                                                    readonly />
                                            </div>
                                        </div>
                                    {/each}
                                {:else}
                                    <p class="text-white">
                                        Loading options, try refreshing the page
                                        if it takes too long.
                                    </p>
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
