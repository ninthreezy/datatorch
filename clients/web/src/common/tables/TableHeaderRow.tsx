import { Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { TableRowProps } from './TableRow'

const TableHeaderRow: React.FC<TableRowProps> = ({ data, preD, postD }) => {
  return (
    <Thead>
      <Tr>
        {preD && <Th>{preD}</Th>}
        {data.map((d, i) => (
          <Th key={i}>{d}</Th>
        ))}
        {postD && <Th>{postD}</Th>}
      </Tr>
    </Thead>
  )
}

export default TableHeaderRow
