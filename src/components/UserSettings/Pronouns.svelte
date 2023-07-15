<script lang="ts">
import PronounsDropdown from '@/components/UserSettings/PronounsDropdown.svelte'
import {
    subjectPronouns,
    possessivePronouns,
    objectPronouns,
    formatPronouns,
} from '@/lib/helpers/user/pronouns'
import { onMount } from 'svelte'

export let user
let selectedPronouns, pronouns
let currentSubjectPronoun, currentObjectPronoun, currentPossessivePronoun

onMount(() => {
    if (user.pronouns && user.pronouns !== 'other') {
        const pronouns = user.pronouns.split('/')
        console.log(pronouns)
        if (pronouns.length === 3) {
            ;[
                currentSubjectPronoun,
                currentObjectPronoun,
                currentPossessivePronoun,
            ] = pronouns
        } else {
            for (const pronoun of pronouns) {
                if (subjectPronouns.includes(pronoun)) {
                    currentSubjectPronoun = pronoun
                } else if (possessivePronouns.includes(pronoun)) {
                    currentPossessivePronoun = pronoun
                } else if (objectPronouns.includes(pronoun)) {
                    currentObjectPronoun = pronoun
                }
            }
        }
    }
})

// pronouns = i.e he/him/his or other
$: pronouns = formatPronouns(
    currentSubjectPronoun,
    currentObjectPronoun,
    currentPossessivePronoun
)

$: selectedPronouns = pronouns !== 'other' ? pronouns : 'other'
</script>

<div
    class="bg-main-500 border border-main-300 rounded-md text-white p-2"
    id="pronouns">
    <p class="text-lg font-bold">Pronouns</p>
    <p class="text-xs text-gray-400">
        Data collected from pronouns.page, not all pronouns are available due to
        limitations and to prevent misuse of this feature. {#if user.pronouns}
            Your current pronouns are {user.pronouns}
        {/if}
    </p>
    <div class="grid grid-cols-1 mt-2 gap-3">
        <div>
            <p class="text-lg font-bold">
                Subject <span class="text-xs text-gray-400"
                    >(he, she, they, etc.)</span>
            </p>
            <PronounsDropdown
                pronounsList="{subjectPronouns}"
                bind:currentSelected="{currentSubjectPronoun}"
                type="subject" />
        </div>
        <div>
            <p class="text-lg font-bold">
                Object <span class="text-xs text-gray-400"
                    >(him, her, them, etc.)</span>
            </p>
            <PronounsDropdown
                pronounsList="{objectPronouns}"
                bind:currentSelected="{currentObjectPronoun}"
                type="object" />
        </div>
        <div>
            <p class="text-lg font-bold">
                Possessive <span class="text-xs text-gray-400"
                    >(his, hers, theirs, etc.)</span>
            </p>
            <PronounsDropdown
                pronounsList="{possessivePronouns}"
                bind:currentSelected="{currentPossessivePronoun}"
                type="possessive" />
        </div>
        <p class="text-xs text-gray-400 flex items-center">
            <input
                type="checkbox"
                class="mr-1 accent-accent-300"
                checked="{selectedPronouns === 'other'}"
                on:change="{() => {
                    selectedPronouns = selectedPronouns === '' ? 'other' : ''
                    if (
                        currentObjectPronoun ||
                        currentSubjectPronoun ||
                        currentPossessivePronoun
                    ) {
                        currentSubjectPronoun = null
                        currentObjectPronoun = null
                        currentPossessivePronoun = null
                    }
                }}" />
            Your pronouns aren't here? Tick this box to specify them as "other".
        </p>
    </div>
</div>
