import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import {
  Text,
  Link as ChakraLink,
  Container,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button
} from '@chakra-ui/react'

type Inputs = {
  email: string
  username: string
  password: string
}

const Index: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>()

  // eslint-disable-next-line no-console
  const onSubmit = data => console.log(data)

  return (
    <Container mt={5}>
      <Text as="b" fontSize="xl">
        Create your account
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.username?.message.length > 0}>
          <FormLabel mt={4} htmlFor="username">
            Username
          </FormLabel>
          <Input
            type="text"
            {...register('username', { required: 'Username is required' })}
          />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.email?.message.length > 0}>
          <FormLabel mt={4} htmlFor="email">
            Email
          </FormLabel>
          <Input
            type="email"
            {...register('email', { required: 'Email is requried' })}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password?.message.length > 0}>
          <FormLabel mt={4} htmlFor="passsword">
            Password
          </FormLabel>
          <Input
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <br />
        <Button
          width="100%"
          mt={1}
          colorScheme="teal"
          type="submit"
          isLoading={isSubmitting}
        >
          Create Account
        </Button>
        <Text fontSize="small" mt={2}>
          By creating an account, you agree to the{' '}
          <Link href="/terms">
            <ChakraLink color="teal.500">Terms of Service</ChakraLink>
          </Link>
          . We will occasionally send you account-related emails.{' '}
        </Text>
      </form>

      <Text mt={3}>
        Already have an account?{' '}
        <Link href="/login">
          <ChakraLink color="teal.500">Sign in</ChakraLink>
        </Link>
      </Text>
    </Container>
  )
}

export default Index
