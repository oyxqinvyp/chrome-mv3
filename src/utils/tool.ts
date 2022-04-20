export const contains = function (list: Array<any>, obj: any) {
  var i = list.length;

  while (i--) {
    if (list[i] === obj) {
      return true;
    }
  }
  return false;
};

export default {
  contains
}