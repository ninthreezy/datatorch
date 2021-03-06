export interface StringField {
  type: 'text'
}

export interface NumberField {
  type: 'number'
  min?: string
  max?: string
  step?: string
  range?: boolean
}

export interface DateField {
  type: 'date'
}

export interface DateTimeField {
  type: 'date-time'
}

export interface ListField {
  type: 'list'
  options: any[]
}

export type Field = StringField | NumberField
export type FieldType = Field['type']
