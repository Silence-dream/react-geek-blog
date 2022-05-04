import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
const { resolve } = require('path');
// 在页面上显示 eslint 报错
import eslintPlugin from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react(), tsconfigPaths(), eslintPlugin()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    base: command === 'build' ? '/react-geek-blog/' : '',
  };
});
