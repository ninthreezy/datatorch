import React from 'react'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea
} from '@chakra-ui/react'
import { FieldError, UseFormRegister } from 'react-hook-form'

export interface SettingsFieldProps {
  displayName: string
  register?: UseFormRegister<any>
  field: string
  type?: string
  error?: FieldError
  required?: boolean
}

export const SettingsFormLabel: React.FC<SettingsFieldProps> = ({
  field,
  displayName
}) => {
  return <FormLabel htmlFor={field}>{displayName}</FormLabel>
}

export const FormInput: React.FC<SettingsFieldProps> = ({
  type,
  required,
  field,
  displayName,
  register,
  error
}) => {
  return (
    <FormControl isInvalid={error?.message.length > 0} mt={3}>
      <SettingsFormLabel type={type} field={field} displayName={displayName} />
      <Input
        type={type}
        {...register(field, {
          required: required && `${displayName} Required`
        })}
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const FormTextarea: React.FC<SettingsFieldProps> = ({
  field,
  displayName,
  error
}) => {
  return (
    <FormControl>
      <SettingsFormLabel field={field} displayName={displayName} />
      <Textarea />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}
