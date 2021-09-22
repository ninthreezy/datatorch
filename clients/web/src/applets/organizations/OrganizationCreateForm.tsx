import React from 'react'
import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  Radio,
  RadioGroup,
  Text,
  VStack,
  useColorModeValue as mode,
  Divider,
  Heading,
  Button,
  TextProps,
  useBreakpointValue
} from '@chakra-ui/react'
import { MdLock, MdPublic, MdPeople, MdBusiness } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'
import { Controller, useForm } from 'react-hook-form'
import slugify from 'slugify'

interface OrganizationCreateFormInputs {
  ownerId: string
  name: string
  contactEmail: string
  description: string
  visibility: 'public' | 'private'
  tier: 'free' | 'team' | 'enterprise'
}

export const OrganizationCreateForm: React.FC = () => {
  const { control, register, handleSubmit, formState } =
    useForm<OrganizationCreateFormInputs>()

  const onSubmit = handleSubmit(inputs => {
    const slug = slugify(inputs.name)
    const variables = { ...inputs, slug }
    // eslint-disable-next-line no-console
    console.log(variables)
  })

  /** const isGteMd = useBreakpointValue({ base: false, md: true }) **/

  return (
    <form onSubmit={onSubmit}>
      <Box justifyItems="center">
        <Text color={mode('gray.600', 'gray.300')} fontSize="sm">
          Tell us about your organization
        </Text>
        <Heading
          fontSize="3xl"
          letterSpacing="wide"
          marginBottom={1}
          justifyContent="center"
        >
          Create your Organization
        </Heading>
      </Box>

      <Divider my="5" />

      <Heading
        fontSize="xl"
        letterSpacing="wide"
        marginBottom={3}
        justifyContent="center"
      >
        Pick a plan
      </Heading>

      <FormControl as="fieldset">
        <Controller
          control={control}
          name="tier"
          defaultValue="free"
          render={({ field }) => (
            <RadioGroup {...field}>
              <VStack spacing="2" alignItems="flex-start">
                <Radio value="free">
                  <Flex alignItems="center">
                    <Icon as={MdPublic} w={8} h={8} marginX={2} />
                    <Box>
                      <Text fontWeight="semibold" fontSize="sm">
                        Free - $0 per user/month
                      </Text>
                      <FormHelperText marginTop={0} fontSize="xs">
                        Public organizations are always free. Anyone can view.
                      </FormHelperText>
                    </Box>
                  </Flex>
                </Radio>
                <Radio value="team">
                  <Flex alignItems="center">
                    <Icon as={MdPeople} w={8} h={8} marginX={2} />
                    <Box>
                      <Text fontWeight="semibold" fontSize="sm">
                        Team - $4 per user/month
                      </Text>
                      <FormHelperText marginTop={0} fontSize="xs">
                        Private organizations with enhanced capabilities for
                        teams.
                      </FormHelperText>
                    </Box>
                  </Flex>
                </Radio>
                <Radio value="enterprise">
                  <Flex alignItems="center">
                    <Icon as={MdBusiness} w={8} h={8} marginX={2} />
                    <Box>
                      <Text fontWeight="semibold" fontSize="sm">
                        Enterprise - $20+ per user/month
                      </Text>
                      <FormHelperText marginTop={0} fontSize="xs">
                        Maximum security and customization for enterprise use.
                      </FormHelperText>
                    </Box>
                  </Flex>
                </Radio>
              </VStack>
            </RadioGroup>
          )}
        />
      </FormControl>

      <Divider my="5" />

      <Heading
        fontSize="xl"
        letterSpacing="wide"
        marginBottom={3}
        justifyContent="center"
      >
        Enter details
      </Heading>

      <FormControl id="name" marginTop="2">
        <FormLabel fontSize="sm">Organization account name</FormLabel>
        <Input {...register('name')} size="sm" />
      </FormControl>

      <FormControl id="email" marginTop="2">
        <FormLabel fontSize="sm">Contact email</FormLabel>
        <Input {...register('name')} size="sm" />
      </FormControl>

      <FormControl id="description" marginTop="2">
        <FormLabel fontSize="sm">Description (Optional)</FormLabel>
        <Input {...register('description')} size="sm" />
      </FormControl>

      <Divider marginY="7" />

      <Heading
        fontSize="xl"
        letterSpacing="wide"
        marginBottom={3}
        justifyContent="center"
      >
        Choose access
      </Heading>

      <FormControl as="fieldset">
        <Controller
          control={control}
          name="visibility"
          defaultValue="private"
          render={({ field }) => (
            <RadioGroup {...field}>
              <VStack spacing="2" alignItems="flex-start">
                <Radio value="private">
                  <Flex alignItems="center">
                    <Icon as={MdLock} w={8} h={8} marginX={2} />
                    <Box>
                      <Text fontWeight="semibold" fontSize="sm">
                        Private
                      </Text>
                      <FormHelperText marginTop={0} fontSize="xs">
                        You choose who can see this organization.
                      </FormHelperText>
                    </Box>
                  </Flex>
                </Radio>
                <Radio value="public">
                  <Flex alignItems="center">
                    <Icon as={MdPublic} w={8} h={8} marginX={2} />
                    <Box>
                      <Text fontWeight="semibold" fontSize="sm">
                        Public
                      </Text>
                      <FormHelperText marginTop={0} fontSize="xs">
                        Anyone on the internet can see this organization.
                      </FormHelperText>
                    </Box>
                  </Flex>
                </Radio>
              </VStack>
            </RadioGroup>
          )}
        />
      </FormControl>

      <Divider marginY="5" />

      <Button
        type="submit"
        colorScheme="green"
        leftIcon={<Icon as={FaPlus} />}
        isLoading={formState.isSubmitting}
      >
        Create organization
      </Button>
    </form>
  )
}
