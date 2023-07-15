<script lang="ts">
export let contributor, roleColors
</script>

<div
    class="relative flex flex-col items-center justify-center overflow-hidden rounded-md border border-main-300 bg-main-500 bg-cover p-3 text-white transition duration-150 ease-in-out hover:-translate-y-1 hover:border-main-200">
    <a href="https://discord.com/users/{contributor.id}" target="_blank">
        <img
            src="{contributor.avatar}"
            alt="{contributor.username} avatar"
            class="mb-1 h-16 w-16 rounded-full object-left" />
    </a>
    <p class="mb-1 text-center text-sm font-bold text-white">
        {contributor.username}
        {#if contributor.globalname && contributor.globalname !== contributor.username}
            <span class="mb-1 text-center text-xs font-semibold text-gray-400">
                aka "{contributor.globalname}"
            </span>
        {/if}
    </p>

    <div class="flex flex-wrap justify-center gap-x-1 gap-y-1">
        {#each contributor.roles as role}
            <div
                class="flex items-center rounded-md bg-main-600 px-2 py-1 text-xs text-gray-400">
                <span class="{roleColors[role]} mr-1 h-2 w-2 rounded-full"
                ></span>
                {role}
            </div>
        {/each}
    </div>
</div>
