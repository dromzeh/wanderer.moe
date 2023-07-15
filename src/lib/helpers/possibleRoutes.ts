export const possibleRoutes = [
    '/',
    '/legal/privacy-policy',
    '/legal/terms-of-service',
    '/account',
    '/logout',
    '/account/login',
    '/account/signup',
    '/account/connections',
    '/account/forgot-password',
    '/oc-generator/genshin-impact',
    '/oc-generator/honkai-star-rail',
]

export const calculateLevenshtein = (a: string, b: string): number => {
    const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
        Array.from({ length: b.length + 1 }, (_, j) =>
            i === 0 ? j : j === 0 ? i : 0
        )
    )

    for (let i = 1; i <= a.length; ++i) {
        for (let j = 1; j <= b.length; ++j) {
            const s = a[i - 1] === b[j - 1] ? 0 : 1
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + s
            )
        }
    }

    return matrix[a.length][b.length]
}
