<script>
import { onMount } from 'svelte'

let bio = ''
export let user

onMount(() => {
    bio = user.bio || ''
})
</script>

<div
    class="bg-main-500 border border-main-300 rounded-md text-white p-2"
    id="bio">
    <p class="text-lg font-bold">Bio</p>
    <p class="text-xs text-gray-400">
        Your bio will be displayed on your profile page, and will be visible to
        other users. Limited to 200 characters.
    </p>
    <textarea
        class="h-20 resize-none mt-2 w-full rounded-md border {bio.length >= 200
            ? 'border-red-200 hover:border-red-200'
            : 'border-main-300 hover:border-main-200'} bg-main-600 p-1 text-white transition focus:outline-none"
        maxlength="200"
        bind:value="{bio}"></textarea>
    <p
        class="text-xs text-right transition {bio.length >= 200
            ? 'text-red-200'
            : 'text-gray-400'}"
        id="bio-char-count">
        {bio.length}/200
    </p>
</div>
