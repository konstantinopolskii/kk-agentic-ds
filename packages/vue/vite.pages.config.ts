import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { globSync } from 'node:fs'
import { basename, extname } from 'node:path'

/* Pages build for the SFC layer. Compiles each packages/vue/sfc/pages/*.vue
   to dist/pages/<name>.js — the SSG-consumable module for that page.
   Library build (dist/index.js) is separate and already committed; this
   config must never wipe it, hence emptyOutDir: false. vue and the kit
   itself stay external — bare specifiers survive into the output so
   ssg.mjs's importmap can resolve them at hydration time. */
const pageEntries = Object.fromEntries(
  globSync('sfc/pages/*.vue').map((file) => [`pages/${basename(file, extname(file))}`, file]),
)

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: pageEntries,
      formats: ['es'],
    },
    outDir: 'dist',
    emptyOutDir: false,
    minify: false,
    rollupOptions: {
      external: ['vue', '@konstantinopolskii/vue'],
    },
  },
})
