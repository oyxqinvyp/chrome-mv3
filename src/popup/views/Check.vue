<template>
  <div class="check-page">
    <div v-if="list.length"></div>
    <div v-else class="checking">
      <div class="t-desc">第一次检测需要的时间比较久，请耐心等待</div>
      <img src="@/popup/assets/images/no-task.png" class="empty" />
      <p>请在浏览器中登录亚马逊卖家中心</p>
      <div class="t-desc">请保持浏览器的启用状态和卖家中心的在线状态</div>
      <div v-if="showCheck">登录检测中...</div>
      <div v-else>
        <a-button type="link" @click="initPage">刷新</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { getChromeStorage } from '@/utils/tool-chrome';
import { message } from 'ant-design-vue'
import { checkSite } from '@/utils/tool-vue'

export default defineComponent({
  name: 'Check',
  setup() {
    const state = reactive({
      list: [],
      showCheck: false,
    });
    const getUserSite = async () => {
      state.showCheck = true
      await checkSite()
    };

    onMounted(async () => {
      const res = await getChromeStorage('userSite');
      if (res.code === 2000) {
        state.list = res.data;
        return;
      }
      getUserSite();
    });

    const initPage = () => {

    }

    return {
      ...toRefs(state),
      initPage
    };
  },
});
</script>

<style lang="less">
.check-page {
  .checking {
    margin-top: 24px;
    text-align: center;
  }
  .check-site {
    padding: 20px;
  }
}
</style>