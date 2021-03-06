import * as rt from 'runtypes'
import { useEffect } from 'react'

import { definePanel } from '../../core'
import { Loading } from './PanelLoader'

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const context = rt.Record({
  file: rt.Record({
    url: rt.String,
    mimetype: rt.String,
    image: rt.InstanceOf(HTMLImageElement).Or(rt.Undefined).Or(rt.Null)
  })
})

export const PanelLoaderFileImage = definePanel({
  displayName: 'Loading Image',
  context,
  available: context => {
    const { file } = context
    return file.image == null && file.mimetype.startsWith('image')
  },
  Component: ({ context, updateContext }) => {
    useEffect(() => {
      const image = new Image()
      image.src = context.file.url
      image.onload = async () => {
        await sleep(1000)
        updateContext({ file: { image: image as any } })
      }
    }, [context, updateContext])
    return <Loading message="Loading image..." />
  }
})
