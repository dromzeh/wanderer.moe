export const fetchImages = async (location) => {
    console.log('fetchImages', location)
    let allImageFiles = []

    if (location == 'characterparts') {
        allImageFiles =
            import.meta.glob('/static/images/characterparts/*.png')
    } else if (location == 'emotes') {
        allImageFiles =
            import.meta.glob('/static/images/emotes/*.png')
    } else if (location == 'splashart') {
        allImageFiles =
            import.meta.glob('/static/images/splashart/*.png')
    }

    const iterableImageFiles = Object.entries(allImageFiles)

    const allImages = await Promise.all(
        iterableImageFiles.map(async ([path]) => {
            const name = path.split('/').pop().split('.').shift()
            const imagePath = path

            return {
                name: name,
                path: imagePath,
            }
        })
    )

    return allImages
}

export const fetchData = async (location) => {
    console.log('fetchData', location)
    let allDataFiles = []

    // if location is characters, then the path is /src/data/characters
    if (location == 'characters') {
        allDataFiles =
            import.meta.glob('/src/data/characters/*.json')
    }
    // get the name, rarity and element from each data file and return it as an array
    const iterableDataFiles = Object.entries(allDataFiles)

    const allData = await Promise.all(
        iterableDataFiles.map(async ([path]) => {
            const name = path.split('/').pop().split('.').shift()
            const data = await import(`../../data/characters/${name}.json`)
            const fullName = data.default.name
            const rarity = data.rarity
            const element = data.element
            const weaponType = data.weapontype
            const released = data.released ? data.released : true

            return {
                name: fullName,
                otherName: name,
                rarity: rarity,
                element: element,
                weaponType: weaponType,
                released: released,
            }
        }
        )
    )
    return allData
}

export const fetchArtifactData = async (location) => {
    console.log('fetchArtifactData', location)
    let allDataFilesArtifact = []

    // if location is artifacts, then the path is /src/data/artifacts
    if (location == 'artifacts') {
        allDataFilesArtifact =
            import.meta.glob('/src/data/artifacts/*.json')
    }
    // get the name, rarity from each data file and return it as an array
    const iterableDataFiles = Object.entries(allDataFilesArtifact)

    const allData = await Promise.all(
        iterableDataFiles.map(async ([path]) => {
            const name = path.split('/').pop().split('.').shift()
            const data = await import(`../../data/artifacts/${name}.json`)
            const fullName = data.default.name.replace(/'/g, '')
            const rarity = data.rarity
            const released = data.released ? data.released : true

            return {
                name: fullName,
                otherName: name,
                rarity: rarity,
                released: released
            }
        }
        )
    )
    return allData
}

