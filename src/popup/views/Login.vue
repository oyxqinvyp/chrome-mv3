<template>
  <div class="login">
    <Navbar />
    <div class="app-wrapper-main">
      <div class="page">
        <a-form class="login-form" layout="vertical" :model="formState" @finish="onFinish">
          <a-form-item label="用户名" name="userid" :rules="[{ required: true, message: '请输入用户名/手机号/邮箱后点击登录' }]">
            <a-input v-model:value="formState.userid" placeholder="用户名/手机号/邮箱"></a-input>
          </a-form-item>
          <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入登录密码后点击登录' }]">
            <a-input-password v-model:value="formState.password" size="large" placeholder="请输入登录密码" />
          </a-form-item>
          <a-form-item>
            <a-button class="mt20" shape="round" type="primary" block html-type="submit">登录</a-button>
          </a-form-item>
        </a-form>
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
  onUpdated,
  watch,
  computed,
} from 'vue'
import Navbar from '@/popup/views/layout/components/Navbar.vue'
import BottomBar from '@/popup/views/layout/components/BottomBar.vue'
import { setChromeStorage } from '@/utils/tool-chrome'
import { login } from '@/popup/api/login'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useStore } from 'vuex'

interface FormState {
  userid: string
  password: string
}

export default defineComponent({
  name: 'Login',
  components: {
    Navbar,
    BottomBar,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const formState = reactive<FormState>({
      userid: '',
      password: '',
    })
    const onFinish = async (values: any) => {
      
      try {
        const res: any = await login(values)
        if (res) {
          await store.dispatch('setState', res)
          await setChromeStorage('userData', res)
          message.success('登录成功')
          router.push({
            name: 'check',
          })
        }
      } catch (err) {}
    }

    return {
      formState,
      onFinish,
    }
  },
})
</script>