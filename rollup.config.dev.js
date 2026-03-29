import resolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';
import { string } from 'rollup-plugin-string';
import copy from 'rollup-plugin-copy';
import fs from 'fs';

const onwarn = (warning, warn) => {
  if (warning.code === 'THIS_IS_UNDEFINED' && warning.id?.includes('/node_modules/')) {
    return;
  }

  warn(warning);
};

export default {
  input: 'src/index.ts',
  output: {
    file: './dist/detailedweatherforecast.js',
    format: 'es',
    inlineDynamicImports: true,
  },
  plugins: [
    resolve(),
    esbuild({ target: 'es2022' }),
    json(),
    string({
      include: '**/*.css',
    }),
    copy({
      targets: [{ src: 'src/img', dest: 'dist' }],
    }),
    {
      name: 'generate-index-html',
      buildEnd: () => {
        if (!fs.existsSync('./dist')) {
          fs.mkdirSync('./dist', { recursive: true });
        }
        fs.writeFileSync(
          './dist/index.html',
          `
<!DOCTYPE html>
<html>
  <head>
    <script type="module" src="/detailedweatherforecast.js"></script>
  </head>
  <body>
    <detailed-weather-forecast></detailed-weather-forecast>
    <script>
      // Example of setting hass object
      document.querySelector('detailed-weather-forecast').hass = {
        // Your mock hass object here
      };
    </script>
  </body>
</html>
        `,
        );
      },
    },
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
