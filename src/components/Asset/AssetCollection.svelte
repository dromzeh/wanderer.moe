<script lang="ts">
import type { Asset } from '@/lib/types/asset'
import Tooltip from '@/components/Asset/Tooltip.svelte'
</script>

<div class="group inline-flex items-center justify-center">
    <button class="btn w-full px-2.5 py-1 font-bold transition md:w-auto">
        <i class="fa-solid fa-plus"></i>
    </button>
    <Tooltip tooltipText="Add asset to collection" />
</div>
