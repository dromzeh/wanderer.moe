/* eslint-disable @next/next/no-img-element */
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { SearchParams, Games } from '@/interfaces/params'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Folder, FolderPlus, FolderCheck, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
    CommandEmpty,
    CommandInput,
    CommandItem,
    Command,
    CommandGroup,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command'
import { mapGame } from '@/lib/helpers/casing/mapping'
import { cn } from '@/lib/utils'

interface GameFilterProps {
    games: Games[]
    selectedGames: string[]
    onGameChange: (name: string) => void
    clearSelectedGames: () => void // why
}

export function GameFilter({
    games,
    selectedGames,
    onGameChange,
    clearSelectedGames,
}: GameFilterProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <FolderPlus className="mr-2 h-4 w-4" />
                    Games
                    {selectedGames?.length > 0 && (
                        <>
                            <Separator
                                orientation="vertical"
                                className="mx-2 h-4"
                            />
                            {selectedGames.length < 2 ? (
                                <>
                                    {selectedGames.map((game) => (
                                        <Badge
                                            variant="secondary"
                                            className="rounded-sm font-normal"
                                            key={game}>
                                            {mapGame(game)}
                                        </Badge>
                                    ))}
                                </>
                            ) : (
                                <Badge
                                    variant="secondary"
                                    className="rounded-sm font-normal">
                                    {selectedGames.length} selected
                                </Badge>
                            )}
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto">
                <Command>
                    <CommandInput placeholder="Search for games" />
                    <CommandList>
                        <CommandEmpty>No games found</CommandEmpty>
                        <CommandGroup>
                            {games.map((game) => {
                                const isSelected = selectedGames.includes(
                                    game.name,
                                )
                                return (
                                    <CommandItem
                                        key={game.name}
                                        onSelect={() => onGameChange(game.name)}
                                        className={`my-2 transition-colors hover:cursor-pointer ${
                                            isSelected ? 'bg-zinc-800' : ''
                                        } `}>
                                        <img
                                            src={`https://cdn.wanderer.moe/${game.name}/icon.png`}
                                            alt={game.name}
                                            className="mr-2 h-4 w-4 rounded-sm"
                                        />
                                        <span>{mapGame(game.name)}</span>
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                        {selectedGames.length > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => clearSelectedGames()}
                                        className="my-2 transition-colors hover:cursor-pointer">
                                        <X className="mr-2 h-4 w-4" />
                                        <span>Clear Filtered Games</span>
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}