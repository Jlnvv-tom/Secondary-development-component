# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.


## 安装运行
### 安装
```js
npm run install
```
### 运行
```js
npm run dev
```

### 学习步骤，起步搭建文章

- [Vue3+Vite+TS基于Element plus 二次封装业务组件(含Vue3知识点)](https://juejin.cn/post/7090917855524782088)

**main.ts文件的配置情况**
```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import WComponents from './components/base';
const app = createApp(App)

// 遍历注册全局icon
for(let icon in Icons) {
  app.component(icon, (Icons as any)[icon])
}

app.use(router).use(ElementPlus).use(WComponents)
app.mount('#app')

```
## 起步效果
![image](https://user-images.githubusercontent.com/82532729/167629057-7c227a19-4f48-4f19-9da5-7b156f540edc.png)
![modelform](https://user-images.githubusercontent.com/82532729/167869653-e2445102-7504-4965-8aba-dd4ea6cde65a.gif)


## 打包构建
> command 为打包命令文件， packages 为打包入口文件， lib 为打包生成文件

### 全局打包
```js
npm run lib
```

```js
const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const path = require('path')

// 打包入口文件夹
const entryDir = path.resolve(__dirname, '../packages')

// 出口
const outDir = path.resolve(__dirname, '../lib')

// vite基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()]
})

// rollup 配置
const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue'
    }
  }
}

// 全量打包构建
const buildAll = async () => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, 'index.ts'),
        name: 'wjh-element-component',
        fileName: 'wjh-element-component',
        formats: ['es','umd']
      },
      outDir
    }
  })
}

// 打包成库
const buildLib = async () => {
  await buildAll()
}

buildLib()
```
### 全局打包和单组件打包
```js
npm run lib2
```
```js
const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const path = require('path')
const fsExtra = require('fs-extra')
const fs = require('fs')

// 打包入口文件夹
const entryDir = path.resolve(__dirname, '../packages')

// 出口
const outDir = path.resolve(__dirname, '../lib')

// vite基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()]
})

// rollup 配置
const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue'
    }
  }
}

// 全量打包构建
const buildAll = async () => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, 'index.ts'),
        name: 'wjh-element-component',
        fileName: 'wjh-element-component',
        formats: ['es', 'umd']
      },
      outDir
    }
  })
}

// 单组件打包构建
/**
 * @param {*} name  组件名称
 */
const buildSingle = async (name) => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, name),
        name: 'index',
        fileName: 'index',
        formats: ['es', 'umd']
      },
      outDir: path.resolve(outDir, name)
    }
  })
}

// 每个组件生成pagkage.json 
const ceratePackageJson = (name) => {
  const fileStr = `
    {
      "name": "${name}",
      "main": "index.umd.js",
      "module": "index.es.js",
      "style": "styles.css"
    }
  `
  // 输出
  fsExtra.outputFile(
    path.resolve(outDir, `${name}/package.json`),
    fileStr,
    'utf-8'
  )
}

// 打包成库
const buildLib = async () => {
  await buildAll()

  // 获取组件名称组成的数组
  const components = fs.readdirSync(entryDir).filter(name => {
    const componentDir = path.resolve(entryDir, name)
    const isDir = fs.lstatSync(componentDir).isDirectory()
    return isDir && fs.readFileSync(componentDir).includes('index.ts')
  })

  // 循环构建组件
  for (const name of components) {
    await buildSingle(name)
    ceratePackageJson(name)
  }
}

buildLib()
```