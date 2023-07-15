<script>
import Banner from '@/components/Banner/GameBanner.svelte'
</script>

<svelte:head>
    <title>API Documentation | wanderer.moe</title>
    <meta name="description" content="API Documentation for wanderer.moe" />
</svelte:head>

<!-- this is temporary, a better solution will be implemented in the future -->
<div class="min-h-screen">
    <div class="mb-8">
        <div class="px-2 md:px-12 lg:px-48">
            <Banner
                title="API Documentation"
                description="Detailed documentation for the API endpoints"
                url="https://cdn.wanderer.moe/honkai-star-rail/cover.png" />
            <div>
                <div>
                    <div
                        class="mb-2 rounded-lg bg-main-500 border border-main-300 p-2 text-gray-400">
                        <div class="mb-3 flex flex-wrap gap-2 text-sm">
                            <div
                                class="w-full rounded-md bg-main-600 border border-main-300 p-2">
                                <div class="my-2 text-lg">
                                    <span
                                        class="mr-1 rounded-md bg-white p-1 px-2.5 text-main-600">
                                        NOTE
                                    </span>
                                </div>

                                <p class="my-2">
                                    You are allowed to use all endpoints on this
                                    page as you wish, but please do not abuse
                                    it, if you are suspected of abusing the API,
                                    your IP will be blocked. <br />
                                    If you are planning to use this API for a large
                                    project or need help please contact
                                    <a
                                        target="_blank"
                                        rel="noopener"
                                        class="text-white hover:font-bold"
                                        href="mailto:marcel@wanderer.moe"
                                        >marcel@wanderer.moe</a
                                    >. <br /> The API is open-source and fully
                                    typed in TypeScript. You can find the source
                                    code
                                    <a
                                        target="_blank"
                                        rel="noopener"
                                        class="text-white hover:font-bold"
                                        href="https://git.wanderer.moe/api"
                                        >on GitHub.</a>
                                </p>
                                <div class="my-2 text-red-100">
                                    Each endpoint per IP is limited to one
                                    request per 5 seconds, please cache the
                                    results if you are planning to use the API
                                    in a project.
                                </div>
                            </div>
                            <div
                                class="w-full rounded-md bg-main-600 border border-main-300 p-2">
                                <div class="my-2 text-lg text-white">
                                    <span
                                        class="mr-1 rounded-md bg-white p-1 px-2.5 text-main-600">
                                        GET
                                    </span>
                                    /asset/:id
                                </div>

                                <p class="my-2">
                                    Returns the asset with the given ID. If the
                                    asset is not found, a 404 error will be
                                    returned.
                                </p>
                            </div>
                            <div
                                class="w-full rounded-md bg-main-600 border border-main-300 p-2">
                                <div class="my-2 text-lg text-white">
                                    <span
                                        class="mr-1 rounded-md bg-white p-1 px-2.5 text-main-600">
                                        GET
                                    </span>
                                    /recent
                                </div>

                                <p class="my-2">
                                    Returns the 30 most recent assets.
                                </p>
                            </div>
                            <div
                                class="w-full rounded-md bg-main-600 border border-main-300 p-2">
                                <div class="my-2 text-lg text-white">
                                    <span
                                        class="mr-1 rounded-md bg-white p-1 px-2.5 text-main-600">
                                        GET
                                    </span>
                                    /search
                                </div>

                                <p class="my-2">
                                    Takes in query, game, asset, tags in the
                                    URL. Returns a list of assets that match the
                                    query.
                                    <br />All parameters are optional, if none
                                    are provided 30 most recent assets will be
                                    returned instead. 1500 assets is the maximum
                                    amount of assets that can be returned.
                                </p>
                            </div>
                            <div
                                class="w-full rounded-md bg-main-600 border border-main-300 p-2">
                                <div class="my-2 text-lg text-white">
                                    <span
                                        class="mr-1 rounded-md bg-white p-1 px-2.5 text-main-600">
                                        GET
                                    </span>
                                    /oc-generators
                                </div>

                                <p class="my-2">
                                    Returns a list of all OC Generators.
                                </p>
                            </div>
                            <div
                                class="w-full rounded-md bg-main-600 border border-main-300 p-2">
                                <div class="my-2 text-lg text-white">
                                    <span
                                        class="mr-1 rounded-md bg-white p-1 px-2.5 text-main-600">
                                        GET
                                    </span>
                                    /oc-generator/:game
                                </div>

                                <p class="my-2">
                                    Returns the OC Generator JSON data for the
                                    given game.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
