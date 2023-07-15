export const replaceStateWithQuery = (values: Record<string, string>) => {
    const url = new URL(window.location.toString())
    for (let [k, v] of Object.entries(values)) {
        if (!!v) {
            url.searchParams.set(k, v)
        } else {
            url.searchParams.delete(k)
        }
    }
    history.replaceState(history.state, '', url)
}
