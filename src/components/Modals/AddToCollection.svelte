<script lang="ts">
import type { Asset } from '@/lib/types/asset'
import { fly, fade } from 'svelte/transition'
import { mapAssetType, mapGame } from '$lib/helpers/casing/gameMapping'
import { quintOut, cubicOut } from 'svelte/easing'

export let asset: Asset, user, closeCollectionPopup
</script>

<div>
    <div
        class="fixed left-1/2 top-1/2 z-[80] w-3/4 -translate-x-1/2 -translate-y-1/2 transform"
        in:fly|global="{{ y: 50, easing: quintOut, duration: 750 }}"
        out:fly|global="{{ y: 50, easing: cubicOut, duration: 300 }}">
        <button
            class="close-button absolute right-0 top-6 rounded-lg p-4 text-white"
            on:click="{closeCollectionPopup}">
            ✕
        </button>
        <div
            class="mt-8 rounded-lg bg-main-500 border border-main-300 p-4 text-gray-400">
            {#if !user}
                <p class=" text-red-100">
                    Please log in or create an account to add {asset.name} to a collection.
                </p>
            {:else}
                <p class="text-white mb-2">
                    Add {asset.name} from
                    {mapAssetType(asset.asset_category)} for {mapGame(
                        asset.game
                    )} to a collection:
                </p>
                <div class="grid grid-cols-1 gap-3">
                    <div
                        class="bg-main-600 transition-colors border border-main-300 hover:bg-main-500 cursor-pointer p-2 text-white rounded-md">
                        <i class="fas fa-plus-circle"></i> Create a new collection
                    </div>
                </div>
            {/if}
        </div>
    </div>
    <button
        class="fixed top-0 left-0 w-full h-full bg-black opacity-70 z-[70] backdrop-blur-sm backdrop-filter"
        in:fade|global="{{ duration: 200 }}"
        out:fade|global="{{ duration: 100 }}"
        on:click="{() => closeCollectionPopup()}"
        on:keypress="{() => closeCollectionPopup()}">
    </button>
</div>
