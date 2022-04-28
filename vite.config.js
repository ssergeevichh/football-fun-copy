const { resolve } = require('path')
/**
 * @type {import('vite').UserConfig}
 */
const config = {
  // ...import
  publicDir: 'src/assets',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'src/nested/index.html'),
      },
    },
  },
}
export default config
