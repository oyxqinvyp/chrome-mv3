<template>
  <div class="navbar">
    <div class="navbar-content">
      <div class="content-left">
        <img src="@/popup/assets/images/logo-w-w.png" class="left-logo" alt="">
      </div>
      <div class="content-right"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, toRefs, onUpdated } from 'vue';
export default defineComponent({
  components: {},
  name: 'Login',
  setup() {
    const state = reactive({
      value: '123456',
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="less">
.navbar {
  height: 72px;
  line-height: 72px;
  overflow: hidden;
  position: relative;
  background-color: #ffa004;
  .navbar-content {
    width: 800px;
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .content-left .left-logo {
      height: 50px;
    }
  }
}
</style>