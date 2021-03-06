import { useMemo, useState } from 'react'
import { matchSorter, MatchSorterOptions } from 'match-sorter'
import { useDebounce } from 'react-use'

export type UseMatchSorterOptions<T> = MatchSorterOptions<T> & {
  debounce?: number
}

export function useMatchSorter<T>(
  items: Array<T>,
  value: string,
  options?: UseMatchSorterOptions<T>
) {
  const [valueDebounced, setSearchDebounced] = useState(value)
  useDebounce(
    () => {
      setSearchDebounced(value)
    },
    options?.debounce ?? 0,
    [value]
  )
  const filteredResult = useMemo(
    () => matchSorter(items, valueDebounced, options),
    [items, valueDebounced, options]
  )

  return useMemo(() => (value.length === 0 ? items : filteredResult), [
    value,
    items,
    filteredResult
  ])
}
