import { useEffect, useState } from 'react'

export const useMouseDown = () => {
  const [mouseDown, setMouseDown] = useState(false)
  useEffect(() => {
    const mouseIsUp = () => setMouseDown(false)
    window.addEventListener('mouseup', mouseIsUp)
    return () => {
      window.addEventListener('mouseup', mouseIsUp)
    }
  }, [setMouseDown])

  useEffect(() => {
    const mouseIsDown = () => setMouseDown(true)
    window.addEventListener('mousedown', mouseIsDown)
    return () => {
      window.addEventListener('mousedown', mouseIsDown)
    }
  }, [setMouseDown])

  return mouseDown
}
