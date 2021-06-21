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
    mimetype: rt.String.optional(),
    size: rt.Number.optional()
  })
})

export const PanelLoaderFile = definePanel({
  displayName: 'Loading File',
  context,
  available: context => context.file.blob == null,
  Component: ({ context, updateContext }) => {
    const { value: blob } = useAsync(
      async () => (await fetch(context.file.url)).blob(),
      [context.file.url]
    )

    useEffect(() => {
      if (blob != null)
        updateContext({ file: { blob, mimetype: blob.type, size: blob.size } })
    }, [blob, updateContext])

    return <Loading message="Loading file data..." />
  }
})
