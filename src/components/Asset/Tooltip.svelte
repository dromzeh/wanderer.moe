<script>
export let tooltipText
</script>

<div
    class="sm:block hidden z-50 pointer-events-none text-sm text-white bg-main-600 border border-main-300 absolute mb-20 origin-bottom scale-0 flex-col rounded-md transition-all duration-150 ease-in-out group-hover:scale-100">
    <p class="px-1.5 py-1">
        {tooltipText}
    </p>
</div>
