// subject: he
export const subjectPronouns = [
    'he',
    'they',
    'she',
    'it',
    'one',
    'ae',
    'ey',
    'fae',
    'xe',
    'ze',
]

// object: him
export const objectPronouns = [
    'him',
    'them',
    'her',
    'it',
    'one',
    'aer',
    'em',
    'faer',
    'xem',
    'zer',
]

// possessive: his
export const possessivePronouns = [
    'his',
    'theirs',
    'hers',
    'its',
    "one's",
    'aers',
    'eirs',
    'faers',
    'xyrs',
    'zirs',
]

export function formatPronouns(
    currentSubjectPronoun,
    currentObjectPronoun,
    currentPossessivePronoun
) {
    const pronouns = [
        currentSubjectPronoun,
        currentObjectPronoun,
        currentPossessivePronoun,
    ].filter(Boolean)
    return pronouns.length > 0 ? pronouns.join('/') : 'other'
}
