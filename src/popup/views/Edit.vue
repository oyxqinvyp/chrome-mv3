<template>
  <div clang="page-edit">
    <a-form layout="vertical" :model="formState" @finish="onFinish">
      <a-form-item label="店铺">

      </a-form-item>
      <a-form-item label="报告类型">

      </a-form-item>
      <a-form-item label="时间范围">

      </a-form-item>
      <a-form-item>

      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  name: 'Check',
  setup() {
    const formState = reactive({})

    return {
      formState,
    }
  },
})
</script>

<style lang="less">
.page-edit {
  width: 350px;
}
</style>