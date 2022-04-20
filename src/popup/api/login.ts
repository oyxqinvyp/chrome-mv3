import HttpReq from '@/utils/api';
const Http = new HttpReq();

// 例子
// export async function getFetch(url:string, params:any) {
//     return Http.getFetch(url, params);
// }
// export async function postFetch(url:string, params:any) {
//     return Http.postFetch(url, params);
// }

// 登录
export const login = async (params: { userid: string, password: string }) => {
  return Http.postFetch('/SESAPI.ashx?action=Login', params)
}

// 获取权限
export const sellerList = async (params: { userid: string }, headers?: {
  sestoken?: string
}) => {
  return Http.postFetch('/SESAPI.ashx?action=GetSellerIdListByMerchantId', params, headers)
}