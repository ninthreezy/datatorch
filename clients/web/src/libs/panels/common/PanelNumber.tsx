import { memo } from 'react'
import { definePanel } from '../core'
import * as rt from 'runtypes'

const context = rt.Number

type Context = rt.Static<typeof context>
type Config = Intl.NumberFormatOptions

export const PanelNumber = definePanel<Context, Config>({
  displayName: 'Number',
  context,
  Component: memo(({ context, config }) => {
    return (
      <span>{new Intl.NumberFormat(undefined, config).format(context)}</span>
    )
  })
})
