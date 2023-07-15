// e.g 'a-b-c' -> 'A B C'
export function fixCasing(word: string) {
    const formattedWord = word.replace(/-/g, ' ')
    return formattedWord.replace(/\b\w/g, (l) => l.toUpperCase())
}
