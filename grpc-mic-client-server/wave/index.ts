require('./wave.js')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { fromElement } from './fromElement'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { fromFile } from './fromFile'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { fromStream } from './fromStream'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { visualize } from './visualize'

export class Wave {
  public current_stream = {}
  public sources = {}
  public onFileLoad = null
  public activeElements = {}
  public activated = false

  public fromElement = fromElement

  public fromFile = fromFile

  public fromStream = fromStream

  public visualize = visualize
}
