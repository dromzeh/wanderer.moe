<script lang="ts">
import { bytesToFileSize } from '@/lib/helpers/asset/bytesToFileSize'
import { mapGame, mapAssetType } from '@/lib/helpers/casing/gameMapping'
import { getImageResolution } from '@/lib/helpers/asset/getImageResolution'
import { t } from 'svelte-i18n'
import { formatTimeAgo } from '@/lib/helpers/timeConvertion/isoFormat'
import { onMount } from 'svelte'
import AssetItem from '@/components/Asset/AssetItem.svelte'

let resolution = 'Unknown'
export let data

const { assetInformation, id, user } = data
const { asset, similarAssets } = assetInformation

// console.log(asset, similarAssets)

onMount(async () => {
    resolution = await getImageResolution(
        `https://cdn.wanderer.moe/${asset.url}`
    )
})

// console.log(assetInformation)
</script>

<svelte:head>
    <title>{asset.name} ({mapGame(asset.game)})</title>
</svelte:head>

<div class="min-h-screen">
    <div class="mb-8">
        <div class="px-2 md:px-12 lg:px-48">
            <div class="relative my-16">
                <div>
                    <div class="flex flex-col md:flex-row">
                        <div class="w-full md:w-1/2">
                            <img
                                src="https://cdn.wanderer.moe/{asset.url}"
                                alt="asset"
                                class="h-full max-h-full w-full max-w-full rounded-lg border border-main-300 bg-main-500 object-cover"
                                style="background-image: url('/img/grid.png')" />
                        </div>
                        <div class="m-2 my-auto w-full md:w-1/2">
                            <div class="flex flex-col">
                                <div
                                    class="flex flex-col md:flex-row md:justify-between">
                                    <div class="flex flex-col">
                                        <div
                                            class="my-1 flex flex-row gap-2 text-lg">
                                            <a
                                                href="/?game={asset.game}"
                                                class="border border-main-300 rounded-md bg-main-500 flex items-center px-2.5 py-1 font-semibold text-white transition duration-150 ease-in-out hover:border-main-200">
                                                <img
                                                    src="https://cdn.wanderer.moe/{asset.game}/icon.png"
                                                    alt="{asset.game} cover"
                                                    class="mr-1 inline-block h-5 w-5 rounded-md" />
                                                {mapGame(asset.game)}
                                            </a>
                                            <a
                                                href="/?asset={asset.asset_category}"
                                                class="border border-main-300 rounded-md bg-main-500 px-2.5 py-1 font-semibold text-white transition duration-150 ease-in-out hover:border-main-200">
                                                {mapAssetType(
                                                    asset.asset_category
                                                )}
                                            </a>
                                        </div>
                                        <div class="my-2">
                                            <h1
                                                class="text-3xl font-bold text-white">
                                                {asset.name}
                                            </h1>
                                            <p class="text-sm text-gray-300">
                                                Uploaded {formatTimeAgo(
                                                    asset.uploaded_date
                                                )}
                                            </p>
                                            <p class="text-sm text-gray-300">
                                                {bytesToFileSize(
                                                    asset.file_size
                                                )}
                                            </p>
                                            <p
                                                class="my-2 text-sm text-gray-300">
                                                {$t('viewImage.resolution', {
                                                    values: { resolution },
                                                })}
                                            </p>

                                            <div
                                                class="my-4 flex flex-row gap-2">
                                                <a
                                                    href="https://v2-api-testing.wanderer.moe/download/{asset.id}"
                                                    rel="noreferrer"
                                                    target="_blank"
                                                    download>
                                                    <button
                                                        class="btn px-2.5 py-1 font-semibold transition">
                                                        <i
                                                            class="fa-solid fa-download mr-1"
                                                        ></i> Download Asset
                                                    </button>
                                                </a>
                                                <button
                                                    class="btn px-2.5 py-1 font-semibold transition"
                                                    on:click="{() => {
                                                        navigator.clipboard.writeText(
                                                            window.location.href
                                                        )
                                                    }}">
                                                    <i
                                                        class="fa-solid fa-clipboard mr-1"
                                                    ></i> Copy Link
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="my-4">
                        <p class="my-2 text-2xl text-white">Similar Assets</p>
                        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {#each similarAssets as similarAsset}
                                <AssetItem
                                    asset="{similarAsset}"
                                    user="{user}" />
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
