import * as rt from 'runtypes'

export const BlobFile = rt.InstanceOf(Blob)
export const File = rt.Record({
  url: rt.String,
  name: rt.Undefined.Or(rt.String),
  blob: rt.Undefined.Or(BlobFile),
  mimetype: rt.String
})

export const ImageFile = File.And(
  rt.Record({ width: rt.Number, height: rt.Number })
)
