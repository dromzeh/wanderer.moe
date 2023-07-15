<script lang="ts">
import { onMount } from 'svelte'
import { writable } from 'svelte/store'

const responseColours = {
    true: 'text-green-300',
    false: 'text-red-300',
    unknown: 'text-yellow-100',
}

const successText = {
    true: 'Operational',
    false: 'Degraded Performance',
    unknown: 'Checking API',
}

const success = writable('unknown')

onMount(async () => {
    const response = await fetch('https://api.wanderer.moe/') // TODO: status page will have its own API to check for downtime, pinging the API is not a good idea and temporary
    const data = await response.json()
    success.set(data.success)
})
</script>

<a href="https://status.wanderer.moe/">
    <div class="mx-auto flex w-80">
        <div
            class="flex w-full cursor-pointer items-center justify-center rounded-xl border border-main-300 bg-main-600 p-1 transition-colors duration-150 hover:border-main-200 hover:bg-main-500">
            <span class="mr-2">API Status: </span>
            <span class="{responseColours[$success]} transition-colors">
                <i class="fas fa-circle"></i>
                {successText[$success]}
            </span>
        </div>
    </div>
</a>
