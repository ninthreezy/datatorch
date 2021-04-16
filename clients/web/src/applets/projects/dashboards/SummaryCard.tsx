import React from 'react'
import {
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  Box,
  Heading
} from '@chakra-ui/react'

export const SummaryItem: React.FC<{
  stat: string
  label: string
}> = ({ stat, label }) => {
  return (
    <Stat m={1}>
      <StatNumber>{stat}</StatNumber>
      <StatLabel>{label}</StatLabel>
    </Stat>
  )
}

export const SummaryCard: React.FC = () => {
  return (
    <Grid
      border="1px"
      borderColor="gray.500"
      borderRadius="sm"
      p={3}
      templateRows="repeat(2, 1fr)"
      gap={4}
    >
      <Box>
        <Heading mb={2} size="md">
          Progress
        </Heading>
        <Grid templateColumns="repeat(3, 1fr)">
          <SummaryItem stat="6" label="Completed" />
          <SummaryItem stat="6" label="Labeled" />
          <SummaryItem stat="5%" label="Progress" />
        </Grid>
      </Box>
      <Box>
        <Heading mb={2} size="md">
          Total
        </Heading>
        <Grid templateColumns="repeat(3, 1fr)">
          <SummaryItem stat="11.3MB" label="Size" />
          <SummaryItem stat="124" label="Files" />
          <SummaryItem stat="12" label="Labels" />
          <SummaryItem stat="29" label="Annotations" />
        </Grid>
      </Box>
    </Grid>
  )
}
