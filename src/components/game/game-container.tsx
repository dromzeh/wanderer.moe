/* eslint-disable @next/next/no-img-element */
import { Game } from '@/interfaces/params'
import { mapAssetType, mapGame } from '@/lib/helpers/casing/mapping'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { timeAgo } from '@/lib/helpers/time'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { Label } from '@/components/ui/label'

interface GameContainerProps {
    game: Game
    className?: string
}

interface CategoryContainerProps {
    category: string
    className?: string
}

export function GameContainer({ game, className }: GameContainerProps) {
    const [hovered, setHovered] = useState<boolean>(false)

    return (
        <div className={cn(className)}>
            <Link href={`/search?game=${game.name}`}>
                <div
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}>
                    <motion.div
                        className="relative flex h-24 items-center justify-center rounded-md bg-cover text-white sm:h-28"
                        style={{
                            backgroundImage: `url(${siteConfig.urls.cdn}/assets/${game.name}/cover.png)`,
                            backgroundSize: '100%',
                        }}
                        animate={{
                            backgroundSize: hovered ? '115%' : '100%',
                            backgroundPosition: hovered ? '50% 15%' : '50% 20%',
                        }}
                        transition={{ duration: 0.15 }}>
                        <motion.div
                            className={`absolute h-full w-full rounded-md bg-opacity-60 transition-all ${
                                hovered
                                    ? 'bg-indigo-500/50 ring-2 ring-indigo-500'
                                    : 'bg-black'
                            }`}
                            animate={{
                                opacity: hovered ? 0.9 : 1,
                            }}
                            transition={{ duration: 0.15 }}
                        />
                    </motion.div>
                </div>
            </Link>
            <div className="flex flex-col gap-1">
                <div className="mt-2 flex flex-row items-center gap-1">
                    <img
                        src={`${siteConfig.urls.cdn}/assets/${game.name}/icon.png`}
                        alt={game.name}
                        className="h-4 w-4 rounded-md"
                    />
                    <Label className="font-semibold">
                        {mapGame(game.name)}
                    </Label>
                </div>
                <div className="mt-1 flex flex-row items-center gap-1">
                    <Label className="rounded-md bg-background px-1 text-xs font-normal ring-1 ring-secondary/25">
                        {game.asset_count} assets available
                    </Label>
                </div>
            </div>
        </div>
    )
}

export function GameLabel({ game, className }: GameContainerProps) {
    const [hovered, setHovered] = useState<boolean>(false)

    return (
        <Link href={`/search?game=${game.name}`}>
            <motion.div
                animate={{
                    x: hovered ? 5 : 0,
                }}
                transition={{ duration: 0.15 }}
                className={cn(
                    'flex cursor-pointer flex-row items-center gap-1',
                    className,
                )}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}>
                <img
                    src={`${siteConfig.urls.cdn}/assets/${game.name}/icon.png`}
                    alt={game.name}
                    className="h-5 w-5 rounded-md"
                />
                <div>
                    <Label className="ml-2 cursor-pointer text-xs font-normal">
                        {mapGame(game.name)}
                    </Label>
                </div>
            </motion.div>
        </Link>
    )
}

export function AssetCategoryLabel({
    category,
    className,
}: CategoryContainerProps) {
    const [hovered, setHovered] = useState<boolean>(false)

    return (
        <Link href={`/search?asset=${category}`}>
            <motion.div
                animate={{
                    x: hovered ? 5 : 0,
                }}
                transition={{ duration: 0.15 }}
                className={cn(
                    'flex cursor-pointer flex-row items-center gap-1',
                    className,
                )}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}>
                <div>
                    <Label className="ml-2 cursor-pointer text-xs font-normal">
                        {mapAssetType(category)}
                    </Label>
                </div>
            </motion.div>
        </Link>
    )
}
