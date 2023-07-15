<script lang="ts">
import { fade } from 'svelte/transition'
import { cubicOut, quintOut } from 'svelte/easing'
import { enhance } from '$app/forms'
// import { Turnstile } from 'svelte-turnstile'
export let form

import {
    checkEmail,
    checkPassword,
    checkUsername,
} from '$lib/helpers/auth/account/check'

let formData = {
    username: '',
    email: '',
    password: '',
    verifyPassword: '',
}

let checks = {
    username: false,
    email: false,
    password: false,
    verifyPassword: false,
}
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
                class="mx-auto my-4 w-full rounded-mdborder border-main-300 bg-main-500 p-3 text-gray-400 transition-all md:w-2/3 lg:w-1/2">
                <p class="text-red-100">
                    An error occured: {form.message ?? 'Unknown error'}
                </p>
            </div>
        {/if}
        <div
            class="mx-auto my-4 w-full rounded-md border border-main-300 bg-main-500 p-3 text-gray-400 transition-all md:w-2/3 lg:w-1/2">
            <div class="text-center">
                <h1 class="text-xl font-bold text-white">Create Account</h1>
                <h2 class="text-sm">
                    Already have an account? <a
                        href="/account/login"
                        class="text-white hover:underline">Log In</a>
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
                                bind:value="{formData.username}"
                                on:change="{() =>
                                    (checks.username = checkUsername(
                                        formData.username
                                    ))}"
                                name="username"
                                id="username"
                                class="rounded-md bg-main-600 p-1.5 text-white transition hover:ring-2 hover:ring-main-300 focus:outline-none focus:ring-2 focus:ring-main-300"
                                placeholder="username" />
                            {#if !checks.username && formData.username.length > 0}
                                <p class="mt-1 text-xs text-red-200">
                                    5 to 16 characters.
                                </p>
                            {/if}
                        </div>
                        <div class="flex flex-col">
                            <label for="email" class="text-white"
                                >Email Address</label>
                            <input
                                type="email"
                                bind:value="{formData.email}"
                                on:change="{() =>
                                    (checks.email = checkEmail(
                                        formData.email
                                    ))}"
                                name="email"
                                id="email"
                                class="rounded-md bg-main-600 p-1.5 text-white transition hover:ring-2 hover:ring-main-300 focus:outline-none focus:ring-2 focus:ring-main-300"
                                placeholder="email@domain.com" />
                            {#if !checks.email && formData.email.length > 0}
                                <p class="mt-1 text-xs text-red-200">
                                    Please enter a valid email address.
                                </p>
                            {/if}
                        </div>
                        <div class="flex flex-col">
                            <label for="password" class=" text-white"
                                >Password</label>
                            <input
                                type="password"
                                bind:value="{formData.password}"
                                on:change="{() =>
                                    (checks.password = checkPassword(
                                        formData.password
                                    ))}"
                                name="password"
                                id="password"
                                class="rounded-md bg-main-600 p-1.5 text-white transition hover:ring-2 hover:ring-main-300 focus:outline-none focus:ring-2 focus:ring-main-300"
                                placeholder="••••••••••" />
                            {#if !checks.password && formData.password.length > 0}
                                <p class="mt-1 text-xs text-red-200">
                                    Password must be 8 characters, have one
                                    uppercase & lowerecase letter, one digit,
                                    and one special character.
                                </p>
                            {/if}
                        </div>
                        <div class="flex flex-col">
                            <label
                                for="verifyPassword"
                                class="text-sm text-white"
                                >Confirm Password</label>
                            <input
                                type="password"
                                bind:value="{formData.verifyPassword}"
                                on:change="{() =>
                                    (checks.verifyPassword =
                                        formData.password ===
                                        formData.verifyPassword)}"
                                name="verifyPassword"
                                id="verifyPassword"
                                disabled="{!checks.password}"
                                class="rounded-md bg-main-600 p-1.5 text-white transition
                                    {checks.password
                                    ? 'hover:ring-2 hover:ring-main-300 focus:outline-none focus:ring-2 focus:ring-main-300'
                                    : 'opacity-50'}
                                    "
                                placeholder="••••••••••" />
                            {#if checks.password && !checks.verifyPassword && formData.verifyPassword.length > 0}
                                <p class="mt-1 text-xs text-red-200">
                                    Passwords do not match.
                                </p>
                            {/if}
                        </div>
                        <!-- <div class="flex flex-col">
                            <Turnstile siteKey="SITE_KEY" theme="dark" />
                        </div> -->
                        <div class="flex flex-col">
                            <button
                                type="submit"
                                disabled="{Object.values(checks).every(
                                    (check) => !check
                                )}"
                                on:click="{() => console.log('clicked')}"
                                class="btn mt-4 px-2 py-1 transition
                            {Object.values(checks).every((check) => check)
                                    ? ''
                                    : 'cursor-not-allowed opacity-50'}"
                                >Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
