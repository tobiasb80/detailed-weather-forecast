import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';
import { string } from 'rollup-plugin-string';
import copy from 'rollup-plugin-copy';

const dev = process.env.ROLLUP_WATCH;

const serveopts = {
  contentBase: ['./dist'],
  host: '0.0.0.0',
  port: 5000,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const plugins = [
  nodeResolve(),
  commonjs(),
  typescript(),
  json(),
  string({
    include: '**/*.css',
  }),
  copy({
    targets: [{ src: 'src/img/*', dest: 'dist' }],
  }),
  dev && serve(serveopts),
  !dev && terser(),
];

const onwarn = (warning, warn) => {
  if (warning.code === 'THIS_IS_UNDEFINED' && warning.id?.includes('/node_modules/')) {
    return;
  }

  warn(warning);
};

export default [
  {
    input: 'src/detailed-weather-forecast.ts',
    output: {
      file: 'dist/detailed-weather-forecast.js',
      format: 'es',
      inlineDynamicImports: true,
      assetFileNames: '[name][extname]',
    },
    plugins: [...plugins.filter(Boolean)],
    onwarn,
  },
];
