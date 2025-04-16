import path from 'node:path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import tsConfig from './tsconfig.json';

export default defineConfig({
  resolve: {
    alias: Object.entries(tsConfig.compilerOptions.paths).map(
      ([key, [value]]) => ({
        find: key.replace('*', ''),
        replacement: path.resolve(value.replace('*', '')) + '/',
      })
    ),
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[name]__[local]__[hash:base64:6]',      
    },
  },
  build: {
    outDir: '.build',
  },
  plugins: [react()],
});
