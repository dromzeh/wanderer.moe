<script>
import { t } from 'svelte-i18n'
import UserDropdown from './UserDropdown.svelte'

export let user
console.log(user)
</script>

{#if user?.emailVerified === 0}
    <div class="w-full bg-main-500 p-3 text-center">
        <p class="text-red-200">
            Your email is not verified. Please check your email {user?.email} for
            a verification link.
        </p>
    </div>
{/if}
<header
    class="sticky top-0 z-50 w-full border-b border-main-300 bg-main-500 bg-opacity-75 p-2 backdrop-blur-lg backdrop-filter transition-opacity">
    <div class="mx-auto flex flex-wrap items-center justify-between">
        <div class="md:px-12 lg:px-16">
            <a href="/" class="flex items-center gap-1" rel="external">
                <img src="/logo.png" alt="logo" class="h-12 w-12" />
                <div class="flex flex-col">
                    <span class="text text-xl font-bold text-white"
                        >wanderer.moe</span>
                </div>
            </a>
        </div>

        <div class="flex items-center md:px-20">
            <div>
                {#if user}
                    <UserDropdown user="{user}" />
                {:else}
                    <button class="px-2 text-lg focus:outline-none">
                        <a href="/account/login">
                            <i
                                class="fa-solid fa-sign-in-alt cursor-pointer text-gray-300 transition hover:text-white"
                            ></i>
                        </a>
                    </button>
                {/if}
            </div>
            <div class="h-6 w-px bg-gray-300/50 mx-2"></div>
            <button class="px-2 text-lg focus:outline-none">
                <a
                    href="https://discord.wanderer.moe/"
                    target="_blank"
                    rel="noopener noreferrer">
                    <i
                        class="fa-brands fa-discord cursor-pointer text-gray-300 transition hover:text-white"
                    ></i>
                </a>
            </button>
            <button class="px-2 text-lg focus:outline-none">
                <a
                    href="https://git.wanderer.moe/"
                    target="_blank"
                    rel="noopener noreferrer">
                    <i
                        class="fa-brands fa-github cursor-pointer text-gray-300 transition hover:text-white"
                    ></i>
                </a>
            </button>
        </div>
    </div>
</header>
