// 放置 chrome 通用方法

let isChrome = chrome.storage

// 测试数据

const devParams: any = {
  userData: {
    RecordID: "823f48a3-094d-474e-bc0c-58671fc75928",
    Token: "37917CF7-2A92-482F-AB2E-4DD874F1A6B9",
    UserID: "ouyangxq",
    UserName: "欧阳小勤",
  },
  userSite: [
    {
      MarketplaceId: "A1F83G8C2ARO7P",
      MarketplaceName: "amazon.co.uk",
      MerchantId: "A38WDK35MO1T0E",
      SellerID: "AMZ-UK",
      directedId: "amzn1.merchant.d.AB5QM7QVMMM57XGBCC2ZXZP3AOAQ",
      host: "https://sellercentral.amazon.co.uk",
    },
    {
      MarketplaceId: "A1PA6795UKMFR9",
      MarketplaceName: "amazon.de",
      MerchantId: "A38WDK35MO1T0E",
      SellerID: "AMZ-DE",
      directedId: "amzn1.merchant.d.AB5QM7QVMMM57XGBCC2ZXZP3AOAQ",
      host: "https://sellercentral.amazon.co.uk",
    },
    {
      MarketplaceId: "A13V1IB3VIYZZH",
      MarketplaceName: "amazon.fr",
      MerchantId: "A38WDK35MO1T0E",
      SellerID: "AMZ-FR",
      directedId: "amzn1.merchant.d.AB5QM7QVMMM57XGBCC2ZXZP3AOAQ",
      host: "https://sellercentral.amazon.co.uk",
    }
  ]
}


// 用户数据 userData
// 用户选择同步时间 userRadioData
// 站点数据 userSite
const status: number = 2000
export const getChromeStorage = async (key: string) => {
  return new Promise((resolve, reject) => {
    try {
      if (!isChrome) {
        resolve({
          status,
          data: devParams[key]
        })
      }
      chrome.storage.sync.get(key, (result: any) => {
        const params = {
          status,
          data: null
        }
        if (result && result[key]) {
          params.data = result[key]
          resolve(params)
        } else {
          resolve(params)
        }
      })
    } catch (err) {
      reject(err)
    }
  })
}

export const setChromeStorage = async (key: string, data: any) => {
  return new Promise((resolve, reject) => {
    const params: any = {}
    params[key] = data
    try {
      if (!isChrome) {
        resolve({
          status,
          data: null
        })
      }
      chrome.storage.sync.set(params, () => {
        const data = {
          status,
          data: null
        }
        resolve(data)
      })
    } catch (err) {
      reject(err)
    }
  })
}

export const clearChromeStorage = async (key: string) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(true)
    } catch (err) {
      reject(err)
    }
  })
}

export default {
  getChromeStorage,
  setChromeStorage,
  clearChromeStorage
}