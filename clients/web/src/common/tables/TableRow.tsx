import { Td, Tr } from '@chakra-ui/react'
import React from 'react'

export interface TableRowProps {
  data: any[]
  prefixData?: JSX.Element
}

const TableRow: React.FC<TableRowProps> = ({ data, prefixData }) => {
  return (
    <Tr>
      {prefixData && <Td>{prefixData}</Td>}
      {data.map((d, i) => (
        <Td key={i}>{d}</Td>
      ))}
    </Tr>
  )
}

export default TableRow
