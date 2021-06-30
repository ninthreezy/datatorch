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
  fieldName: string
  register?: UseFormRegister<any>
  id: string
  type?: string
  error?: FieldError
}

interface SettingsButtonProps {
  name: string
  isSubmitting: boolean
}

const SettingsFormLabel: React.FC<SettingsFieldProps> = props => {
  return (
    <FormLabel htmlFor={props.id} mt={2}>
      {props.fieldName}
    </FormLabel>
  )
}

const SettingsInput: React.FC<SettingsFieldProps> = props => {
  const { type, id, fieldName, register, error } = props
  return (
    <FormControl>
      <SettingsFormLabel type={type} id={id} fieldName={fieldName} />
      <Input type={type} {...register(id)} />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}

const SettingsTextarea: React.FC<SettingsFieldProps> = props => {
  const { id, fieldName, error } = props
  return (
    <FormControl>
      <SettingsFormLabel id={id} fieldName={fieldName} />
      <Textarea />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}

const SettingsButton: React.FC<SettingsButtonProps> = props => {
  const { isSubmitting, name } = props
  return (
    <Button mt={3} type="submit" colorScheme="teal" isLoading={isSubmitting}>
      {name}
    </Button>
  )
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
    <Card>
      <CardHeading>Public Profile</CardHeading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SettingsInput
          id="name"
          fieldName="Name"
          register={register}
          error={errors.name}
        />
        <SettingsTextarea
          id="bio"
          fieldName="Bio"
          register={register}
          error={errors.bio}
        />
        <SettingsInput
          id="company"
          fieldName="Company"
          register={register}
          error={errors.company}
        />
        <SettingsInput
          id="location"
          fieldName="Location"
          register={register}
          error={errors.location}
        />
        <SettingsButton name="Update Profile" isSubmitting={isSubmitting} />
      </form>
    </Card>
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
    <Card>
      <CardHeading>Change Password</CardHeading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SettingsInput
          id="oldPassword"
          fieldName="Old Password"
          register={register}
          type="password"
          error={errors.oldPassword}
        />
        <SettingsInput
          id="newPassword"
          fieldName="New Password"
          register={register}
          type="password"
          error={errors.newPassword}
        />
        <SettingsInput
          id="confirmPassword"
          fieldName="Confirm New Password"
          register={register}
          type="password"
          error={errors.confirmPassword}
        />
        <SettingsButton name="Update" isSubmitting={isSubmitting} />
      </form>
    </Card>
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
