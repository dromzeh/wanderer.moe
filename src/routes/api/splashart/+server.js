import {
  fetchImages
} from '$lib/utils'
import {
  json
} from '@sveltejs/kit'

export const GET = async () => {
  const allImages = await fetchImages('splashart')

  return json(allImages)
}