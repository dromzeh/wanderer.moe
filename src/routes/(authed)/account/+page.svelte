<script lang="ts">
import Settings from '@/components/UserSettings/Settings.svelte'
import AdvancedSettings from '@/components/UserSettings/AdvancedSettings.svelte'
export let data

const { user } = data
</script>

<svelte:head>
    <title>Account Settings</title>
</svelte:head>

<!-- scuffed -->
<div class="min-h-screen">
    <div class="px-2 py-24 md:px-12 lg:px-24">
        <div>
            <h1 class="text-2xl font-bold text-white">Account Settings</h1>
            <h2 class="text-xs font-bold text-gray-400 mb-2">
                Manage all of your account settings - save your changes by
                pressing save at the bottom of the page.
            </h2>
            <Settings user="{user}" />
        </div>
        <div class="mt-8">
            <h1 class="text-2xl font-bold text-white">Advanced Settings</h1>
            <h2 class="text-xs font-bold text-gray-400 mb-2">
                Manage your "advanced" settings, such as e-mail, password and
                username.
            </h2>
            <AdvancedSettings user="{user}" />
        </div>
    </div>
</div>
