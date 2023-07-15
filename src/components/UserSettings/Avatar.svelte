<script lang="ts">
import { getImageResolution } from '$lib/helpers/asset/getImageResolution'
import { bytesToFileSize } from '$lib/helpers/asset/bytesToFileSize'

let imageErrorText = ''
let selectedAvatar = null
let avatarSelected = false

async function uploadAvatar() {
    if (!selectedAvatar) return (imageErrorText = 'No image selected')
    const resolution = await getImageResolution(
        URL.createObjectURL(selectedAvatar.files[0])
    )
    if (!resolution) return (imageErrorText = 'Invalid image')
    const [width, height] = resolution.split(' x ')
    if (parseInt(width) < 500 || parseInt(width) > 1000) {
        return (imageErrorText = `Image width must be between 500 and 1000 pixels, the image you selected is ${width}px wide`)
    }

    if (parseInt(height) < 500 || parseInt(height) > 1000) {
        return (imageErrorText = `Image height must be between 500 and 1000 pixels, the image you selected is ${height}px tall`)
    }

    if (selectedAvatar.files[0].size > 5000000) {
        return (imageErrorText = `Image size must be less than 5mb, the image you selected is ${bytesToFileSize(
            selectedAvatar.files[0].size
        )}`)
    }

    avatarSelected = true
}

export let user
</script>

<div
    class="bg-main-500 border border-main-300 rounded-md text-white p-2"
    id="profile">
    <p class="text-lg font-bold">Your Profile Picture</p>
    <p class="text-xs text-gray-400">
        Your avatar will be displayed on your profile page, and will be visible
        to other users.
    </p>
    {#if imageErrorText}
        <p class="text-red-100 text-xs mt-2">{imageErrorText}</p>
    {/if}
    <div class="flex flex-row mt-2">
        <div>
            <input
                type="file"
                accept="image/*"
                class="hidden"
                id="avatar-upload"
                bind:this="{selectedAvatar}"
                on:change="{uploadAvatar}" />
            <label for="avatar-upload" class="cursor-pointer">
                {#if user.avatar_url}
                    <img
                        src="{user.avatar_url}"
                        alt="{user.username}'s avatar"
                        class="w-24 h-24 border border-main-300 object-contain rounded-md" />
                {:else if avatarSelected}
                    <img
                        src="{URL.createObjectURL(selectedAvatar.files[0])}"
                        alt="Your avatar"
                        class="w-24 h-24 border border-main-300 object-contain rounded-md" />
                {:else}
                    <div
                        class="w-24 h-24 bg-main-600 border border-main-300 rounded-md">
                    </div>
                {/if}
            </label>
        </div>
        <div class="ml-4 my-auto text-gray-400 text-xs">
            Click on your profile picture to change it. <br />
            <span class="text-red-100">Note: </span> Your profile picture will be
            resized to 512x512 pixels on upload.
        </div>
    </div>
</div>
