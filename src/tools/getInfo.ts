/**
 * 根据无论是元素还是id都拿到对应元素
 * @param id 元素或者id
 * @returns 
 */
export const GetElement = function (id: string | HTMLElement): HTMLElement {
    let ele;
    if (typeof id === 'string') {
        console.log('string',id)
        ele = document.getElementById(id)
    } else {
        ele = id
    }
    console.log('ele',ele);
    
    if (!ele) throw new Error("is not a HtmlElement");
    return ele
}

/**
 * 返回鼠标事件的位置地方
 * @param e 返回常规事件的鼠标相对元素的位置
 * @returns 
 */
export function getCanvasPosition(e: MouseEvent) {
    return {
        x: e.offsetX,
        y: e.offsetY,
    }
}

/**
 * 计算事件的左上角右上角和中心
 * @param start 【x，y】
 * @param end 【x，y】
 * @returns 
 */
export function getEventPos(start: [x: number, y: number], end: [x: number, y: number]) {
    const obj = {
        rightBottom: [0, 0],
        leftTop: [0, 0],
        center: [0,0],
        w: 0,
        h: 0
    }
    obj.w = Math.abs(start[0]-end[0])
    obj.h = Math.abs(start[1]-end[1])
    // 计算开始和结束的位置
    if (end[0] > start[0]) {
        if (end[1] > start[1]) {
            // 右下角是结束位置
            obj.rightBottom = [end[0], end[1]]
            obj.leftTop = [start[0], start[1]]
            obj.center = [end[0] - obj.w/2,end[1] - obj.h/2]
        } else {
            obj.rightBottom = [end[0], start[1]]
            obj.leftTop = [start[0], end[1]]
            obj.center = [end[0] - obj.w/2,start[1] - obj.h/2]
        }
    } else {
        if (end[1] > start[1]) {
            obj.leftTop = [end[0], start[1]]
            obj.rightBottom = [start[0], end[1]]
            obj.center = [start[0] - obj.w/2,end[1] - obj.h/2]

        } else {
            obj.leftTop = [end[0], end[1]]
            obj.rightBottom = [start[0], start[1]]
            obj.center = [start[0] - obj.w/2,start[1] - obj.h/2]
        }
    }
    return obj
}

