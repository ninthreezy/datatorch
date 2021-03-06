import React, { useEffect, useState } from 'react'
import { Static } from 'runtypes'

import { ImageOverlay, MapContainer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { PanelProps } from '../../../core'
import { context } from './context'

type PanelImageLeafletProps = PanelProps<Static<typeof context>, unknown>
const PanelImageLeaflet: React.FC<PanelImageLeafletProps> = ({ context }) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const image = new Image()
    image.src = context.file.url
    image.onload = () => {
      const divider = image.width / 55

      setWidth(image.width / divider)
      setHeight(image.height / divider)
    }
  }, [context])

  return (
    width > 0 &&
    height > 0 && (
      <MapContainer
        attributionControl={false}
        center={[height / 2, width / 2]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <ImageOverlay
          url={context.file.url}
          bounds={[
            [0, 0],
            [height, width]
          ]}
        />
      </MapContainer>
    )
  )
}

export default PanelImageLeaflet
