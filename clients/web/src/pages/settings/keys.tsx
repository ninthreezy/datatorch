import React from 'react'
import { SettingsLayout } from '@/applets/settings/SettingsLayout'
import { NextPage } from 'next'
import { CardWithHeading } from '@/common/Card'
import { Table, Tr, Th, Td, Thead, Tbody, Checkbox } from '@chakra-ui/react'

interface ApiRowProps {
  name: string
  lastAccessed: string | Date
  created: string | Date
}

const testData = [
  {
    name: 'Apricot Grasshopper',
    lastAccessed: '11/9/2020, 5:09:58 PM',
    created: '11/9/2020, 5:09:58 PM',
    id: '12345'
  },
  {
    name: 'Blue Haddock',
    lastAccessed: '11/9/2020, 5:18:19 PM',
    created: '11/9/2020, 5:18:19 PM',
    id: '23456'
  },
  {
    name: 'Blue Haddock But Longer And Meant To Test The Limits of Human Potential',
    lastAccessed: '11/9/2020, 5:18:19 PM',
    created: '11/9/2020, 5:18:19 PM',
    id: '34567'
  }
]

const ApiRow: React.FC<ApiRowProps> = ({ name, lastAccessed, created }) => {
  let accessString, createdString
  typeof lastAccessed === 'string'
    ? (accessString = lastAccessed)
    : (accessString = lastAccessed.toDateString())
  typeof created === 'string'
    ? (createdString = created)
    : (createdString = created.toDateString())
  return (
    <Tr>
      <Td>
        <Checkbox />
      </Td>
      <Td>{name}</Td>
      <Td>{accessString}</Td>
      <Td>{createdString}</Td>
    </Tr>
  )
}

const ApiCard: React.FC = () => {
  return (
    <CardWithHeading name="Api Keys">
      <Table>
        <Thead>
          <Th>
            <Checkbox />
          </Th>
          <Th>Name</Th>
          <Th>Last Accessed</Th>
          <Th>Created</Th>
        </Thead>
        <Tbody>
          {testData.map(({ name, lastAccessed, created }, index) => (
            <ApiRow
              name={name}
              lastAccessed={lastAccessed}
              created={created}
              key={index}
            />
          ))}
        </Tbody>
      </Table>
    </CardWithHeading>
  )
}

const SettingsApiKeys: NextPage = () => {
  return (
    <SettingsLayout>
      <ApiCard />
    </SettingsLayout>
  )
}

export default SettingsApiKeys
