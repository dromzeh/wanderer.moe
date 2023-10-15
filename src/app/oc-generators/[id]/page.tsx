import { mapGame } from '@/lib/helpers/casing/mapping'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { OCGeneratorResponse } from '@/interfaces/oc-generator/oc-generator'
import { siteConfig } from '@/config/site'
import { ChevronRight, Home } from 'lucide-react'
import { DataHandler } from '@/components/oc-generators/data-handler'
import Link from 'next/link'
import { CopyJSONData } from '@/components/oc-generators/copy-json-data'
import ColorPalette from '@/components/oc-generators/color-palette'

export const runtime = 'edge'

async function GetGeneratorData(id: string): Promise<OCGeneratorResponse> {
    const res = await fetch(`${siteConfig.urls.api}/oc-generators/${id}`)
    const response = await res.json()

    if (!res.ok) return notFound()

    return response as OCGeneratorResponse
}

type Props = {
    params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = params
    const { data } = await GetGeneratorData(id)
    if (!data) return notFound()

    return {
        title: `${mapGame(id)} OC Generator - wanderer.moe`,
        description: `OC Generator for ${mapGame(id)}`,
    }
}

async function OCGeneratorPage({ params: { id } }: { params: { id: string } }) {
    const data = await GetGeneratorData(id)

    return (
        <div className="mx-auto min-h-screen max-w-screen-xl p-5">
            <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
                <div className="whitespace-nowrap transition-colors hover:text-foreground">
                    <Link href={`/`}>
                        <Home size={16} />
                    </Link>
                </div>
                <ChevronRight size={16} />
                <div className="whitespace-nowrap transition-colors hover:text-foreground">
                    <Link href={`/oc-generators`}>OC Generators</Link>
                </div>
                <ChevronRight size={16} />
                <div className="overflow-hidden text-ellipsis whitespace-nowrap text-foreground transition-colors">
                    {mapGame(id)}
                </div>
            </div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight mb-2">
                    {mapGame(id)} OC Generator
                </h1>
                <p className="text-muted-foreground">
                    Create your very own original character (OC) for {mapGame(id)}!
                </p>
                <p className="text-muted-foreground">
                    Need assets for your OC? Check out Genshin Impact&apos;s{' '}
                    <Link
                        className="text-white"
                        href={`/search?game=${id}&asset=character-sheets,splash-art`}>
                        Character Sheets and Splash Art
                    </Link>.
                </p>
            </div>
            <div>
                <DataHandler {...data} />
            </div>
            <ColorPalette />
            <CopyJSONData {...data} />
        </div>
    )
}

export default OCGeneratorPage
