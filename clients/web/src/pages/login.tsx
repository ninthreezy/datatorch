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
  Checkbox,
  Button
} from '@chakra-ui/react'

type Inputs = {
  email: string
  password: string
  remember: boolean
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
        Sign in to DataTorch
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mt={3}>
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <Input type="email" {...register('email', { required: true })} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          <FormLabel htmlFor="password" mt={4}>
            Password
          </FormLabel>
          <Input
            type="password"
            {...register('password', { required: true })}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          <Checkbox mt={4} {...register('remember')}>
            Remember me for one month
          </Checkbox>
          <br />
        </FormControl>
        <Button
          width="100%"
          mt={5}
          isLoading={isSubmitting}
          type="submit"
          colorScheme="teal"
        >
          Login
        </Button>
      </form>

      <Text mt={3}>
        Don&apos;t have an account?{' '}
        <Link href="/register">
          <ChakraLink color="teal.500">Sign up</ChakraLink>
        </Link>
      </Text>
    </Container>
  )
}

export default Index
