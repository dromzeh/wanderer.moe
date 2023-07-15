import axios from 'axios'
import type { AxiosResponse } from 'axios'

interface CommitAuthorInfo {
    name: string
    username: string
    date: string
}

interface Commit {
    commitMsg: string
    authorInfo: CommitAuthorInfo
    shaSpliced: string
    sha: string
}

interface Release {
    tag: string
    name: string
    url: string
    body: string
    author: string
    date: string
}

// gets the latest commits
export async function getCommitsRecent(perPage: number): Promise<Commit[]> {
    try {
        const branch = window.location.href.startsWith('https://wanderer.moe/')
            ? 'main'
            : 'development' // shows main branch on production, development branch on other environments

        const { data }: AxiosResponse = await axios.get(
            `https://api.github.com/repos/wanderer-moe/site/commits?per_page=${perPage}&sha=${branch}`
        )
        const commits: Commit[] = await Promise.all(
            data.map(
                async ({
                    commit: {
                        message,
                        author: { name, date },
                    },
                    author: { login: username },
                    sha,
                }) => {
                    let commitMsg = message
                    if (commitMsg.includes('\n')) {
                        commitMsg = commitMsg.split('\n')[0]
                    }
                    const shaSpliced = sha.slice(0, 7)
                    return {
                        commitMsg,
                        authorInfo: {
                            name,
                            username,
                            date,
                        },
                        shaSpliced,
                        sha,
                    }
                }
            )
        )
        return commits
    } catch (error) {
        console.error(error)
        return []
    }
}

// gets the latest release
export async function getReleases(releaseCount: number): Promise<Release[]> {
    try {
        const { data }: AxiosResponse = await axios.get(
            `https://api.github.com/repos/wanderer-moe/site/releases?per_page=${releaseCount}`
        )
        const releases: Release[] = await Promise.all(
            data.map(
                async ({
                    tag_name: tag,
                    name,
                    html_url: url,
                    body = '',
                    author: { login: author },
                    published_at: date,
                }) => {
                    if (!date) return null
                    return {
                        tag,
                        name,
                        url,
                        body,
                        author,
                        date,
                    }
                }
            )
        )
        return releases.filter(Boolean)
    } catch (error) {
        console.error(error)
        return []
    }
}
