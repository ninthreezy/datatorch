import React, { useState } from 'react'
import {
  Box,
  Button,
  Grid,
  GridItem,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue as mode
} from '@chakra-ui/react'
import { FaChevronDown, FaSearch } from 'react-icons/fa'
import { useMatchSorter } from '@/libs/hooks/useMatchSorter'

const WhereLogic: React.FC = () => {
  const [logic, setLogic] = useState('And')
  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="outline"
        size="sm"
        rightIcon={<Icon as={FaChevronDown} color="gray.500" />}
        isFullWidth
      >
        {logic}
      </MenuButton>
      <MenuList>
        <MenuItem
          flexDirection="column"
          alignItems="flex-start"
          onClick={() => setLogic('And')}
        >
          <Text fontSize="sm">And</Text>
          <Text fontSize="xs" color={mode('gray.700', 'gray.300')}>
            All filters must match
          </Text>
        </MenuItem>
        <MenuItem
          flexDirection="column"
          alignItems="flex-start"
          onClick={() => setLogic('Or')}
        >
          <Text fontSize="sm">Or</Text>
          <Text fontSize="xs" color={mode('gray.700', 'gray.300')}>
            At least on filter must match
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

const WhereProperty: React.FC = () => {
  const [search, setSearch] = useState('')
  const options = [{ value: 'status', text: 'test' }]
  const [value, setValue] = useState(options[0].value)
  const filteredOptions = useMatchSorter(options, search, {
    keys: ['value', 'test']
  })

  const active = options.find(o => o.value === value)

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="outline"
        size="sm"
        rightIcon={<Icon as={FaChevronDown} color="gray.500" />}
        isFullWidth
      >
        {active.text}
      </MenuButton>
      <MenuList>
        <Box marginX="2" marginBottom="2">
          <InputGroup size="xs" variant="filled">
            <InputLeftElement color="gray.300" pointerEvents="none">
              <Icon as={FaSearch} />
            </InputLeftElement>
            <Input
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </InputGroup>
        </Box>
        {filteredOptions.map(option => (
          <MenuItem key={option.value} onClick={() => setValue(option.value)}>
            <Text fontSize="sm">{option.text}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export const WhereInput: React.FC = () => {
  return (
    <Grid
      templateColumns="[boolean-start] 60px [boolean-end property-start] 120px [property-end opererator-start] 110px [operator-end value-start] auto [value-end menu-start] 32px [menu-end]"
      gap={2}
    >
      <GridItem>
        <WhereLogic />
      </GridItem>
      <GridItem>
        <WhereProperty />
      </GridItem>
    </Grid>
  )
}
