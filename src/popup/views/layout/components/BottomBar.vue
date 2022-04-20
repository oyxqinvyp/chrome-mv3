<template>
  <div class="bottombar">
    <template v-if="isShowNewVersion">
      <!-- 发现新版本，建议<el-link type="primary" @click="downloadCurrentVersion" style="vertical-align: top">升级</el-link>使用
      <el-tooltip effect="light" placement="top">
        <div slot="content">
          <p>当前版本号: {{ sys_version }}</p>
          <p>最新版本号：{{ versionDate.CurrentVersion }}</p>
        </div>
        <i class="el-icon-warning-outline"></i>
      </el-tooltip> -->
    </template>
    <template v-else> 版本号:{{ sys_version }} </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, toRefs, onUpdated } from 'vue';
import { getVersion } from '@/utils/tool-vue';

export default defineComponent({
  name: 'Login',
  components: {},
  setup() {
    
    const state = reactive({
      value: '123456',
      isShowNewVersion: '',
      sys_version: getVersion().version,
    });

    const downloadCurrentVersion = () => {};
    return {
      ...toRefs(state),
      downloadCurrentVersion,
    };
  },
});
</script>

<style lang="less" scoped>
.bottombar {
  height: 32px;
  line-height: 32px;
  padding: 0 8px;
  border-top: solid 1px #d3d5dc;
}
</style>