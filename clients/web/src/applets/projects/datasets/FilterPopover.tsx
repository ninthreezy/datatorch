import {
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  IconButton,
  Icon,
  Popover,
  FormLabel,
  Select,
  Checkbox
} from '@chakra-ui/react'
import { FaFilter } from 'react-icons/fa'
import { useForm } from 'react-hook-form'

type Inputs = {
  sort?: string
  numberOfItems?: string
  showCompleted?: boolean
  showSkipped?: boolean
}

export const FilterPopover: React.FC<Inputs> = () => {
  const { register, watch } = useForm<Inputs>({
    defaultValues: {
      sort: 'name',
      numberOfItems: '20',
      showCompleted: true,
      showSkipped: true
    }
  })
  const watchAllFields = watch()
  // eslint-disable-next-line no-console
  console.log(watchAllFields)
  return (
    <Popover placement="top-start">
      <PopoverTrigger>
        <IconButton
          size="sm"
          aria-label="File filter"
          marginLeft={0.5}
          variant="ghost"
          icon={<Icon as={FaFilter} />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <form>
            <FormLabel>Sort by</FormLabel>
            <Select {...register('sort')} mt={1}>
              <option value="name">Name</option>
              <option value="lastCreated">Last Created</option>
              <option value="lastUpdated">Last Updated</option>
              <option value="oldestCreated">Oldest Created</option>
              <option value="oldestUpdated">Oldest Updated</option>
              <option value="largestSize">Largest Size</option>
              <option value="smallestSize">Smallest Size</option>
            </Select>
            <FormLabel mt={4}>Items per page</FormLabel>
            <Select {...register('numberOfItems')} mt={1}>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </Select>
            <FormLabel mt={4}>Labeled</FormLabel>
            <Checkbox {...register('showCompleted')}>Show completed</Checkbox>
            <br />
            <Checkbox {...register('showSkipped')}>Show skipped</Checkbox>
          </form>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
