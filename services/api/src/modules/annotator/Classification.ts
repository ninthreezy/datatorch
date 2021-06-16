import { objectType, enumType } from 'nexus'

export const ClassificationType = enumType({
  name: 'ClassificationType',
  members: {
    RADIO: 'radio',
    CHECKBOX: 'checkbox',
    TEXT: 'text',
    DROPDOWN: 'dropbox',

    OPTION: 'option'
  }
})

export const Classification = objectType({
  name: 'Classification',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('type')
    t.nonNull.string('name')
    t.nonNull.string('instructions')
    t.id('parent')
    t.field('instance', { type: 'Instance' })
  }
})

export const InstanceType = enumType({
  name: 'InstanceType',
  members: {
    SEGMENTATION: 'segmentation',
    BOUNDING_BOX: 'bounding-box',
    LINE: 'line',
    POINT: 'point',
    ENTITY: 'entity'
  }
})

export const Instance = objectType({
  name: 'Instance',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.field('type', { type: InstanceType })
    t.nonNull.string('name')
    t.nonNull.boolean('required')
    t.nonNull.string('color')
    t.nonNull.list.field('classifications', { type: 'Classification' })
  }
})

export const Object = objectType({
  name: 'Object',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.field('instanceOf', { type: 'Instance' })
    // t.nonNull.json('data')
    // t.nonNull.json('properties')
  }
})
