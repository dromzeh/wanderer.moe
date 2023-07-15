<script>
import { navigating, page } from '$app/stores'
import '@/app.css'
import Footer from '@/components/Navigation/Footer/Footer.svelte'
import Nav from '@/components/Navigation/Navbar/Nav.svelte'
import { startClient } from '$lib/utils/i18n'
import NProgress from 'nprogress'
import { derived } from 'svelte/store'
import ScrollToTop from '@/components/Navigation/ScrollToTop.svelte'
import { afterNavigate, beforeNavigate, invalidate } from '$app/navigation'
import { onMount } from 'svelte'

export let data

// TODO: if browser is incompatible, show a warning, give the user the option to continue or continue and don't show again
let showBrowserIncompatibilityWarning = false

beforeNavigate(() => {
    NProgress.start()
})
afterNavigate(() => {
    NProgress.done()
})

// derived store that runs whenever the $navigating store changes value
const delayedPreloading = derived(navigating, (_, set) => {
    set(true)
    setTimeout(() => set(true), 1000)
})

startClient()
console.log(data)

$: segment = $page.url.pathname.substring(1).split('/')[0] // gets the first segment of the URL (e.g. /blog/1 => blog)
// $: console.log(segment)
</script>

<ScrollToTop />
<Nav user="{data.user}" />
<main>
    <slot />
</main>
<Footer />
