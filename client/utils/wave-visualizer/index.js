require('../../static/lib/wave.js')
import fromElement from './fromElement.js'
import fromFile from './fromFile.js'
import fromStream from './fromStream.js'
import visualize from './visualize.js'



;('use strict')

export function Wave() {
  this.current_stream = {}
  this.sources = {}
  this.onFileLoad = null
  this.activeElements = {}
  this.activated = false

  if (typeof window === 'undefined') return
  window.AudioContext = window.AudioContext || window.webkitAudioContext
}

Wave.prototype = {
  fromElement,
  fromFile,
  ...fromStream,
  visualize,
}



export default Wave
