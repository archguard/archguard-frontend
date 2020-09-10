export interface GetQueryString {
  [key: string]: string | number;
}
//用于将对象转换成get请求的字符串， { a: 1, b: 2, } 转换成 ?a=1&b=2
export function getQueryString(params: GetQueryString): string {
  return Object.keys(params).reduce((initialVal, currentVal, currentIndex, array) => {
    const value = params[currentVal];
    return `${initialVal}${currentVal}=${value}${currentIndex === array.length - 1 ? '' : '&'}`;
  }, '?');
}