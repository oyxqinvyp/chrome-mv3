import HttpReq from '@/utils/api';
const Http = new HttpReq({
  isAmazon: true
});

export const GetData = (url: string, params?: object, headers?: object) => {
  return Http.getFetch(url, params, headers)
}

export const PostData = (url: string, params?: object, headers?: object) => {
  return Http.postFetch(url, params, headers)
}

export const PostAmazon = (url: string, params?: object, headers?: object) => {
  return Http.postFetch(url, params, {
    'accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    ...headers
  })
}

export const GetAmazon = (url: string, params?: object, headers?: object) => {
  return Http.getFetch(url, params, headers)
}

export const DownLoadFile = (url: string, params?: object, headers?: object) => {
  return Http.getFetch(url, params, headers)
}

export default {
  GetData,
  PostData,
  PostAmazon,
  GetAmazon,
  DownLoadFile
}
