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

