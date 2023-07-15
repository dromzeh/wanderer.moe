import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export function formatTimeAgo(isoTimestamp: string) {
    const now = dayjs()
    const timestamp = dayjs(isoTimestamp)
    return timestamp.from(now)
}

// ISO 8601 -> Unix Timestamp
export function iso8601ToUnix(isoString: string) {
    const date = new Date(isoString)
    return Math.floor(date.getTime() / 1000)
}
