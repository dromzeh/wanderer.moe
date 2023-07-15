import { fixCasing } from '@/lib/helpers/casing/fixCasing'

export const mapGame = (game: string): string => {
    const gameMapping: Record<string, string> = {
        'honkai-star-rail': 'Honkai: Star Rail',
        'goddess-of-victory-nikke': 'Goddess of Victory: Nikke',
        'project-sekai': 'Project SEKAI COLORFUL STAGE!',
        'sino-alice': 'SINoALICE',
        'cookie-run': 'Cookie Run: Kingdom',
    }

    return gameMapping[game] ?? fixCasing(game)
}

export const mapAssetType = (assetType: string): string => {
    const assetTypeMapping: Record<string, string> = {
        tcg: 'TCG',
        'tcg-sheets': 'TCG Sheets',
    }

    return assetTypeMapping[assetType] ?? fixCasing(assetType)
}
