import moment from 'moment'
moment.locale('zh-cn')

export const contains = function (list: Array<any>, obj: any) {
  var i = list.length;

  while (i--) {
    if (list[i] === obj) {
      return true;
    }
  }
  return false;
};

export const formatTime = (value: string | number, format?: string) => {
  let formatKey = format || 'YYYY/MM/DD HH:mm:ss'
  return moment(value).format(formatKey)
}

export default {
  contains,
  formatTime
}