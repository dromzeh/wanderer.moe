import { iso8601ToUnix } from '@/lib/helpers/timeConvertion/isoFormat'

interface Image {
    name: string
    size: number
    uploaded: string
}

interface SortingOption {
    name: string
}

export function sortAssets(
    images: Image[],
    selectedSortingOption: SortingOption
): Image[] {
    switch (selectedSortingOption.name) {
        case 'fileSizeStoL':
            return images.sort((a, b) => a.size - b.size)
        case 'fileSizeLtoS':
            return images.sort((a, b) => b.size - a.size)
        case 'nameAtoZ':
            return images.sort((a, b) => a.name.localeCompare(b.name))
        case 'nameZtoA':
            return images.sort((a, b) => b.name.localeCompare(a.name))
        case 'dateNewest':
            return images.sort((a, b) => {
                const dateA = iso8601ToUnix(a.uploaded)
                const dateB = iso8601ToUnix(b.uploaded)
                return dateB - dateA
            })
        case 'dateOldest':
            return images.sort((a, b) => {
                const dateA = iso8601ToUnix(a.uploaded)
                const dateB = iso8601ToUnix(b.uploaded)
                return dateA - dateB
            })
        default:
            return images
    }
}
