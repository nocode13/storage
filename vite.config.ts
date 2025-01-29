import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react({
      babel: { babelrc: true },
    }),
    tsconfigPaths(),
    svgr(),
  ],
  server: {
    host: 'localhost',
    port: 3030,
  },
  build: {
    sourcemap: false,
    minify: true,
  },
});
