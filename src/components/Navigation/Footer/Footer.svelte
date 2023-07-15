<script>
import { t } from 'svelte-i18n'
import LocaleDropdown from '@/components/Locale/LocaleDropdown.svelte'
import Status from '@/components/Navigation/Footer/Status.svelte'
import Contribute from '@/components/Modals/Support.svelte'
import CheckUA from '@/components/Modals/CheckUA.svelte'
const currentYear = new Date().getFullYear()

let contributeOpen = false
let checkUAOpen = false
</script>

<footer
    class="border-t border-main-300 bg-main-500 bg-opacity-75 p-3 text-gray-400 backdrop-blur-lg backdrop-filter transition-opacity">
    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="md:flex md:justify-between">
            <div class="mb-6 md:mb-0">
                <a href="/" class="flex items-center gap-1" rel="external"
                    ><img src="/logo.png" alt="logo" class="h-12 w-12" />
                    <span class="text text-xl font-bold text-white"
                        >wanderer.moe</span
                    ></a>
                <div class="mt-2 grid gap-2">
                    <Status />
                    <LocaleDropdown />
                </div>
            </div>
            <div class="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
                <div>
                    <p class="mb-6 font-semibold text-white">Socials</p>
                    <ul>
                        <li class="mb-4">
                            <a
                                href="https://git.wanderer.moe/"
                                class="hover:font-semibold hover:text-white transition-colors"
                                >GitHub</a>
                        </li>
                        <li class="mb-4">
                            <a
                                href="https://discord.wanderer.moe/"
                                class="hover:font-semibold hover:text-white transition-colors"
                                >Discord Server</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <p class="mb-6 font-semibold text-white">Legal</p>
                    <ul>
                        <li class="mb-4">
                            <a
                                href="/legal/privacy-policy"
                                class="hover:font-semibold hover:text-white transition-colors"
                                >Privacy Policy</a>
                        </li>
                        <li class="mb-4">
                            <a
                                href="/legal/terms-of-service"
                                class="hover:font-semibold hover:text-white transition-colors"
                                >Terms of Service</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <p class="mb-6 font-semibold text-white">Other</p>
                    <ul>
                        <li class="mb-4">
                            <a
                                href="/docs/api"
                                class="hover:font-semibold hover:text-white transition-colors"
                                >API Documentation</a>
                        </li>
                        <!-- <li class="mb-4">
                            <a
                                href="https://wanderer.moe/asset-request-form"
                                class="hover:font-semibold hover:text-white"
                                >Asset Request Form</a>
                        </li> -->
                        <li class="mb-4">
                            <a
                                href="/contributors"
                                class="hover:font-semibold hover:text-white transition-colors"
                                >Contributors</a>
                        </li>
                        <li class="mb-4">
                            <button
                                on:keypress="{() => (contributeOpen = true)}"
                                on:click="{() => (contributeOpen = true)}"
                                class="cursor-pointer hover:font-semibold hover:text-white transition-colors">
                                Support Us / Contribute
                            </button>
                        </li>
                        <li>
                            <button
                                on:keypress="{() => (checkUAOpen = true)}"
                                on:click="{() => (checkUAOpen = true)}"
                                class="cursor-pointer hover:font-semibold hover:text-white transition-colors">
                                Check User Agent
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <hr class="my-6 border-main-300 sm:mx-auto lg:my-8" />
        <div class="text-center">
            <div>
                <p class="text-sm">
                    © 2022-{currentYear} — {$t('footer.fanmadeNotice')}
                </p>
                <p class="text-xs">
                    Created with <i class="fas fa-heart text-red-500"></i> by
                    <a
                        href="https://dromzeh.dev/?ref=wanderer.moe"
                        class="hover:font-semibold hover:text-white transition-colors"
                        >dromzeh</a
                    >, powered by
                    <a
                        href="https://cloudflare.com/"
                        class="hover:font-semibold hover:text-white transition-colors"
                        >Cloudflare</a>
                </p>
            </div>
        </div>
    </div>
</footer>

{#if contributeOpen}
    <Contribute closeContribute="{() => (contributeOpen = false)}" />
{/if}

{#if checkUAOpen}
    <CheckUA closeCheckUA="{() => (checkUAOpen = false)}" />
{/if}
