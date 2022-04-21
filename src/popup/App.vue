<template>
  <a-config-provider component-size="large" :locale="antdLocal">
    <router-view></router-view>
  </a-config-provider>
</template>

<script lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

import { defineComponent, ref, computed } from 'vue'
export default defineComponent({
  setup() {
    const antdLocal = ref(
      computed(() => {
        const language = {
          'zh-CN': zhCN,
          'en-US': enUS,
        }
        return language['zh-CN']
      })
    )

    return {
      antdLocal,
    }
  },
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100% !important;
  height: 100% !important;
  background-color: #f7f7f7;
  margin: 0 auto;
  padding: 0;
}
.app-wrapper-main {
  width: 800px;
  margin: 0 auto;
  background-color: #fff;
  .page {
    height: 700px;
    .login-form {
      padding: 70px 102px 16px 102px;
    }
  }
}
</style>
