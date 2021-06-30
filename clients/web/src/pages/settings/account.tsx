import { SettingsLayout } from '@/applets/settings/SettingsLayout'
import { CardWithHeading } from '@/common/Card'
import { FormButton } from '@/common/forms/FormButton'
import { FormInput } from '@/common/forms/FormField'
import { NextPage } from 'next'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface PasswordInputs {
  oldPassword: string
  newPassword: string
  confirmPassword: string
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
        <FormInput
          field="oldPassword"
          displayName="Old Password"
          register={register}
          type="password"
          required
          error={errors.oldPassword}
        />
        <FormInput
          field="newPassword"
          displayName="New Password"
          register={register}
          type="password"
          required
          error={errors.newPassword}
        />
        <FormInput
          field="confirmPassword"
          displayName="Confirm New Password"
          register={register}
          type="password"
          required
          error={errors.confirmPassword}
        />
        <FormButton name="Update" isSubmitting={isSubmitting} />
      </form>
    </CardWithHeading>
  )
}

const SettingsAccount: NextPage = () => {
  return (
    <SettingsLayout>
      <PasswordCard />
    </SettingsLayout>
  )
}

export default SettingsAccount
