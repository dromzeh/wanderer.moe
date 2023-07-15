export function bytesToFileSize(bytes: number) {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return '0 B'
    const i = Math.floor(Math.log2(bytes) / 10)
    const size = (bytes / 1024 ** i).toFixed(1)
    return `${size} ${sizes[i]}`
}
