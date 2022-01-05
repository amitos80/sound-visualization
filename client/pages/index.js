import React, {useState, useEffect, useLayoutEffect} from 'react'
import FluidAnimation from 'react-fluid-animation'
import {ToastContainer, toast} from 'react-toastify'
//import Wave from '../utils/wave-visualizer'
import { take, fill, sum, floor } from 'lodash'
const COMPRESSION_FACTOR = 8

//const { PlayerService } = require('../services')

const randomWhole = (min, max) => Math.floor(Math.random() * (max - min) + min)
const randomReal = (min, max) => Math.random() * (max - min) + min

const defaultConfig = {
    textureDownsample: 1,
    densityDissipation: 0.98,
    velocityDissipation: 0.99,
    pressureDissipation: 0.998,
    pressureIterations: 19,
    curl: 8,
    splatRadius: 0.008,
}

const baseConfigs = [
  {
    textureDownsample: 1,
    densityDissipation: 0.98,
    velocityDissipation: 0.99,
    pressureDissipation: 0.8,
    pressureIterations: 25,
    curl: 30,
    splatRadius: 0.005,
  },
  {
    textureDownsample: 2,
    densityDissipation: 0.9,
    velocityDissipation: 0.91,
    pressureDissipation: 1,
    pressureIterations: 44,
    curl: 0,
    splatRadius: 0.0057,
  },
  {
    textureDownsample: 0,
    densityDissipation: 0.92,
    velocityDissipation: 0.95,
    pressureDissipation: 0.8,
    pressureIterations: 10,
    curl: 20,
    splatRadius: 0.01,
  },
  {
    textureDownsample: 1,
    densityDissipation: 0.98,
    velocityDissipation: 0.99,
    pressureDissipation: 0.998,
    pressureIterations: 19,
    curl: 8,
    splatRadius: 0.008,
  },
]

function rect({id, x, y, width, height, fill = 'gray', stroke = 'skyblue', strokewidth = 2}) {
    return {
        x, y, id, width, height, fill, stroke, strokewidth,
    }
}

let factor = 0.1
let joined = false
let playerService;
let wave;
export const Home = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [frameNumber, setFrameNumber] = useState(0)
  const [animationConfig, setAnimationConfig] = useState(baseConfigs)
  const [currentConfig, setCurrentConfig] = useState(defaultConfig)
    const [startInterval, setStartInterval] = useState()
  let myRef = React.createRef();


  const changeStyle = () => {
      const configs = [...(animationConfig || [])]
      const newIndex = selectedIndex + 1 > configs.length -1 ? 0 : selectedIndex + 1;
        setSelectedIndex(
          newIndex
       )

      toast('style changed');
  }

  const randomStyle = () => {
    const configs = [...(animationConfig || [])]
    configs.push({
        textureDownsample: randomWhole(1, 3),
        densityDissipation: randomReal(0.9, 0.99),
        velocityDissipation: randomReal(0.9, 0.99),
        pressureDissipation: randomReal(0.1, 0.9),
        pressureIterations: randomWhole(1, 61),
        curl: randomWhole(15, 35),
        splatRadius: randomReal(0.003, 0.007),
    })
    const newIndex = configs.length -1;
    setSelectedIndex(
        newIndex
    )
    setAnimationConfig(configs)
    toast('random style');
  }

  function init() {
      // if (typeof window !== 'undefined') {
      //     if (!wave) {
      //
      //             if (wave) return
      //             navigator.mediaDevices
      //                 .getUserMedia({
      //                     audio: true,
      //                 })
      //                 .then(function (stream) {
      //                     const w = new Wave()
      //
      //                     w.fromStream(stream, 'visual-canvas', {
      //                         type: 'shine',
      //                         colors: ['red', 'white', 'blue'],
      //                     })
      //
      //                     wave = w
      //                     //setInterval(createSampleAnimation, 2400)
      //                 })
      //                 .catch(function (err) {
      //                     console.log(err.message)
      //                 })
      //
      //
      //     }
      //
      //     if (!playerService) {
      //         playerService = new PlayerService()
      //     }
      // }
  }

  function createSampleAnimation() {
      if (typeof window === 'undefined') return
      console.log(' createSampleAnimation wave ', wave)


      if (!wave) {
          init()
          return
      }


      console.log('wave?.current_stream?.data -> ', wave?.current_stream?.data);
      if (!wave?.current_stream?.data?.length) return

      console.log(' createSampleAnimation 2 ')
      const samples = Array.from(wave?.current_stream?.data)
      const a1 = samples.splice(0, 50)
      const a2 = samples.splice( 51, 70)
      const a3 = samples.splice( 71, 110)
      const a4 = samples.splice( 111, 333)

      // const pctValue1 = (sum(a1) / a1.length) / 160 // bass / gain
      // const pctValue2 = (sum(a2) / a2.length) / 150
      // const pctValue3 = (sum(a3) / a3.length) / 210
      // const pctValue4 = (sum(a4) / a4.length ) / 450
      //console.log(' pctValue1 ', pctValue1, ' pctValue2 ', pctValue2, ' pctValue3 ', pctValue3, ' pctValue4 ', pctValue4 )

       const a = (sum(a1) / a1.length) / 160 // bass / gain
       const b = (sum(a2) / a2.length) / 150
       const c = (sum(a3) / a3.length) / 210
       const d = (sum(a4) / a4.length ) / 450
      //playerService.pointBit({a, b, c, d})
      // if (!playerService) {
      //     playerService = new PlayerService()
      // }

      if (playerService) {
          console.log('playerService.pointBit a, b, c, d -> ', a, b, c, d);
          // const clientMessage = new ClientMessage();
          // clientMessage.setA(a)
          // clientMessage.setB(b)
          // clientMessage.setC(c)
          // clientMessage.setD(d)
          // playerService.pointBit(clientMessage)
      }
  }

  const createNewConfig = () => {
      let sample = fill(Array(COMPRESSION_FACTOR), 0).map((value, i) => {
          const sampleLength = wave?.current_stream?.data?.length
          if (!sampleLength) return 0
          const samples = Array.from(wave?.current_stream?.data)
          const blockSize = sampleLength / COMPRESSION_FACTOR
          return sum(take(samples,
              floor(i * blockSize,
                  floor(blockSize * (i + 1))))
          ) || 0
      })

      setCurrentConfig({
          textureDownsample: 1,
          densityDissipation: sample[0] /122, // 0.98,
          velocityDissipation: sample[1] / 91, ///0.99,
          pressureDissipation: sample[2] / 130, // 0.998,
          pressureIterations: sample[3] / 23, // 19,
          curl: sample[4] / 22, // 8,
          splatRadius: 0.008,
      })
  }

  const isClient = typeof window !== 'undefined' && window
  useEffect(() => {
      init()

  }, [])


  return (
      <div className="fl-container"
          style={{
          overflowX: 'hidden',
          top: '0',
          left: '0',
          position: 'fixed',
          width: '1920px',
          height: '1080px',
          display: 'block'}}>

          <div onClick={changeStyle} style={{cursor: 'pointer', top: '10px', right: '10px', zIndex: 9, position: 'absolute', background: 'white', width: '40px', height: '40px', opacity: 0.5 }} />
          <div onClick={randomStyle} style={{cursor: 'pointer', top: '10px', left: '10px', zIndex: 9, position: 'absolute', background: 'purple', width: '40px', height: '40px', opacity: 0.5 }} />

          <FluidAnimation
              style={{
                  overflow: 'hidden',
                  top: '0',
                  left: '0',
                  position: 'relative',
                  overflowX: 'hidden',
                  width: '1920px',
                  height: '1080px',
                  display: 'block'}}
              ref={element => myRef = element}
              className='anim'
              maxWidth='1920px'
              width='1920px'
              height="1080px"
              config={currentConfig}
          />
          <ToastContainer/>
      </div>
  )
}

//<div draggable="true" className="pointb" style={{zIndex: 0, position: 'absolute', background: 'red', top: '200px', left: '90px', width: '50px', height: '50px' }} />

export default Home
