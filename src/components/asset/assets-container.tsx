'use client'

import AssetItem from '@/components/asset/asset-item'
import { Button } from '@/components/ui/button'
import { assetVariants } from '@/lib/framer/variants'
import { motion } from 'framer-motion'
import * as React from 'react'
import type { get_V2assetsearch } from '@/lib/api-client/openapi'
import { z } from 'zod'

type Assets = z.infer<get_V2assetsearch['response']>

type Asset = Pick<Assets, 'assets'>['assets'][0]
interface AssetContainerProps {
    assets: Asset[]
    displayCounter?: boolean
}

export default function AssetContainer({
    assets,
    displayCounter = true,
}: AssetContainerProps) {
    const [displayedAssets, setDisplayedAssets] = React.useState(() =>
        assets.slice(0, 50),
    )
    const [numDisplayed, setNumDisplayed] = React.useState(() =>
        Math.min(50, assets.length),
    )

    const handleShowMore = React.useCallback(() => {
        setNumDisplayed((prevNumDisplayed) => {
            const newNumDisplayed = Math.min(
                prevNumDisplayed + 50,
                assets.length,
            )
            setDisplayedAssets(assets.slice(0, newNumDisplayed))
            return newNumDisplayed
        })
    }, [assets])

    return (
        <div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {displayedAssets.map((item) => (
                    <motion.div
                        variants={assetVariants}
                        key={item.id}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true }}>
                        <AssetItem key={item.id} {...item} />
                    </motion.div>
                ))}
            </div>
            {displayCounter && (
                <div className="mt-5 flex flex-col items-center justify-center text-muted-foreground">
                    <p>
                        Currently displaying{' '}
                        <span className="font-semibold">
                            {numDisplayed}/{assets.length}{' '}
                        </span>
                        available assets.
                    </p>
                    {numDisplayed < assets.length && (
                        <Button onClick={handleShowMore} className="mt-2">
                            Show More Assets
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}