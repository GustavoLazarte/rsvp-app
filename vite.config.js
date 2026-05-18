import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    modulePreload: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import'],
      },
    },
  },
});
