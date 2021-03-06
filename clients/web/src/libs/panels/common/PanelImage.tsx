import { definePanel } from '../core'
import * as rt from 'runtypes'
import { createRef, useEffect } from 'react'

const context = rt.Record({
  file: rt.Record({
    url: rt.String,
    mimetype: rt.String.withConstraint(s => s.startsWith('image/'))
  })
})

export function clear(canvas: HTMLCanvasElement | null) {
  const context = canvas?.getContext('2d')
  if (context == null || canvas == null) return
  context.save()
  context.setTransform(1, 0, 0, 1, 0, 0)
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.restore()
}

export function fitToContainer(canvas: HTMLCanvasElement | null) {
  if (canvas == null) return

  canvas.style.width = '100%'
  canvas.style.height = '100%'

  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
}

export const PanelImage = definePanel({
  displayName: 'Image',
  relevance: 10,
  context,
  Component: ({ context }) => {
    const canvas = createRef<HTMLCanvasElement>()

    useEffect(() => {
      const canvasEl = canvas.current
      const ctx2d = canvasEl?.getContext('2d')
      if (canvasEl == null || ctx2d == null) return

      const previousMouse = { x: 0, y: 0 }
      const origin = { x: 0, y: 0 }
      let scale = 0
      let isDown = false

      fitToContainer(canvas.current)

      const image = new Image()
      image.src = context.file.url

      const draw = () => {
        clear(canvas.current)
        ctx2d.drawImage(image, 0, 0)
      }

      const fitImage = () => {
        const context = canvas.current?.getContext('2d')
        if (context == null || canvas.current == null) return

        scale = 1
        origin.x = 0
        origin.y = 0
        context.setTransform(1, 0, 0, 1, 0, 0)

        const border = 0.98
        const zoomFactor =
          Math.min(
            canvasEl.width / image.width,
            canvasEl.height / image.height
          ) * border

        context.scale(zoomFactor, zoomFactor)
        scale *= zoomFactor

        const offsetX = (canvasEl.width - image.width * scale) / 2
        const offsetY = (canvasEl.height - image.height * scale) / 2

        context.translate(offsetX / scale, offsetY / scale)

        origin.x -= offsetX / scale
        origin.y -= offsetY / scale
      }

      const zoom = (event: WheelEvent) => {
        const delta = event.deltaY
        const direction = delta > 0 ? -1 : 1
        const zoom = 1 + direction * 0.2
        const mouseX = event.clientX - canvasEl.offsetLeft
        const mouseY = event.clientY - canvasEl.offsetTop

        ctx2d.translate(origin.x, origin.y)
        ctx2d.scale(zoom, zoom)
        ctx2d.translate(
          -(mouseX / scale + origin.x - mouseX / (scale * zoom)),
          -(mouseY / scale + origin.y - mouseY / (scale * zoom))
        )

        origin.x = mouseX / scale + origin.x - mouseX / (scale * zoom)
        origin.y = mouseY / scale + origin.y - mouseY / (scale * zoom)

        scale *= zoom
      }

      image.onload = () => {
        fitImage()
        draw()
      }

      canvasEl.addEventListener('contextmenu', event => {
        event.stopPropagation()
        event.preventDefault()
        fitImage()
        draw()
      })

      canvasEl.addEventListener('mousedown', event => {
        event.stopPropagation()
        event.preventDefault()
        previousMouse.x = event.clientX - (canvas.current?.offsetLeft ?? 0)
        previousMouse.y = event.clientY - (canvas.current?.offsetTop ?? 0)
        isDown = true
      })

      canvasEl.addEventListener('mousemove', event => {
        if (isDown) {
          const mouseX = event.clientX - (canvasEl.offsetLeft ?? 0)
          const mouseY = event.clientY - (canvasEl.offsetTop ?? 0)
          const dx = mouseX - previousMouse.x
          const dy = mouseY - previousMouse.y
          previousMouse.x = mouseX
          previousMouse.y = mouseY
          ctx2d.translate(dx / scale, dy / scale)
          origin.x -= dx / scale
          origin.y -= dy / scale
          draw()
        }
      })

      canvas.current?.addEventListener('mouseup', event => {
        event.stopPropagation()
        event.preventDefault()
        isDown = false
      })

      canvas.current?.addEventListener(
        'mousewheel',
        e => {
          zoom(e as WheelEvent)
          draw()
        },
        false
      )
    }, [canvas, context])

    return <canvas ref={canvas}></canvas>
  }
})
