// 放置 vue 专用方法
import siteInfo from '@/popup/config/siteInfo'
import toolChrome from "./tool-chrome"
import tool from './tool'
import { sellerList } from '@/popup/api/login'
import { PostAmazon } from '@/popup/api/amazon'

// 是否有权限
const isPermissionKey: string = 'syt-permission'
export const isPermission = async (key: string, callback?: any) => {
  let flag = false
  const result: any = await toolChrome.getChromeStorage(isPermissionKey)
  if (result && result.indexOf(key) > -1) {
    flag = true
  }
  return flag
}

// 获取版本号
export const getVersion = () => {
  return {
    version: process.env.SES_VERSION
  }
}

export const getSellerIdList = async () => {

}

// 检测站点
const setSellerIdListDomainObj = async (domainObj: any, merchantIDList: Array<string>, SellerIdList: Array<any>) => {
  let _merchantIDList = merchantIDList || [];
  let _SellerIdList = (SellerIdList || []).map(_old => {
    let _domainItem = domainObj[_old["MarketplaceId"]] || {};
    let item = {
      "SellerID": _old["SellerID"],
      "MarketplaceId": _old["MarketplaceId"],
      "MarketplaceName": _old["MarketplaceName"],
      "MerchantId": _old["MerchantId"],
      "host": _domainItem["host"] || "",
      "directedId": _domainItem["directedId"] || ""
    };
    return item
  });
  _SellerIdList = _SellerIdList.filter(item => {
    return item.host && item.directedId && tool.contains(_merchantIDList, item.MerchantId);
  });
  return _SellerIdList
}
export const checkSite = async (isReCheck: boolean) => {
  let { siteMap, siteToMarketplaceMap, siteToUrlMap } = siteInfo;
  let marketplacesList: Array<any> = [];
  let merchantMarketplaces_no_partner_account: Array<any> = [];
  let merchantIDList: Array<any> = [];

  let domainObj: any = {};

  const userRes: any = await toolChrome.getChromeStorage('userData')
  const { UserID, Token } = userRes.data
  const SellerIdList: any = await sellerList({ userid: UserID }, {
    sestoken: Token
  })

  let fn_addDomain = (_host: string, directedId: string, marketplaceId: string) => {
    //商户ID和域名对应关系
    if (marketplaceId) {
      if (!domainObj[marketplaceId]) {
        domainObj[marketplaceId] = {
          host: _host,
          directedId: directedId
        };
      }
    }
  }
  let _apiName1 = "get-partner-accounts";
  let _apiName2 = "get-merchant-marketplaces-with-no-partner-account-access";
  let _apiName3 = "get-merchant-marketplaces-for-partner-account";

  let _fn_getApiUrl = function (_apiName: string, _host: string) {
    return `${_host ? _host : 'https://sellercentral.amazon.com'}/partner-dropdown/data/${_apiName}?stck=na`;
  }

  let Sites: Array<any> = [];
  let Sites_siteCode_seller: Array<any> = [];

  for (let index = 0; index < SellerIdList.length; index++) {
    if (Object.hasOwnProperty.call(SellerIdList, index)) {
      let selerInfo = SellerIdList[index];
      let MarketplaceId = selerInfo["MarketplaceId"];
      let siteCode_seller = siteToMarketplaceMap[MarketplaceId];
      if (!tool.contains(Sites_siteCode_seller, siteCode_seller)) {
        //没有添加过
        Sites = Sites.concat(siteToUrlMap[siteCode_seller]);
        Sites_siteCode_seller.push(siteCode_seller);
      }
    }
  }
  let checkedSiteCodes: Array<any> = [];
  if (Sites && Sites.length) {
    for (let index = 0; index < Sites.length; index++) {
      if (Object.hasOwnProperty.call(Sites, index)) {
        const host = Sites[index];
        let siteCode = siteMap[host];
        if (tool.contains(checkedSiteCodes, siteCode)) {
          continue;
        }
        let res_account_access = await PostAmazon(_fn_getApiUrl(_apiName2, host), { limitResults: true }).catch(err => { });
        if (res_account_access) {
          if (res_account_access.partnerAccounts) {
            res_account_access.partnerAccounts.forEach((_item_partnerAccount: any) => {
              if (_item_partnerAccount.merchantMarketplaces && _item_partnerAccount.merchantMarketplaces.length > 0) {
                _item_partnerAccount.merchantMarketplaces.forEach((_item: any) => {
                  let _marketplacesList_no_partner_account_merchantIds = merchantMarketplaces_no_partner_account.map(_item_m => { return _item_m.merchantId });
                  if (!tool.contains(_marketplacesList_no_partner_account_merchantIds, _item.merchantId)) {
                    merchantMarketplaces_no_partner_account.push(_item);
                  }
                  if (siteToMarketplaceMap[_item.marketplaceId] == siteCode) {
                    //同一个区域的US==US
                    if (!tool.contains(merchantIDList, _item.merchantId)) {
                      merchantIDList.push(_item.merchantId);
                    }
                    fn_addDomain(host, _item.directedId, _item.marketplaceId);
                    checkedSiteCodes.push(siteCode);
                  }
                })
              }
            });
          }
        }
        let res_accounts = await PostAmazon(_fn_getApiUrl(_apiName1, host), { delegationContext: "" }).catch(err => { });
        if (res_accounts) {
          if (res_accounts.partnerAccounts) {
            res_accounts.partnerAccounts.forEach((item_partnerAccount: any) => {
              if (!tool.contains(merchantIDList, item_partnerAccount.id)) {
                merchantIDList.push(item_partnerAccount.id);
              }
            });
          }
          let partnerAccountId = null;
          let _t_partnerAccounts = res_accounts.partnerAccounts;
          if (_t_partnerAccounts && _t_partnerAccounts.length) {
            for (const _t_partnerAccounts_item of _t_partnerAccounts) {
              partnerAccountId = _t_partnerAccounts_item["id"];
              if (partnerAccountId) {
                let res_marketplaces = await PostAmazon(_fn_getApiUrl(_apiName3, host), { delegationContext: "", partnerAccountId: partnerAccountId }).catch(err => { });
                if (res_marketplaces) {
                  if (res_marketplaces.merchantMarketplaces) {
                    res_marketplaces.merchantMarketplaces.forEach((_item: any) => {
                      let _marketplacesList_merchantIds = marketplacesList.map(_item_m => { return _item_m.merchantId });
                      if (siteToMarketplaceMap[_item.marketplaceId] == siteCode) {
                        if (!tool.contains(_marketplacesList_merchantIds, _item.merchantId)) {
                          marketplacesList.push(_item);
                        }
                        if (!tool.contains(merchantIDList, _item.merchantId)) {
                          merchantIDList.push(_item.merchantId);
                        }
                        fn_addDomain(host, _item.directedId, _item.marketplaceId);
                        checkedSiteCodes.push(siteCode);
                      }
                    })
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  let result: Array<string> = []
  merchantIDList.forEach((_item: string) => {
    let _merchantId = _item && _item.substring(_item.lastIndexOf(".") + 1);
    if (!tool.contains(result, _merchantId)) {
      result.push(_merchantId);
    }
  })
  const list = await setSellerIdListDomainObj(domainObj, result, SellerIdList)

  
  console.log(list)
}

export default {
  isPermission,
  getVersion,
  checkSite
}