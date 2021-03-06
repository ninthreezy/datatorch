import * as rt from 'runtypes'

const Polygon = rt.Array(rt.Tuple(rt.Number, rt.Number))

export const Segmentation = rt.Record({
  type: rt.Literal('segmentation'),
  polygons: rt.Array(Polygon)
})
export type Segmentation = rt.Static<typeof Segmentation>

export const BoundingBox = rt.Record({
  type: rt.Literal('bounding-box'),
  x: rt.Number,
  y: rt.Number,
  width: rt.Number,
  height: rt.Number
})

export const Source = rt.Union(Segmentation, BoundingBox)
export type Source = rt.Static<typeof Source>

export const Annotation = rt.Record({
  id: rt.String,
  labelId: rt.String,
  sources: rt.Array(Source)
})

export type Annotation = rt.Static<typeof Annotation>
