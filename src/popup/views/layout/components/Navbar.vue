<template>
  <div class="navbar">
    <div class="navbar-content">
      <div class="content-left">
        <img src="@/popup/assets/images/logo-w-w.png" class="left-logo" alt="">
      </div>
      <div class="content-right" v-if="userData && userData.UserID">
        <a-dropdown :trigger="['click']">
          <div class="user-img">
            <img src="@/popup/assets/images/user.png" alt="">
            {{ userData && userData.UserID }}
          </div>
          <template #overlay>
            <div class="dropdown-box">
              <a-button @click="clickLogout">退出系统</a-button>
            </div>
          </template>
        </a-dropdown>
        <span class="user-line">|</span>
        <div class="user-site">在线站点
          <span v-if="userSite && userSite.length !== 0">({{ userSite && userSite.length }})</span>
        </div>
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
import { clearChromeStorage } from '@/utils/tool-chrome'
import { message } from 'ant-design-vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  components: {},
  name: 'Login',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    let userData = computed(() => store.state.userData)
    let userSite = computed(() => store.state.userSite)

    let clickLogout = async () => {
      try {
        const res: any = await clearChromeStorage()
        if (res.code === 2000) {
          message.success('退出成功')
          router.push({
            name: 'login',
          })
        }
      } catch (err) {}
    }

    return {
      clickLogout,
      userData,
      userSite,
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
        cursor: pointer;

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