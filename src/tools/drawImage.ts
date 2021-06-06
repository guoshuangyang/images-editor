import { isString } from '../common/judge'
/**
     * 创建一个图片的背景
     * @param ctx 
     * @param image 
     * @param dx x轴坐标
     * @param dy y轴坐标
     * @param dw canvas的宽度
     * @param dh canvas的高度
     */
export function drawImage(ctx: CanvasRenderingContext2D, image: CanvasImageSource, dx: number, dy: number, dw: number, dh: number) {
    let image1: any;
    function draw(): void {
        try {
            ctx.drawImage(image1, dx, dy, dw, dh)
        } catch (err) {
            console.error("drawImage is failed")
        }
    }
    // check image 
    if (isString(image)) {
        image1 = new Image(dw, dy); // Using optional size for image
        image1.onload = draw
        image1.src = image
    } else {
        image1 = image
        draw()
    }
}

// 获取画笔
export const getCtx = function (canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')
    if (!ctx) {
        throw new Error("canvas is nonsupport !");
    }
    return ctx
}

export const drawCircle = function (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, fillColor = 'red') {
    // 将canvas状态放入栈中
    ctx.save()
    ctx.strokeStyle = fillColor
    // 开始绘制路径
    ctx.beginPath()
    // 绘制圆形 --
    ctx.arc(cx, cy, r, 0, 2 * Math.PI, true)
    // 绘制填充
    // ctx.fill()
    // 绘制边框
    ctx.stroke()
    // 关闭绘制
    ctx.closePath()
    // 恢复默认的状态
    ctx.restore()
}

export const drawRect = function (ctx: CanvasRenderingContext2D, rx: number, ry: number, rw: number, rh: number, fillColor = 'red') {
    // 将canvas状态放入栈中
    ctx.save()
    ctx.strokeStyle = fillColor
    // 开始绘制路径
    ctx.beginPath()
    // 绘制矩形 --
    ctx.strokeRect(rx, ry, rw, rh)
    // 绘制填充
    // ctx.fill()
    // 绘制边框
    ctx.stroke()
    // 关闭绘制
    ctx.closePath()
    // 恢复默认的状态
    ctx.restore()
}