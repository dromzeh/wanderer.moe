<script lang="ts">
import Pronouns from '@/components/UserSettings/Pronouns.svelte'
import Bio from '@/components/UserSettings/Bio.svelte'
import Avatar from '@/components/UserSettings/Avatar.svelte'
export let user
</script>

<div>
    <div class="grid grid-cols-1 gap-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Avatar user="{user}" />
            <Bio user="{user}" />
        </div>
        <Pronouns user="{user}" />
    </div>
</div>
