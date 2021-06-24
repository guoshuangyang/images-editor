/***
 * @description 判断是不是某个值的内容，统一返回Boolean
 * @author yyy
 */

/**
 * 是不是dom元素
 * @param element
 */
export const isDom = (element: string | HTMLElement ) => {
    return typeof HTMLElement === 'object'
        ? element instanceof HTMLElement
        : element && typeof element === 'object' && element.nodeType === 1 && typeof element.nodeName === 'string';
}

/**
 * 返回是不是字符串
 * @param str
 */
export const isString = function(str: any){
    if(Object.prototype.toString.call(str) === "[object String]") return true;
    return false;
}