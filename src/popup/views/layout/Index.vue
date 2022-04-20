<template>
  <div class="home">
    <Navbar />
    <div class="app-wrapper-main">
      <div class="page">
        <a-tabs v-model:activeKey="activeKey" @change="handleChange">
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
import { defineComponent, ref, reactive, onMounted, toRefs, watch } from 'vue';
import Navbar from '@/popup/views/layout/components/Navbar.vue';
import BottomBar from '@/popup/views/layout/components/BottomBar.vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'layout-index',
  components: {
    Navbar,
    BottomBar,
  },
  setup() {
    const router = useRouter();

    const state = reactive({
      activeKey: 'task',
    });

    onMounted(() => {
      const name: any = router.currentRoute.value.name;
      state.activeKey = name;
    });

    const handleChange = (activeKey: string) => {
      router.push({ name: activeKey });
    };

    return {
      ...toRefs(state),
      handleChange,
    };
  },
});
</script>