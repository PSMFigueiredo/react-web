import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})



/*
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite';
import NodeModulesPolyfillPlugin from '@esbuild-plugins/node-modules-polyfill';



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),NodeModulesPolyfillPlugin()]
})

*/