import { Td, Tr } from '@chakra-ui/react'
import React from 'react'

export interface TableRowProps {
  data: string[]
  preD?: JSX.Element
  postD?: JSX.Element
}

const TableRow: React.FC<TableRowProps> = ({ data, preD, postD }) => {
  return (
    <Tr>
      {preD && <Td>{preD}</Td>}
      {data.map((d, i) => (
        <Td key={i}>{d}</Td>
      ))}
      {postD && <Td>{postD}</Td>}
    </Tr>
  )
}

export default TableRow
