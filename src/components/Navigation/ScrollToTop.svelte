<script>
import { onMount } from 'svelte'
import { fade } from 'svelte/transition'

let buttonVisible = false

onMount(() => {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            buttonVisible = true
        } else {
            buttonVisible = false
        }
    })
})

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}
</script>

{#if buttonVisible}
    <div
        class="fixed bottom-0 right-0 z-[29] mb-9 mr-7"
        in:fade|global="{{ duration: 150 }}"
        out:fade|global="{{ duration: 150 }}">
        <button
            class="rounded-full bg-main-800 bg-opacity-70 p-2 px-3 py-2 font-bold text-white backdrop-blur-lg backdrop-filter transition-all hover:bg-main-600"
            on:click="{scrollToTop}">
            <i class="fas fa-chevron-up text-lg"></i>
        </button>
    </div>
{/if}
