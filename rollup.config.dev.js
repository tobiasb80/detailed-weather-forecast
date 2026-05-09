import resolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';
import { string } from 'rollup-plugin-string';

const onwarn = (warning, warn) => {
  if (warning.code === 'THIS_IS_UNDEFINED' && warning.id?.includes('/node_modules/')) {
    return;
  }

  warn(warning);
};

export default {
  input: 'src/detailed-weather-forecast.ts',
  output: {
    file: './dist/detailed-weather-forecast.js',
    format: 'es',
    inlineDynamicImports: true,
    assetFileNames: '[name][extname]',
  },
  plugins: [
    resolve(),
    esbuild({ target: 'es2022' }),
    json(),
    string({
      include: '**/*.css',
    }),
    serve({
      contentBase: './dist',
      host: '0.0.0.0',
      port: 5000,
      allowCrossOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    }),
  ],
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**',
    buildDelay: 500,
    chokidar: {
      usePolling: true, // Required for reliable file detection on Docker volume mounts
      interval: 1000,
    },
  },
  onwarn,
};
