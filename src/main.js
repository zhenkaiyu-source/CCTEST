import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from './router'
import './assets/styles/main.scss'

// 导入所有图标组件
import * as Icons from '@element-plus/icons-vue'

const app = createApp(App)

// 注册所有图标为全局组件
for (const [key, component] of Object.entries(Icons)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)
app.use(ElementPlus, { locale: zhCn })

app.mount('#app')
