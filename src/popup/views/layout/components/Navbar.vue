<template>
  <div class="navbar">
    <div class="navbar-content">
      <div class="content-left">
        <img src="@/popup/assets/images/logo-w-w.png" class="left-logo" alt="">
      </div>
      <div class="content-right">
        <div class="user-img">
          <img src="@/popup/assets/images/user.png" alt="">
          ouyangxq
        </div>
        <span class="user-line">|</span>
        <div class="user-site">在线站点{{  }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  toRefs,
  onUpdated,
  computed,
  watch,
} from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: {},
  name: 'Login',
  setup() {
    const state = reactive({
      value: '',
    })

    const store = useStore()

    let userData = computed(() => store.state.userData)
    let userSite = computed(() => store.state.userSite)

    console.log(userData, userSite)

    return {
      ...toRefs(state),
    }
  },
})
</script>

<style lang="less" scoped>
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
    color: #fff;
    .content-left .left-logo {
      padding-left: 10px;
      height: 50px;
    }
    .content-right {
      padding-right: 10px;
      display: flex;

      .user-img {
        border-radius: 50%;
        > img {
          width: 24px;
          height: 24px;
        }
      }
      .user-line {
        margin: 0 20px;
      }
    }
  }
}
</style>