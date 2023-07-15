<script lang="ts">
import UpdateEmail from './UpdateEmail.svelte'
export let user
</script>

<div>
    <div class="grid grid-cols-1 gap-8">
        <UpdateEmail user="{user}" />
    </div>
</div>
