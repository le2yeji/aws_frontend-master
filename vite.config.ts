import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      sassVariables: 'src/styles/quasar-variables.sass',
    }),
  ],
  // server: {
  //   host: 'localhost',
  //   port: 3000,
  //   proxy: {
  //     /*'/api/v1/menu/': {
  //       target: 'http://localhost:8080', // LOCAL
  //       changeOrigin: true,
  //     },*/
  //     /*'/api/v1/elastics/': {
  //       target: 'http://localhost:8080', // LOCAL
  //       changeOrigin: true,
  //     },*/
  //     /*'/api/v1/': {
  //       target: 'http://localhost:8080', // LOCAL
  //       // target: 'http://backend', // DEV
  //       changeOrigin: true,
  //     },*/
  //     '/mvp/': {
  //       target: 'http://localhost:8081', // LOCAL
  //       // target: 'http://backend', // DEV
  //       changeOrigin: true,
  //     },
  //     /**
  //      * Additional backend configurations can be added as needed
  //      */
  //     // '/api/v1/menu/': {
  //     //   target: 'http://localhost:3000', // LOCAL
  //     //   changeOrigin: true,
  //     // },
  //   },
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@composables': path.resolve(__dirname, 'src/composables'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@menus': path.resolve(__dirname, 'src/menus'),
    },
  },
  define: {
    global: {},
  },
});
