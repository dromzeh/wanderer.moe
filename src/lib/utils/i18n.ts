import dayjs from 'dayjs'
import {
    register,
    addMessages,
    init,
    getLocaleFromNavigator,
    locale as $locale,
} from 'svelte-i18n'
import { browser } from '$app/environment'

import type { Locale } from 'dayjs/locale/*'

import en from '@/i18n/site/en.json'

interface InitOptions {
    fallbackLocale: string
    initialLocale: string
}

const INIT_OPTIONS: InitOptions = {
    fallbackLocale: 'en',
    initialLocale: 'en',
}

interface HtmlLocaleCode {
    [key: string]: string
}

const htmlLocaleCode: HtmlLocaleCode = {
    en: 'en',
    nl: 'nl',
    ja: 'ja',
    lol: 'lol',
    it: 'it',
    ro: 'ro',
    sv: 'sv',
    vi: 'vi',
    ar: 'ar',
}

interface DayjsLocales {
    [key: string]: () => Promise<{
        default: Locale
    }>
}

const dayjsLocales: DayjsLocales = {
    en: () => import('dayjs/locale/en'),
    nl: () => import('dayjs/locale/de'),
    ja: () => import('dayjs/locale/ja'),
    lol: () => import('dayjs/locale/en'),
    it: () => import('dayjs/locale/it'),
    ar: () => import('dayjs/locale/ar'),
    ro: () => import('dayjs/locale/ro'),
    sv: () => import('dayjs/locale/sv'),
    vi: () => import('dayjs/locale/vi'),
}

let isLoaded = false

$locale.subscribe((value: string | null) => {
    if (value === null) return

    if (isLoaded) localStorage.setItem('locale', value)

    if (typeof window !== 'undefined') {
        dayjsLocales[value]().then(() => dayjs.locale(value))
        document.documentElement.setAttribute('lang', htmlLocaleCode[value])
    }
})

const supportedLanguage = [
    'en',
    'nl',
    'ja',
    'lol',
    'it',
    'ar',
    'ro',
    'sv',
    'vi',
]
addMessages('en', en)

register('nl', () => import('@/i18n/site/nl.json'))
register('ja', () => import('@/i18n/site/ja.json'))
register('lol', () => import('@/i18n/site/lol.json'))
register('it', () => import('@/i18n/site/it.json'))
register('ar', () => import('@/i18n/site/ar.json'))
register('ro', () => import('@/i18n/site/ro.json'))
register('sv', () => import('@/i18n/site/sv.json'))
register('vi', () => import('@/i18n/site/vi.json'))

export async function startClient(): Promise<void> {
    init({
        ...INIT_OPTIONS,
    })

    if (browser) {
        let used = 'en'
        const savedLocale = localStorage.getItem('locale')
        const detectedLocale = getLocaleFromNavigator().substring(0, 2)
        if (savedLocale !== null) {
            if (!supportedLanguage.includes(savedLocale)) {
                localStorage.setItem('locale', 'en')
            } else {
                used = savedLocale
            }
        } else if (supportedLanguage.includes(detectedLocale)) {
            used = detectedLocale
        }

        $locale.set(used)
        isLoaded = true

        document.documentElement.setAttribute('lang', htmlLocaleCode[used])
        console.log('i18n:', used)
    }
}
