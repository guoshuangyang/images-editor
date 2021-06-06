/***
 * 判断是不是某个值的内容，统一返回Boolean
 */

export const isDom = (element: string | HTMLElement ) => {
    return typeof HTMLElement === 'object'
        ? element instanceof HTMLElement
        : element && typeof element === 'object' && element.nodeType === 1 && typeof element.nodeName === 'string';
}


export const isString = function(str:any){
    if(Object.prototype.toString.call(str) === "[object String]") return true;
    return false;
}