/**
 * @description 常用的工具描述
 * @function throttle 节流
 */
export * from './judeg'

/**
 * 简单的节流函数
 * @param func
 * @param wait
 * @param mustRun
 * @returns
 */
export function throttle(func: Function, wait: number, mustRun: number) {
    let timeout: any;
    let startTime = new Date();
    return function () {
        // @ts-ignore
        let context = this, args = arguments, curTime = new Date();
        clearTimeout(timeout);
        // @ts-ignore
        if (curTime - startTime >= mustRun) {
            func.apply(context, args);
            startTime = curTime;
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args);
            }, wait);
        }
    };
};


/**
 * 防抖
 * @param fn 函数
 * @param delay 间隔时间，毫秒
 */
export function debounce<C, T extends unknown[]>(
    fn: (this: C, ...args: T) => void,
    delay: number = 200
): (this: C, ...args: T) => void {
    let lastFn = 0
    return function (...args: T) {
        if (lastFn) {
            window.clearTimeout(lastFn)
        }
        lastFn = window.setTimeout(() => {
            lastFn = 0
            fn.call(this, ...args) // this 报语法错误，先用 null
        }, delay)
    }
}

/**
 * isFunction 是否是函数
 * @param fn 函数
 */
export function isFunction(fn: any): fn is Function {
    return typeof fn === 'function'
}

