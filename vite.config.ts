import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
// import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  server: {
    port: 3000,
  },
  // resolve: {
  //   alias: {
  //     // eslint-disable-next-line no-undef
  //     '@': path.resolve(__dirname, './src'),
  //   },
  // },
});