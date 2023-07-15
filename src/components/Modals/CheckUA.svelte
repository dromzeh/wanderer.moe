<script lang="ts">
import { fly, fade } from 'svelte/transition'
import { cubicOut, quintOut } from 'svelte/easing'
import { fixCasing } from '$lib/helpers/casing/fixCasing'
const ua = navigator.userAgent.toLowerCase()

// Windows, Linux, MacOS: (+Safari), Chrome, Firefox
// Android: Default browser
// iOS: Safari

const browserMap = {
    windows: ['chrome', 'firefox'],
    linux: ['chrome', 'firefox'],
    macos: ['chrome', 'firefox', 'safari'],
    android: ['your default browser'],
    ios: ['safari'],
}

const os = (() => {
    const match = ua.match(/windows|linux|mac os|android|iphone|ipad/i)
    return match ? match[0].toLowerCase() : 'unknown'
})()

const browser = (() => {
    const match = ua.match(/chrome|firefox|safari/i)
    return match ? match[0].toLowerCase() : 'unknown'
})()

const fixedBrowser = fixCasing(browserMap[os].join(' / '))

export let closeCheckUA

// console.log(os, browser, ua, browserMap[os].includes(browser))
</script>

<div>
    <div
        class="fixed left-1/2 top-1/2 z-[80] w-3/4 -translate-x-1/2 -translate-y-1/2 transform"
        in:fly|global="{{ y: 50, easing: quintOut, duration: 750 }}"
        out:fly|global="{{ y: 50, easing: cubicOut, duration: 300 }}">
        <div
            class="rounded-lg bg-main-500 border border-main-300 p-4 text-gray-400">
            <div class="text-center">
                {#if browserMap[os].includes(browser.toLowerCase())}
                    <p class="mt-2 text-green-100">
                        You're using {fixCasing(browser)} on {fixCasing(os)}, a
                        supported browser for downloading assets.
                    </p>
                    <p class="text-sm">
                        You should not face any issues when downloading assets,
                        but if you do, please go into the #support channel in
                        our Discord.
                    </p>
                {:else}
                    <p class="mt-4 text-red-100">
                        You're not using a supported browser, therefore
                        downloads may not work.
                    </p>
                {/if}
                <p class="text-sm">
                    For your device, it's reccomended to use {fixedBrowser} for downloading
                    assets.
                </p>
                <p class="mt-2 text-xs">
                    Not all browsers are supported when downloading assets. This
                    is due to the way browsers handle downloads, and is out of
                    our control.
                </p>
                <button
                    class="btn mt-4 w-full p-2"
                    on:click="{() => closeCheckUA()}">
                    Understood
                </button>
            </div>
        </div>
    </div>
    <button
        class="fixed top-0 left-0 w-full h-full bg-black opacity-70 z-[70] backdrop-blur-sm backdrop-filter"
        in:fade|global="{{ duration: 200 }}"
        out:fade|global="{{ duration: 100 }}"
        on:click="{() => closeCheckUA()}"
        on:keypress="{() => closeCheckUA()}">
    </button>
</div>
