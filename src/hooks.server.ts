import {
    RedirectHook,
    type StringRedirects,
} from '@svackages/sveltekit-hook-redirect'
import type { Handle } from '@sveltejs/kit'
// import { dev } from '$app/environment'
import { auth } from '$lib/server/lucia'

// redirects from old site & third party urls
const redirects: StringRedirects = {
    '/asset-request-form': {
        to: 'https://docs.google.com/forms/d/1wEflnF1asaLtRGqo6RMUKD55nRwy1-V77ogW1wLmvus/',
        code: 301,
    },
    '/site-suggestions': {
        to: 'https://docs.google.com/forms/d/1uIfRAYUbmYne6BbgoJuO6VyD6TdLnvvEZPCeBjCQmlI/',
        code: 301,
    },
    '/discord': {
        to: 'https://discord.com/invite/659KAFfNd6',
        code: 301,
    },
    '/donate': {
        to: 'https://www.buymeacoffee.com/marcelmd',
        code: 301,
    },
}

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.auth = auth.handleRequest(event)
    return RedirectHook({ event, resolve, redirects })
}
