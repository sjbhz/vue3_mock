import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'path'; //导入已经安装的@type/node
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      // ↓解析根目录下的mock文件夹
      mockPath: "mock", // mock文件存放的位置
      supportTs: true, // 是否读取ts文件模块
      logger: true, //  是否在控制台显示请求日志
      localEnabled: true, //设置是否启用本地mock文件
      prodEnabled: true, //设置打包是否启用 mock 功能
      // localEnabled: command === "serve", //在开发环境中启用 mock  // 开发打包开关
    }),
  ],
  resolve: {
    alias: [ //配置别名
      {
        find: "@",
        replacement: path.join(__dirname, "./src"), // @代替src
      },
      {
        find: '@antv/x6',
        replacement: '@antv/x6/dist/index.js',
      },
      {
        find: '@antv/x6-vue-shape',
        replacement: '@antv/x6-vue-shape/lib',
      }
    ]

  },
});
