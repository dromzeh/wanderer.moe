<script lang="ts">
import { fly, fade } from 'svelte/transition'
import { cubicOut, quintOut } from 'svelte/easing'
import {
    possessivePronouns,
    subjectPronouns,
    objectPronouns,
} from '@/lib/helpers/user/pronouns'

export let pronounsList,
    currentSelected,
    type: 'subject' | 'object' | 'possessive'

let listOpen = false

// $: document.body.style.overflow = listOpen ? 'hidden' : 'auto' // prevent accidental scrolling when dropdown is open
</script>

<div class="relative w-full">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="relative text-center transition-colors border-main-300 border w-full rounded-md px-1 hover:cursor-pointer {listOpen
            ? 'bg-main-500 z-[90]'
            : 'bg-main-600 hover:bg-main-500'}"
        on:keypress="{() => (listOpen = !listOpen)}"
        on:click="{() => (listOpen = !listOpen)}">
        {currentSelected ?? 'Select Pronouns'}
    </div>
    {#if listOpen}
        <div
            in:fly|global="{{ y: -15, easing: quintOut, duration: 200 }}"
            out:fly|global="{{ y: -10, easing: cubicOut, duration: 100 }}"
            class="absolute top-8 z-[90] bg-main-600 border-main-300 border w-full rounded-md p-1 overflow-y-auto h-48">
            <div class="grid gap-1">
                {#each pronounsList as pronoun}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div
                        class="text-center transition-colors rounded-md cursor-pointer {pronoun ===
                        currentSelected
                            ? 'bg-main-500 hover:bg-main-400'
                            : 'hover:bg-main-500'} p-1"
                        on:click="{() => {
                            currentSelected = pronoun
                            listOpen = false
                        }}">
                        <p>
                            {pronoun}
                        </p>
                        <p class="text-gray-400 text-xs">
                            <span
                                class="{type === 'subject'
                                    ? 'text-white'
                                    : 'text-gray-400'}"
                                >{subjectPronouns[
                                    pronounsList.indexOf(pronoun)
                                ]}</span>
                            <span
                                class="{type === 'object'
                                    ? 'text-white'
                                    : 'text-gray-400'}"
                                >{objectPronouns[
                                    pronounsList.indexOf(pronoun)
                                ]}</span>
                            <span
                                class="{type === 'possessive'
                                    ? 'text-white'
                                    : 'text-gray-400'}"
                                >{possessivePronouns[
                                    pronounsList.indexOf(pronoun)
                                ]}</span>
                        </p>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>

{#if listOpen}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="fixed top-0 left-0 w-full h-full bg-black opacity-70 z-[70] backdrop-blur-sm backdrop-filter"
        in:fade|global="{{ duration: 200 }}"
        out:fade|global="{{ duration: 100 }}"
        on:click="{() => (listOpen = false)}">
    </div>
{/if}
