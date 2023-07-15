<script>
import { cubicOut, quintOut } from 'svelte/easing'
import { fly } from 'svelte/transition'
let menuOpen = false
export let user
</script>

<div class="px-2">
    <div
        class="relative z-50 mx-auto flex cursor-pointer items-center justify-center rounded-xl text-gray-300">
        <div
            aria
            role="button"
            tabindex="0"
            on:keypress="{() => (menuOpen = !menuOpen)}"
            on:click="{() => (menuOpen = !menuOpen)}">
            {#if user.avatarUrl}
                <!-- TODO: if user.avatarUrl is not equal to default image url... -->
                <img
                    src="{user.avatarUrl}?size=512"
                    alt="{user.username} avatar"
                    class="h-6 w-6 rounded-full" />
            {:else}
                <!-- TODO: placeholder until default image is implemented . -->
                <div class="h-6 w-6 rounded-full bg-main-300 text-center">
                    {user.username[0].toUpperCase()}
                </div>
            {/if}
        </div>
        {#if menuOpen}
            <div
                in:fly|global="{{ y: -15, easing: quintOut, duration: 200 }}"
                out:fly|global="{{ y: -10, easing: cubicOut, duration: 100 }}"
                class="absolute top-8 z-50 mb-2 w-40">
                <div
                    class="grid grid-cols-1 gap-1 rounded-xl border border-main-300 bg-main-500 p-1 transition-colors duration-150 cursor-default">
                    <div class="p-1 text-white text-sm">
                        <p>{user?.username}</p>
                        <p class="text-gray-300 text-xs overflow-x-hidden">
                            {user?.email}
                        </p>
                    </div>
                    <div class="h-px px-2 w-full bg-main-300"></div>
                    <div>
                        <a
                            aria
                            role="button"
                            tabindex="0"
                            href="/user/{user?.username}"
                            rel="external"
                            class="flex items-center p-1 text-left hover:bg-main-400 rounded-lg transition-colors duration-200 hover:text-white">
                            <span class="cursor-pointer">View Profile</span>
                        </a>
                    </div>
                    <div>
                        <a
                            aria
                            role="button"
                            tabindex="0"
                            href="/upload/"
                            rel="external"
                            class="flex items-center p-1 text-left hover:bg-main-400 rounded-lg transition-colors duration-200 hover:text-white">
                            <span class="cursor-pointer">Upload Assets</span>
                        </a>
                    </div>
                    <div>
                        <a
                            aria
                            role="button"
                            tabindex="0"
                            href="/account/"
                            rel="external"
                            class="flex items-center p-1 text-left hover:bg-main-400 rounded-lg transition-colors duration-200 hover:text-white">
                            <span class="cursor-pointer">Account Settings</span>
                        </a>
                    </div>
                    <div>
                        <a
                            aria
                            role="button"
                            tabindex="0"
                            href="/account/connections/"
                            rel="external"
                            class="flex items-center p-1 text-left hover:bg-main-400 rounded-lg transition-colors duration-200 hover:text-white">
                            <span class="cursor-pointer">Connections</span>
                        </a>
                    </div>
                    <div>
                        <a
                            aria
                            role="button"
                            tabindex="0"
                            href="/account/logout/"
                            rel="external"
                            class="flex items-center p-1 text-left hover:bg-main-500 rounded-lg transition-colors duration-200 hover:text-white">
                            <span class="cursor-pointer">Logout</span>
                        </a>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>
