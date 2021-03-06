import clamp from 'lodash/clamp'

/**
 * The element's rect will be affected by the scroll positions of _all_ of its
 * scrollable parents, not just the window, so we have to walk up the tree and
 * collect every scroll offset. Good times.
 */
export const getScrollPosition = (el: HTMLElement) => {
  let offsetX = window.pageXOffset
  let offsetY = window.pageYOffset

  if (el !== document.body) {
    let parent = el.parentElement
    while (parent !== document.body) {
      offsetX += parent.scrollLeft
      offsetY += parent.scrollTop
      parent = parent.parentElement
    }
  }

  return { offsetX, offsetY }
}

export type PositionOptions = {
  direction: 'top' | 'bottom'
  align: 'left' | 'center'
}

export type ElementPosition = {
  top: number
  left: number
} | null

/**
 * Returns the left and right position for the element to float around a given
 * rectangle.
 */
export const getElementPositionFromRect = (
  el: HTMLElement,
  rect: DOMRect,
  options?: PositionOptions
): ElementPosition => {
  const { offsetX, offsetY } = getScrollPosition(el)

  // TODO: Add calculations to get X and Y offsets.
  const NAVBAR = 40
  const SIDEBAR = location.search.includes('fullscreen=false') ? -224 : 0

  const { direction = 'top', align = 'center' } = options
  const left =
    rect.left +
    offsetX +
    (align === 'center' ? rect.width / 2 - el.offsetWidth / 2 : 0)
  return {
    top:
      (direction === 'top'
        ? rect.top + offsetY - el.offsetHeight - 4
        : rect.bottom + offsetY + 4) - NAVBAR,
    left: clamp(left, 0, window.innerWidth - el.offsetWidth - 20) + SIDEBAR
  }
}

export const getPositionAtSelection = (
  el: HTMLElement,
  options?: PositionOptions
) => {
  const domSelection = window.getSelection()
  if (!domSelection || domSelection.rangeCount < 1) return null

  const domRange = domSelection.getRangeAt(0)
  const rect = domRange.getBoundingClientRect()

  return getElementPositionFromRect(el, rect, options)
}
