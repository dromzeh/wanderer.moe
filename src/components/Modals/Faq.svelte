<script lang="ts">
import { t } from 'svelte-i18n'
import { cubicOut, quintOut } from 'svelte/easing'
import { fly, fade } from 'svelte/transition'

export let closeFAQ

const faqEntries = [
    { question: 'faq.purpose', answer: 'faq.purposeAnswer' },
    {
        question: 'faq.downloadMultipleOrAll',
        answer: 'faq.downloadMultipleOrAllAnswer',
    },
    { question: 'faq.downloadOnMobile', answer: 'faq.downloadOnMobileAnswer' },
    { question: 'faq.howToExtract', answer: 'faq.howToExtractAnswer' },
    { question: 'faq.issueNotFound', answer: 'faq.issueNotFoundAnswer' },
]
</script>

<div>
    <div
        class="fixed left-1/2 top-1/2 z-[80] w-3/4 -translate-x-1/2 -translate-y-1/2 transform"
        in:fly|global="{{ y: 50, easing: quintOut, duration: 750 }}"
        out:fly|global="{{ y: 50, easing: cubicOut, duration: 300 }}">
        <button
            class="close-button absolute right-0 top-6 rounded-lg p-4 text-white"
            on:click="{closeFAQ}">✕</button>
        <div
            class="rounded-lg bg-main-500 border border-main-300 p-8 text-white">
            <div>
                <div class="rtl flex justify-center">
                    <div class="flex flex-col items-center gap-2">
                        <img
                            src="https://cdn.wanderer.moe/genshin-impact/emotes/cyno-3.png"
                            alt="cyno"
                            class="h-12 w-12" />
                        <p class="font-semibold">
                            {$t('faq.title')}
                        </p>
                    </div>
                </div>
                <div
                    class="mt-4 flex max-h-[70vh] flex-col gap-4 overflow-y-auto hyphens-auto break-words p-2 lg:flex-row">
                    {#each faqEntries as entry}
                        <div class="mb-2 flex-1">
                            <p class="text-sm font-semibold">
                                Q. {$t(entry.question)}
                            </p>
                            <p class="text-sm text-gray-400">
                                A. {$t(entry.answer)}
                            </p>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
    <button
        class="fixed top-0 left-0 w-full h-full bg-black opacity-70 z-[70] backdrop-blur-sm backdrop-filter"
        in:fade|global="{{ duration: 200 }}"
        out:fade|global="{{ duration: 100 }}"
        on:click="{closeFAQ()}"
        on:keypress="{closeFAQ()}">
    </button>
</div>
