import * as rt from 'runtypes'

export const context = rt.Record({
  file: rt.Record({
    url: rt.String,
    mimetype: rt.String.withConstraint(s => s?.startsWith('image/'))
  })
})
