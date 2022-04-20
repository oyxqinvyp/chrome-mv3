import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  define: {
    'process.env': {
      SES_VERSION: '1.9.26',
      BASE_API: 'https://plugin.sellingexpress.net'
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#f6a900',
        },
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') }
    ]
  },
  server: {
    https: true, // 是否开启 https
    open: true, // 是否自动在浏览器打开
    port: 8088, // 端口号
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "", // 后台接口
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        // ws: true, //websocket支持
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: path.resolve('./dist'),
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        popup: './index.html',
        background: './src/background.ts'
      },
      output: {
        assetFileNames: "[ext]/[name]-[hash].[ext]",
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "[name].js",
        manualChunks(id) { //静态资源分拆打包
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})
