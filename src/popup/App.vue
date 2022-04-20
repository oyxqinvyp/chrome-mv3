<template>
  <a-config-provider component-size="large">
    <router-view></router-view>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {},
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
