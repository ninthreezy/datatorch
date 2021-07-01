import React, { useState } from 'react'
import { SettingsLayout } from '@/applets/settings/SettingsLayout'
import { NextPage } from 'next'
import { CardWithHeading } from '@/common/Card'
import {
  Table,
  Tr,
  Th,
  Td,
  Thead,
  Tbody,
  Checkbox,
  Icon,
  Button
} from '@chakra-ui/react'
import { SubmitHandler, useForm, UseFormRegister } from 'react-hook-form'
import { FaTrash } from 'react-icons/fa'

interface ApiRowProps {
  name: string
  lastAccessed: string | Date
  created: string | Date
  id: string
  isChecked: boolean
  onChange: (event: any) => void
  register: UseFormRegister<any>
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

const ApiRow: React.FC<ApiRowProps> = ({
  name,
  lastAccessed,
  created,
  id,
  isChecked,
  onChange,
  register
}) => {
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
        <Checkbox isChecked={isChecked} onChange={onChange} {...register(id)} />
      </Td>
      <Td>{name}</Td>
      <Td>{accessString}</Td>
      <Td>{createdString}</Td>
    </Tr>
  )
}

interface ApiInputs {
  [key: string]: boolean
}

const ApiCard: React.FC = () => {
  const { register, handleSubmit } = useForm<ApiInputs>()
  const apiKeys = testData
  const [checkedItems, setCheckedItems] = useState(apiKeys.map(_ => false))

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked

  // eslint-disable-next-line no-console
  const onSubmit: SubmitHandler<ApiInputs> = (data, e) => console.log(data, e)

  const onCheckboxChange = _ => {
    const newCheckedItems = [...checkedItems]
    newCheckedItems
  }

  return (
    <CardWithHeading name="Api Keys">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button type="submit">
          <Icon as={FaTrash} />
        </Button>
        <Table>
          <Thead>
            <Tr>
              <Th>
                <Checkbox
                  isChecked={allChecked}
                  isIndeterminate={isIndeterminate}
                  onChange={e =>
                    setCheckedItems(apiKeys.map(_ => e.target.checked))
                  }
                />
              </Th>
              <Th>Name</Th>
              <Th>Last Accessed</Th>
              <Th>Created</Th>
            </Tr>
          </Thead>
          <Tbody>
            {testData.map(({ name, lastAccessed, created, id }, index) => (
              <ApiRow
                name={name}
                lastAccessed={lastAccessed}
                created={created}
                register={register}
                key={index}
                isChecked={checkedItems[index]}
                onChange={onCheckboxChange}
                id={id}
              />
            ))}
          </Tbody>
        </Table>
      </form>
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
