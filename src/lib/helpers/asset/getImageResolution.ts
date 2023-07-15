export async function getImageResolution(image: string | HTMLImageElement) {
    if (!image) return 'Unknown'
    const img = typeof image === 'string' ? new Image() : image
    img.src = typeof image === 'string' ? image : image.src
    await new Promise((resolve) => img.addEventListener('load', resolve))
    return `${img.naturalWidth} x ${img.naturalHeight}`
}
