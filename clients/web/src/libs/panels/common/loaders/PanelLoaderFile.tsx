import * as rt from 'runtypes'
import { useEffect } from 'react'
import { useAsync } from 'react-use'

import { definePanel } from '../../core'
import { Loading } from './PanelLoader'
import { BlobFile } from '../../types/file'

const context = rt.Record({
  file: rt.Record({
    url: rt.String,
    blob: BlobFile.Or(rt.Null).Or(rt.Undefined),
    mimetype: rt.String.Or(rt.Null).Or(rt.Undefined),
    size: rt.Number.Or(rt.Null).Or(rt.Undefined)
  })
})

export const PanelLoaderFile = definePanel({
  displayName: 'Loading File',
  context,
  available: context => {
    return context.file.blob == null
  },
  Component: ({ context, updateContext }) => {
    const { value: blob } = useAsync(async () => {
      const result = await fetch(context.file.url)
      if (!result.ok) throw new Error('Network response was not ok.')
      return result.blob()
    }, [context.file.url])

    useEffect(() => {
      if (blob != null)
        updateContext({ file: { blob, mimetype: blob.type, size: blob.size } })
    }, [blob, updateContext])
    return <Loading message="Loading file data..." />
  }
})
