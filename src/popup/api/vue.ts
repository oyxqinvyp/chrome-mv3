import { message } from 'ant-design-vue'
import HttpReq from '@/utils/api';
import store from '../store';
const Http = new HttpReq();

// 例子
// export async function getFetch(url:string, params:any) {
//     return Http.getFetch(url, params);
// }
// export async function postFetch(url:string, params:any) {
//     return Http.postFetch(url, params);
// }

const ajax = async (method: 'get' | 'post', url: string, params: any, headers?: any) => {
  let token = ''
  if (store.state.userData && store.state.userData.Token) {
    token = store.state.userData.Token
  }

  if (method === 'get') {
    const response = await Http.getFetch(url, params, { ...headers, sestoken: token })
  } else {
    const response = await Http.postFetch(url, params, { ...headers, sestoken: token })
    if (response.code === 2000) {
      return response.data
    } else {
      message.error(response.message)
      return Promise.reject(response)
    }
  }
}

// 登录
export const login = async (params: { userid: string, password: string }) => {
  return ajax('post', '/SESAPI.ashx?action=Login', params)
}

// 获取权限
export const sellerList = async (params: { userid: string }, headers?: object) => {
  return ajax('post', '/SESAPI.ashx?action=GetSellerIdListByMerchantId', params, headers)
}

// 获取任务列表
export const getTaskList = async (params: { UserID: string, MerchantId: string }, headers?: object) => {
  return ajax('post', '/SESAPI.ashx?action=GetMerchantIdUndoneReportRequest', params, headers)
}

export default {
  login,
  sellerList,
  getTaskList
}