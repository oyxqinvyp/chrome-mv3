
import 'whatwg-fetch'

const SES_VERSION: string | any = process.env.SES_VERSION
const BASE_API: string | any = process.env.BASE_API

interface Option {
  method: 'GET' | 'POST',
  headers?: {
    Accept?: string
    'Content-Type'?: string
    sesversion?: string
    sestoken?: string
    [propName: string]: any
  },
  body?: any
}

class HttpReq {
  isAmazon: boolean
  constructor(params?: { isAmazon?: boolean }) {
    this.isAmazon = params?.isAmazon === true ? true : false
  }

  public handleUrl(url: string) {
    if (url.indexOf('http') > -1) {
      return url
    }
    return BASE_API + url
  }

  public async getFetch(url: string, params?: any, headers?: object) {
    console.log(url, params, headers)
  }
  public async postFetch(url: string, params?: any, headers?: object) {
    let option: Option = {
      method: 'POST',
      headers,
      body: JSON.stringify(params)
    }
    // amazon 不添加token | version body 修改为json格式
    if (this.isAmazon) {

    } else {
      let formData = new FormData();
      Object.keys(params).forEach((key) => formData.append(key, params[key]));
      option.body = formData
      option.headers = {
        sesversion: SES_VERSION,
        ...option.headers,
      }
    }
    return await fetch(this.handleUrl(url), option).then(response => {
      return response.json()
    }).then(response => {
      return response
    })
  }
}
export default HttpReq