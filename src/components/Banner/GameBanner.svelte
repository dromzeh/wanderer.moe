<script lang="ts">
import { t } from 'svelte-i18n'
import { fade } from 'svelte/transition'

export let title, description, url
</script>

<div class="relative my-8">
    <img
        src="{url}"
        class="absolute inset-0 h-48 w-full rounded-md object-cover"
        style="object-position: 50% 20%;"
        alt="game cover" />
    <div class="relative h-48 rounded-md bg-main-500/50">
        <div
            class="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
            <div class="flex flex-col items-center justify-between xl:flex-row">
                <div>
                    <h1
                        class="max-w-lg text-3xl font-bold text-white sm:text-4xl sm:leading-none">
                        {title}
                    </h1>
                    <h2 class="text-lg text-white">
                        {description}
                    </h2>
                </div>
            </div>
        </div>
    </div>
</div>
