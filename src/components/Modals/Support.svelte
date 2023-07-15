<script lang="ts">
import { cubicOut, quintOut } from 'svelte/easing'
import { fly, fade } from 'svelte/transition'

export let closeContribute
</script>

<div>
    <div
        class="fixed left-1/2 top-1/2 z-[80] w-3/4 -translate-x-1/2 -translate-y-1/2 transform"
        in:fly|global="{{ y: 50, easing: quintOut, duration: 750 }}"
        out:fly|global="{{ y: 50, easing: cubicOut, duration: 300 }}">
        <button
            class="close-button absolute right-0 top-6 rounded-lg p-4 text-white"
            on:click="{() => closeContribute()}">
            ✕
        </button>
        <div
            class="mt-6 rounded-lg bg-main-500 border border-main-300 p-8 text-gray-400">
            <div>
                <div class="flex justify-center">
                    <div class="rtl flex flex-col items-center gap-2">
                        <img
                            src="https://cdn.wanderer.moe/genshin-impact/emotes/cat.png"
                            alt="cat"
                            class="h-12 w-12" />
                        <p
                            class="bg-gradient-to-tr from-accent-100 to-white bg-clip-text text-lg font-semibold text-transparent">
                            Support Us / Contribute
                        </p>
                    </div>
                </div>
                <div class="mt-2">
                    <div class="mb-2 grid gap-3 text-center">
                        <p class="text-sm">
                            wanderer.moe <span class="font-semibold text-white"
                                >will always be free to use, untracked, and
                                (mostly) ad-free.</span>
                            If you like this website, please consider contributing
                            or
                            <a
                                href="https://buymeacoffee.com/marcelmd"
                                target="_blank"
                                class="text-accent-100 hover:text-white transition hover:font-semibold"
                                >donating</a> to help keep it running.
                        </p>
                        <p class="text-sm">
                            All donations go directly towards server costs,
                            maintenance, and development of new assets &
                            features for wanderer.moe - our sole goal is to
                            simply provide resources for this community.
                        </p>
                        <p class="text-sm">
                            If you're interested in reading more, there's a <a
                                class="text-accent-100 hover:text-white transition hover:font-semibold"
                                target="_blank"
                                href="https://dromzeh.dev/posts/wanderer-moe-website-breakdown/"
                                >blog post</a> breaking down how the site is built,
                            maintained and hosted.
                        </p>
                        <p class="text-sm">
                            If you want to help contribute, please join our <a
                                class="text-accent-100 hover:text-white transition hover:font-semibold"
                                target="_blank"
                                href="https://discord.wanderer.moe/"
                                >discord server.</a> You will be credited for your
                            contributions on the site and within the Discord.
                        </p>
                        <p class="text-xs">
                            For any other inquires, <a
                                class="text-accent-100 hover:text-white transition hover:font-semibold"
                                href="mailto:marcel@wanderer.moe"
                                >send an email!</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button
        class="fixed top-0 left-0 w-full h-full bg-black opacity-70 z-[70] backdrop-blur-sm backdrop-filter"
        in:fade|global="{{ duration: 200 }}"
        out:fade|global="{{ duration: 100 }}"
        on:click="{() => closeContribute()}"
        on:keypress="{() => closeContribute()}">
    </button>
</div>
