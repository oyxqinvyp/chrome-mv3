<template>
  <div class="home">
    <a-spin v-if="isLoading" :delay="500" :spinning="isLoading" class="loading-box" />
    <Navbar />
    <div class="app-wrapper-main">
      <div class="page">
        <a-tabs v-model:activeKey="activeKey" @change="handleChange">
          <a-tab-pane tab="" key=""></a-tab-pane>
          <a-tab-pane tab="首页" key="task"></a-tab-pane>
          <a-tab-pane tab="创建自定义任务" key="edit"></a-tab-pane>
          <a-tab-pane tab="自定义同步时间" key="time"></a-tab-pane>
          <a-tab-pane tab="检测站点" key="check"></a-tab-pane>
          <a-tab-pane tab="操作日志" key="log"></a-tab-pane>
        </a-tabs>
        <div class="page-content">
          <router-view></router-view>
        </div>
      </div>
      <BottomBar />
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
  watch,
  computed,
} from 'vue'
import Navbar from '@/popup/views/layout/components/Navbar.vue'
import BottomBar from '@/popup/views/layout/components/BottomBar.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'layout-index',
  components: {
    Navbar,
    BottomBar,
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    const state = reactive({
      activeKey: 'task',
    })

    let isLoading = computed(() => {
      return store.state.isLoading
    })

    onMounted(() => {
      const name: any = router.currentRoute.value.name
      state.activeKey = name
    })

    const handleChange = (activeKey: string) => {
      router.push({ name: activeKey })
    }

    return {
      ...toRefs(state),
      isLoading,
      handleChange,
    }
  },
})
</script>

<style lang="less">
.loading-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>