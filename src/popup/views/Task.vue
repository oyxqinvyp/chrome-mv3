<template>
  <div class="page-task">
    <div class="task-alert"></div>
    <div class="task-table">
      <a-table :dataSource="dataSource" :loading="loading" :columns="columns" />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue'
import { getTaskList } from '@/popup/api/vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Task',
  setup() {
    const store = useStore()

    const columns = ref([
      {
        title: '报表名称',
        dataIndex: 'DocumentName',
      },
      {
        title: '店铺',
        dataIndex: 'SellerID',
      },
      {
        title: '创建时间',
        dataIndex: 'RequestTime',
      },
      {
        title: '报表类型',
        dataIndex: 'RequestType',
      },
      {
        title: '开始日期',
        dataIndex: 'StartDate',
      },
      {
        title: '结束日期',
        dataIndex: 'StartDate',
      },
    ])
    const loading = ref(false)
    const dataSource =ref([])

    const userData = computed(() => store.state.userData)
    const userSite = computed(() => store.state.userSite)

    const getList = async () => {
      try {
        loading.value = true
        let MerchantId = userSite.value.map((it) => it.MarketplaceId).join(',')

        debugger
        const res = await getTaskList({
          UserID: userData.value.UserID,
          MerchantId,
        })
        
        loading.value = false
        dataSource.value = res
      } catch (err) {}
    }

    onMounted(() => {
      getList()
    })

    return {
      columns,
      loading,
    }
  },
})
</script>