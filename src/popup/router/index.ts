import { createRouter, createWebHashHistory } from 'vue-router'
import { getChromeStorage } from '@/utils/tool-chrome'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/popup/views/Login.vue')
  },
  {
    path: '/404',
    component: () => import('@/popup/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/popup/views/error-page/401.vue'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/task',
    component: () => import('@/popup/views/layout/Index.vue'),
    children: [
      {
        path: 'task',
        component: () => import('@/popup/views/Task.vue'),
        name: 'task',
      },
      {
        path: 'time',
        component: () => import('@/popup/views/Time.vue'),
        name: 'time',
      },
      {
        path: 'edit',
        component: () => import('@/popup/views/Edit.vue'),
        name: 'edit',
      },
      {
        path: 'log',
        component: () => import('@/popup/views/Log.vue'),
        name: 'log',
      },
      {
        path: 'check',
        component: () => import('@/popup/views/Check.vue'),
        name: 'check',
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

let loginData: any = {}

// 添加路由守卫
router.beforeEach(async (to, form, next) => {
  if (!loginData.UserID) {
    const res: any = await getChromeStorage('userData')
    loginData = res.data
    console.log(loginData)
  }

  if (to.path === '/login') {
    next()
  } else if (loginData.UserID) {
    next()
  } else {
    next({ path: '/login' })
  }
})

export default router