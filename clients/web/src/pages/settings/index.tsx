import React from 'react'
import { NextPage } from 'next'
import {
  FieldError,
  SubmitHandler,
  useForm,
  UseFormRegister
} from 'react-hook-form'

import { Card, CardHeading } from '@/common/Card'
import { SettingsLayout } from '@/applets/settings/SettingsLayout'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea
} from '@chakra-ui/react'

interface SettingsFieldProps {
  displayName: string
  register?: UseFormRegister<any>
  field: string
  type?: string
  error?: FieldError
  required?: boolean
}

interface SettingsButtonProps {
  name: string
  isSubmitting: boolean
}

interface CardTitleProps {
  name: string
}

interface ProfileInputs {
  name: string
  bio: string
  company: string
  location: string
}

interface PasswordInputs {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

const SettingsFormLabel: React.FC<SettingsFieldProps> = ({
  field,
  displayName
}) => {
  return (
    <FormLabel htmlFor={field} mt={2}>
      {displayName}
    </FormLabel>
  )
}

const SettingsInput: React.FC<SettingsFieldProps> = ({
  type,
  required,
  field,
  displayName,
  register,
  error
}) => {
  return (
    <FormControl isInvalid={error?.message.length > 0}>
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

const SettingsTextarea: React.FC<SettingsFieldProps> = ({
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

const SettingsButton: React.FC<SettingsButtonProps> = ({
  isSubmitting,
  name
}) => {
  return (
    <Button mt={3} type="submit" colorScheme="teal" isLoading={isSubmitting}>
      {name}
    </Button>
  )
}

const CardWithHeading: React.FC<CardTitleProps> = ({ name, children }) => {
  return (
    <Card>
      <CardHeading>{name}</CardHeading>
      {children}
    </Card>
  )
}

const ProfileCard: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ProfileInputs>()

  const onSubmit: SubmitHandler<ProfileInputs> = (data, event) =>
    // eslint-disable-next-line no-console
    console.log(data, event)
  return (
    <CardWithHeading name="Public Profile">
      <form onSubmit={handleSubmit(onSubmit)}>
        <SettingsInput
          field="name"
          displayName="Name"
          register={register}
          error={errors.name}
        />
        <SettingsTextarea
          field="bio"
          displayName="Bio"
          register={register}
          error={errors.bio}
        />
        <SettingsInput
          field="company"
          displayName="Company"
          register={register}
          error={errors.company}
        />
        <SettingsInput
          field="location"
          displayName="Location"
          register={register}
          error={errors.location}
        />
        <SettingsButton name="Update Profile" isSubmitting={isSubmitting} />
      </form>
    </CardWithHeading>
  )
}

const PasswordCard: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<PasswordInputs>()

  const onSubmit: SubmitHandler<PasswordInputs> = (data, event) =>
    // eslint-disable-next-line no-console
    console.log(data, event)

  return (
    <CardWithHeading name="Change Password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <SettingsInput
          field="oldPassword"
          displayName="Old Password"
          register={register}
          type="password"
          required
          error={errors.oldPassword}
        />
        <SettingsInput
          field="newPassword"
          displayName="New Password"
          register={register}
          type="password"
          required
          error={errors.newPassword}
        />
        <SettingsInput
          field="confirmPassword"
          displayName="Confirm New Password"
          register={register}
          type="password"
          required
          error={errors.confirmPassword}
        />
        <SettingsButton name="Update" isSubmitting={isSubmitting} />
      </form>
    </CardWithHeading>
  )
}

const SettingsProfile: NextPage = () => {
  return (
    <SettingsLayout>
      <ProfileCard />
      <PasswordCard />
    </SettingsLayout>
  )
}

export default SettingsProfile
