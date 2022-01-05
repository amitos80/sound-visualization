import * as path from 'path';

export default {
  mode: 'production',
  entry: {
    index: './server.js',
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
};
