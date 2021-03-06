import React, { useRef, useState } from 'react'
import { Box, useTheme, useColorModeValue, Button } from '@chakra-ui/react'
import { useMount } from 'react-use'
import { getColor } from '@chakra-ui/theme-tools'
import WavesurferJs from 'wavesurfer.js'

const PanelAudioWaveForm: React.FC = () => {
  const element = useRef<HTMLDivElement>()
  const wavesurfer = useRef<WaveSurfer>()
  const [playing, setPlaying] = useState(false)

  const theme = useTheme()
  const waveColor = useColorModeValue('gray.700', 'gray.300')
  const progressColor = useColorModeValue('blue.600', 'blue.300')
  const cursorColor = useColorModeValue('black', 'white')

  useMount(() => {
    wavesurfer.current = WavesurferJs.create({
      container: element.current,
      responsive: true,
      waveColor: getColor(theme, waveColor),
      progressColor: getColor(theme, progressColor),
      cursorColor: getColor(theme, cursorColor),
      mediaControls: true
    })
    wavesurfer.current.load(
      'https://s3.amazonaws.com/datasets.workaround.online/voice-samples/001/voice.mp3'
    )
    wavesurfer.current.on('play', () => setPlaying(true))
    wavesurfer.current.on('pause ', () => setPlaying(false))
  })

  return (
    <Box>
      <Box ref={element} />
      <Button
        onClick={() => {
          setPlaying(p => !p)
          wavesurfer.current.playPause()
        }}
      >
        {playing ? 'Playing' : 'Paused'}
      </Button>
    </Box>
  )
}

export default PanelAudioWaveForm
