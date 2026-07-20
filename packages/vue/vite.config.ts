import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

/* Library build for the SFC layer. ESM only, vue external, unminified —
   the dist is committed and served buildless to the demos, so it stays
   readable. Types emit alongside via vite-plugin-dts. */
export default defineConfig({
  plugins: [vue(), dts({ include: ['sfc'], outDir: 'dist', processor: 'vue', bundleTypes: true })],
  build: {
    lib: {
      entry: 'sfc/index.ts',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    outDir: 'dist',
    minify: false,
    rollupOptions: {
      external: ['vue', 'vue/server-renderer'],
    },
  },
})
