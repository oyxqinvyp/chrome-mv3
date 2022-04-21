<template>
  <div class="page-edit">
    <a-form layout="vertical" :model="formState" @finish="onFinish">
      <a-form-item label="店铺" name="SellerID" :rules="[{ required: true, message: '请输入选择店铺后创建任务' }]">
        <a-select size="large" v-model:value="formState.SellerID" :showArrow="true" mode="multiple" placeholder="请输入店铺">
          <a-select-option v-for="(it, index) in userSite" :key="index" :value="it.SellerID">{{ it.SellerID }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="报告类型">
        <a-radio-group v-model:value="formState.reportType">
          <a-radio value="BusinessReport">业务报告</a-radio>
          <a-radio value="Transaction">日期范围报告</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="时间范围">
        <div class="time-box">
          <span :class="{ 'active': !formState.isMonth }">按日期选择</span>
          <a-switch class="switch" v-model:checked="formState.isMonth" />
          <span :class="{ 'active': formState.isMonth }">按月</span>
        </div>
        <template v-if="formState.isMonth">
          <a-date-picker picker="month" />
        </template>
        <template v-else>
          <a-range-picker v-model:value="formState.time" :placeholder="['起始日期', '结束日期']" :disabled-date="disabledDate" @calendarChange="onCalendarChange" />
        </template>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">生成任务报告</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import dayjs, { Dayjs } from 'dayjs'
type RangeValue = [Dayjs, Dayjs]

export default defineComponent({
  name: 'Check',
  setup() {
    const store = useStore()

    const formState = reactive({
      SellerID: [],
      reportType: 'BusinessReport',
      isMonth: false,
      time: [],
    })
    const userSite = computed(() => store.state.userSite)

    const onFinish = (values: any) => {
      console.log(values)
    }

    const disabledDate = (current: Dayjs) => {
      console.log(current)
      return current && current > dayjs().endOf('day')
    }

    const onCalendarChange = (val: RangeValue) => {
      console.log(val)
    }

    return {
      disabledDate,
      onCalendarChange,
      onFinish,
      formState,
      userSite,
    }
  },
})
</script>

<style lang="less">
.page-edit {
  margin: 20px 20px;
  width: 400px;
  .time-box {
    margin-bottom: 20px;
    .switch {
      margin: 0 10px;
    }
    .active {
      color: #f6a900;
    }
  }
}
</style>