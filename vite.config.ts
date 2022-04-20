import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
const { resolve } = require('path');
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
