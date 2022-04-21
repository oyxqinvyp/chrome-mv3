<template>
  <div class="page-task">
    <div class="task-alert">
      <div class="alert-icon">
        <InfoCircleOutlined class="icon" />
      </div>
      <div class="alert-content">
        <div class="item">
          <template v-if="dataSource.length !== 0">
            1、系统每天自动创建任务，如需自定义任务请点击 【<a-button type="link">创建自定义任务</a-button>】
          </template>
          <template v-else>
            1、系统每天自动创建任务，如需自定义任务请点击下面按钮创建
          </template>
        </div>
        <div>
          2、任务默认执行时间为( 19:00至08:00 <a-button type="link">自定义</a-button>) ，请保持浏览器开启。
          <template v-if="dataSource.length !== 0">
            如需立即获取，请点击【<a-button type="link">立即执行</a-button>】
          </template>
        </div>
      </div>
    </div>
    <div class="task-table" v-if="dataSource.length !== 0">
      <a-table :dataSource="dataSource" :pagination="false" :loading="loading" :columns="columns" :scroll="{
        y: 526
      }" size="small">
        <template v-slot:bodyCell="{ text, column }">
          <template v-if="column.dataIndex.indexOf('Time') > -1">
            {{ formatTime(text, 'DD HH:mm') }}
          </template>
          <template v-else-if="column.dataIndex.indexOf('Date') > -1">
            {{ formatTime(text, 'MM/DD') }}
          </template>
          <template v-else-if="column.dataIndex === 'RequestType'">
            {{ text === 'BUSINESSREPORTTASK' ? '业务报告' : '日期范围报告'}}
          </template>
          <template v-else>
            {{ text }}
          </template>
        </template>
      </a-table>
    </div>
    <div class="task-no-data">
      <img src="@/popup/assets/images/no-task.png" class="empty" />
      <div>
        <a-button type="primary" size="large">创建自定义任务</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { getTaskList } from '@/popup/api/vue'
import { useStore } from 'vuex'
import tool from '@/utils/tool'
import { InfoCircleOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'Task',
  components: {
    InfoCircleOutlined,
  },
  setup() {
    const store = useStore()

    const columns = ref([
      {
        title: '报表名称',
        dataIndex: 'DocumentName',
        ellipsis: true,
      },
      {
        title: '店铺',
        dataIndex: 'SellerID',
        width: 100,
        ellipsis: true,
      },
      {
        title: '创建时间',
        dataIndex: 'RequestTime',
        width: 80,
        ellipsis: true,
      },
      {
        title: '报表类型',
        dataIndex: 'RequestType',
        width: 100,
        ellipsis: true,
      },
      {
        title: '开始日期',
        dataIndex: 'StartDate',
        width: 80,
        ellipsis: true,
      },
      {
        title: '结束日期',
        dataIndex: 'EndDate',
        width: 80,
        ellipsis: true,
      },
    ])
    const loading = ref(false)
    const dataSource: any = ref([])

    const userData = computed(() => store.state.userData)
    const userSite = computed(() => store.state.userSite)

    const getList = async () => {
      try {
        loading.value = true
        let MerchantId = userSite.value
          .map((it: any) => it.MerchantId)
          .join(',')

        const res = await getTaskList({
          UserID: userData.value.UserID,
          MerchantId,
        })
        loading.value = false
        dataSource.value = res
      } catch (err) {}
    }

    const formatTime = (value: string | number, format: string) => {
      return tool.formatTime(value, format)
    }

    onMounted(() => {
      getList()
    })

    return {
      dataSource,
      formatTime,
      columns,
      loading,
    }
  },
})
</script>

<style lang="less">
.task-alert {
  background-color: rgb(253, 246, 236);
  color: #909399;
  height: 74px;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  .alert-icon {
    width: 30px;
    margin-right: 10px;
    .icon {
      font-size: 28px;
      color: rgb(230, 162, 60);
    }
  }
}
.task-no-data {
  text-align: center;
  margin-top: 20px;
  > img {
    display: inline-block;
    margin-bottom: 20px;
  }
}
</style>