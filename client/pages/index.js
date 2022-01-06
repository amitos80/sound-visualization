import React, {useState, useEffect, useLayoutEffect} from 'react'
import FluidAnimation from 'react-fluid-animation'
import {ToastContainer, toast} from 'react-toastify'
import { take, fill, sum, floor } from 'lodash'
const COMPRESSION_FACTOR = 8

const VIEW_WIDTH = 1920;
const VIEW_HEIGHT = 1180;

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
    pressureIterations: 14,
    curl: 8,
    splatRadius: 0.01,
  },
  {
    textureDownsample: 2,
    densityDissipation: 0.7,
    velocityDissipation: 0.7,
    pressureDissipation: .8,
    pressureIterations: 24,
    curl: 14,
    splatRadius: 0.0077,
  },
  {
    textureDownsample: 3,
    densityDissipation: 0.64,
    velocityDissipation: 0.55,
    pressureDissipation: 0.6,
    pressureIterations: 45,
    curl: 20,
    splatRadius: 0.0061,
  },
  {
    textureDownsample: 4,
    densityDissipation: 0.53,
    velocityDissipation: 0.39,
    pressureDissipation: 0.543,
    pressureIterations: 56,
    curl: 32,
    splatRadius: 0.0043,
  },
]

function rect({id, x, y, width, height, fill = 'gray', stroke = 'skyblue', strokewidth = 2}) {
    return {
        x, y, id, width, height, fill, stroke, strokewidth,
    }
}

let wave;
export const Home = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [animationConfig, setAnimationConfig] = useState(baseConfigs)
  const [currentConfig, setCurrentConfig] = useState(defaultConfig)
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
          textureDownsample: randomWhole(1, randomWhole(2, 5)),
          densityDissipation: randomReal(0.55, randomReal(0.65, 0.99)),
          velocityDissipation: randomReal(randomReal(0.3, 0.7), 0.99),
          pressureDissipation: randomReal(randomReal(0.1, 0.5), randomReal(0.51, 0.9)),
          pressureIterations: randomWhole(1, randomWhole(3, 31)),
          curl: randomWhole(randomWhole(5, 11), randomWhole(19, 33)),
          splatRadius: randomReal(0.0025, 0.0065),
      })
    const newIndex = configs.length -1;
    setSelectedIndex(
        newIndex
    )
    setAnimationConfig(configs)
    toast('random style');
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

  return (
      <div className="fl-container"
          style={{
          overflowX: 'hidden',
          top: '0',
          left: '0',
          position: 'fixed',
          width: `${VIEW_WIDTH}px`,
          height: `${VIEW_HEIGHT}px`,
          display: 'block'}}>

          <div onClick={changeStyle} style={{
              borderRadius: '65px',
              cursor: 'pointer', top: '10px', right: '10px', zIndex: 9, position: 'fixed',
              background: 'blue', width: '65px', height: '65px', opacity: 0.6
          }} />
          <div onClick={randomStyle} style={{
              borderRadius: '65px',
              cursor: 'pointer', top: '10px', left: '10px', zIndex: 9, position: 'fixed',
              background: 'purple', width: '65px', height: '65px', opacity: 0.6
          }} />

          <FluidAnimation
              style={{
                  top: '0',
                  left: '0',
                  position: 'relative',
                  overflowX: 'hidden',
                  width: `${VIEW_WIDTH}px`,
                  height: `${VIEW_HEIGHT}px`,
                  display: 'block'}}
              ref={element => myRef = element}
              className='anim'
              maxWidth={`${VIEW_WIDTH}px`}
              width={`${VIEW_WIDTH}px`}
              height={`${VIEW_HEIGHT}px`}
              config={currentConfig}
          />
          <ToastContainer/>
      </div>
  )
}

export default Home
