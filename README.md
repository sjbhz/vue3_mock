
## Vue 3 + TypeScript + Vite 实现某管理系统

### 介绍

使用 `vite` + `vue3` + `pinia` + `typescript` + `element-plus` + `Echarts` + 完整技术路线开发的项目；
√ 秒级开发更新启动；
√ 新的`vue3 composition api` 结合 `setup`纵享丝滑般的开发体验；
√ 全新的 `pinia`状态管理器和优秀的设计体验；
√ 安全高效的 `typescript`类型支持、代码规范验证

### 特性

待补充

### 项目目录

待补充

### 数据模拟

<!-- 为了实现更多元化和真实数据展示，使用了Mock+fakerjs进行数据模拟，fakerjs的功能极其强大，几乎可以定制任何类型数据，本项目里做了部分演示，源码见`mock/table.ts` -->

### 使用说明

> 简要说明：
> 需要指出的是vite3.x, 本地使用node18

1. 克隆本项目

    ```sh
    git clone 
    ```

2. 安装依赖

    ```sh
    npm install
    ```

3. 启动项目

    ```sh
    npm run dev
    ```

4. 部署

    ```sh
    # 构建打包
    npm run build
    # 预览
    npm run preview
    ```


### 更新日志

- 20240116 ~ 20240217
  - 引入vueflow流程图组件
  - 引入bpmn-js流程图组件
  - 引入antv/x6流程图组件
  - 引入logicflow流程图组件
  - 个人管理，实时总览
- 20240116
  - 角色管理增删改查
  - 使用pinia,完成状态管理
  - 登录、退出 缓存处理
- 20240115
  - 使用element-plus,完成菜单展示
  - 使用Echarts,完成echart图展示
- 20240110
  - 使用mock,完成登录页
- 20240108
  - 创建项目并启动
