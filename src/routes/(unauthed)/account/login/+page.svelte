<script lang="ts">
import { fade } from 'svelte/transition'
import { cubicOut, quintOut } from 'svelte/easing'
import { enhance } from '$app/forms'
export let form
</script>

<svelte:head>
    <title>Create Account</title>
</svelte:head>

<div class="min-h-screen">
    <div class="px-2 py-24 md:px-12 lg:px-24">
        {#if form?.message}
            <div
                in:fade|global="{{ easing: quintOut, duration: 750 }}"
                out:fade|global="{{ easing: cubicOut, duration: 300 }}"
                class="mx-auto my-4 w-full rounded-md border border-main-300 bg-main-500 p-3 text-gray-400 transition-all md:w-2/3 lg:w-1/2">
                <p class="text-red-100">
                    An error occured: {form.message ?? 'Unknown error'}
                </p>
            </div>
        {/if}
        <div
            class="mx-auto my-4 w-full rounded-md border border-main-300 bg-main-500 p-3 text-gray-400 transition-all md:w-2/3 lg:w-1/2">
            <div class="text-center">
                <h1 class="text-xl font-bold text-white">Login</h1>
                <h2 class="text-sm">
                    Don't have an account? <a
                        href="/account/signup"
                        class="text-white hover:underline">Sign Up</a>
                </h2>
            </div>
            <div class="mt-4">
                <form method="post" use:enhance>
                    <div class="flex flex-col gap-y-2">
                        <div class="flex flex-col">
                            <label for="username" class="text-white"
                                >Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                class="rounded-md bg-main-600 p-1.5 text-white transition hover:ring-2 hover:ring-main-300 focus:outline-none focus:ring-2 focus:ring-main-300"
                                placeholder="username" />
                        </div>
                        <div class="flex flex-col">
                            <label for="password" class=" text-white"
                                >Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                class="rounded-md bg-main-600 p-1.5 text-white transition hover:ring-2 hover:ring-main-300 focus:outline-none focus:ring-2 focus:ring-main-300"
                                placeholder="••••••••••" />
                            <div class="flex flex-col">
                                <!-- TODO: add turnstile -->
                                <button
                                    type="submit"
                                    on:click="{() => console.log('clicked')}"
                                    class="btn mt-4 px-2 py-1 transition">
                                    Log In</button>
                            </div>
                            <p class="text-sm text-gray-400 mt-2">
                                Forgot your password? <a
                                    href="/account/forgot-password"
                                    class="text-white hover:underline"
                                    >Reset it</a>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
