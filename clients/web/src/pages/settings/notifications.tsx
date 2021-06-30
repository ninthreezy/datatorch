import React from 'react'
import { NextPage } from 'next'
import { SubmitHandler, useForm } from 'react-hook-form'

import { FormButton } from '@/common/forms/FormButton'
import { CardWithHeading } from '@/common/Card'
import { SettingsLayout } from '@/applets/settings/SettingsLayout'
import { FormInput, FormTextarea } from '@/common/forms/FormField'
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

const NotificationsCard: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ProfileInputs>()

  const onSubmit: SubmitHandler<ProfileInputs> = (data, event) =>
    // eslint-disable-next-line no-console
    console.log(data, event)
  return (
    <CardWithHeading name="Notification Settings">
      Notifications Settings
    </CardWithHeading>
  )
}

const SettingsProfile: NextPage = () => {
  return (
    <SettingsLayout>
      <NotificationsCard />
    </SettingsLayout>
  )
}

export default SettingsProfile
