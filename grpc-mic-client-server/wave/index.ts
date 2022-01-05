require('./wave.js');
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { fromElement } from './fromElement';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { fromFile } from './fromFile';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { fromStream } from './fromStream';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { visualize } from './visualize';

export class Wave {
  public current_stream = {};
  public sources = {};
  public onFileLoad = null;
  public activeElements = {};
  public activated = false;

  public fromElement = fromElement;

  public fromFile = fromFile;

  public fromStream = fromStream;

  public visualize = visualize;
}

//
// require('./wave.js');
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// import { fromElement } from './fromElement';
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// import { fromFile } from './fromFile';
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// import { fromStream, playStream, stopStream } from './fromStream';
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// import visualize from './visualize';
//
// function Wave() {
//   let current_stream = {};
//   let sources = {};
//   let onFileLoad = null;
//   let activeElements = {};
//   let activated = false;
//
//   if (typeof window === 'undefined') return;
//   window.AudioContext = window.AudioContext; // || window.webkitAudioContext;
// }
//
// Wave.prototype.fromElement = fromElement;
// Wave.prototype.fromFile = fromFile;
// Wave.prototype.fromStream = fromStream;
// Wave.prototype.stopStream = stopStream;
// Wave.prototype.playStream = playStream;
// Wave.prototype.visualize = visualize;
//
// export default Wave;
