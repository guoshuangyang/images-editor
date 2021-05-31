/***
 * 判断是不是某个值的内容，统一返回Boolean
 */
export const isDom = (element) => {
    return typeof HTMLElement === 'object'
        ? element instanceof HTMLElement
        : element && typeof element === 'object' && element.nodeType === 1 && typeof element.nodeName === 'string';
};
