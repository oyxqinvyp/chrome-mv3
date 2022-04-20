import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less'
import './assets/style/base.less'

const app = createApp(App);

app.use(router)
app.use(Antd)
app.mount('#app')
