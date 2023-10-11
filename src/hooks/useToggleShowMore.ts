import { useState } from 'react'

export function useToggleShowMore(string: string, maxLength: number) {
  const [showMore, setShowMore] = useState(() => {
    return string.length <= maxLength
  })

  function toggleShowMore() {
    setShowMore((state) => !state)
  }

  const text = showMore ? string : string.slice(0, maxLength) + '...'

  return { text, toggleShowMore, isShowingMore: showMore }
}
