<script>
import { onMount } from 'svelte'
import { fly } from 'svelte/transition'
import { cubicOut, quintOut } from 'svelte/easing'
import { locale } from 'svelte-i18n'

let menuOpen = false

// TODO: finish correct RTL arabic support
// { id: "ar", label: "العربية" }

const languages = [
    { id: 'en', label: 'English' },
    { id: 'nl', label: 'Nederlands' },
    { id: 'ja', label: '日本語' },
    { id: 'it', label: 'Italiano' },
    { id: 'ro', label: 'Română' },
    { id: 'sv', label: 'Svenska' },
    { id: 'vi', label: 'Tiếng Việt' },
    { id: 'lol', label: 'LOLCAT' },
    { id: 'ar', label: 'العربية' },
]

$: currentLocale =
    $locale !== null
        ? languages.find((e) => e.id === $locale.substring(0, 3)) || {
              // substring 3 allows for lolcat
              id: 'en',
              label: 'English',
          }
        : ''

$: locales = languages

function changeLocale(lang) {
    locale.set(lang)
    console.log('Locale changed to ' + lang)
}
</script>

<div class="select-none">
    <div
        class="relative z-50 mx-auto flex w-80 cursor-pointer select-none items-center justify-center rounded-xl">
        <div
            aria
            role="button"
            tabindex="0"
            on:keypress="{() => (menuOpen = !menuOpen)}"
            on:click="{() => (menuOpen = !menuOpen)}"
            class="flex w-full items-center justify-center rounded-xl border border-main-300 bg-main-600 p-1 transition-colors duration-150 hover:border-main-200 hover:bg-main-500">
            <!-- <span>Language</span> -->
            <img
                class="ml-2 mr-1 h-4 w-4 rounded-md"
                alt="{currentLocale.label}"
                src="https://cdn.wanderer.moe/locales/{currentLocale.id}.png" />
            <span class="text-white">{currentLocale.label}</span>
        </div>
        {#if menuOpen}
            <div
                in:fly|global="{{ y: 15, easing: quintOut, duration: 200 }}"
                out:fly|global="{{ y: 10, easing: cubicOut, duration: 200 }}"
                class="absolute bottom-8 z-50 mb-2 w-full">
                <div
                    class="grid grid-cols-1 gap-1 rounded-xl border border-main-300 bg-main-600 p-1 transition-colors duration-150 sm:grid-cols-2">
                    {#each locales as locale}
                        <div
                            aria
                            role="button"
                            tabindex="0"
                            class="flex items-center p-1 text-left {locale.id ===
                            currentLocale.id
                                ? 'bg-main-500 hover:bg-main-300'
                                : 'hover:bg-main-500'} rounded-lg transition-colors duration-200"
                            on:keypress="{() => changeLocale(locale.id)}"
                            on:click="{() => changeLocale(locale.id)}">
                            <img
                                class="mr-2 h-4 w-4 rounded-md"
                                alt="{locale.label}"
                                src="https://cdn.wanderer.moe/locales/{locale.id}.png" />
                            <span class="cursor-pointer text-gray-400"
                                >{locale.label}</span>
                        </div>
                    {/each}
                    <div
                        class="btn col-span-1 mt-1 flex items-center justify-center p-1 sm:col-span-2">
                        <a
                            href="https://github.com/wanderer-moe/site/blob/development/CONTRIBUTING.md#contributing-to-translations">
                            <span class=" text-white">
                                <i class="fas fa-external-link-alt text-sm"></i>
                                Contribute towards translations
                            </span></a>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>

{#if menuOpen}
    <div
        aria
        role="button"
        tabindex="0"
        class="fixed left-0 top-0 z-10 h-full w-full"
        on:click="{() => (menuOpen = false)}"
        on:keypress="{() => (menuOpen = false)}">
    </div>
{/if}
