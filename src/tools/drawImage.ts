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

/**
 * 绘制圆形
 * @param ctx 
 * @param cx 
 * @param cy 
 * @param r 
 * @param fillColor 
 */
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

/**
 * 绘制矩形 --- 绘制正圆形的时候会出现宽大于高，依旧出来圆形，但是不是常规意义的圆形
 * @param ctx 画笔
 * @param rx 
 * @param ry 
 * @param rw 
 * @param rh 
 * @param fillColor 
 */
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

/**
 * 绘制椭圆
 * @param ctx 画笔
 * @param x 坐标
 * @param y 坐标
 * @param a x轴半径宽度
 * @param b y轴半径高度
 */
export const  drawEllipse = function(context: CanvasRenderingContext2D, x:number, y:number, a:number, b:number)  {
    var ox = 0.5 * a,
        oy = 0.6 * b;
    context.save();
    context.strokeStyle = 'red'
    context.translate(x, y);
    context.beginPath();
    context.moveTo(0, b);
    context.bezierCurveTo(ox, b, a, oy, a, 0);
    context.bezierCurveTo(a, -oy, ox, -b, 0, -b);
    context.bezierCurveTo(-ox, -b, -a, -oy, -a, 0);
    context.bezierCurveTo(-a, oy, -ox, b, 0, b);
    context.stroke();
    context.closePath();
    // context.fill();
    context.restore();
}
// function(ctx: CanvasRenderingContext2D, x:number, y:number, a:number, b:number) {
//     const step = (a > b) ? 1 / a : 1 / b;
//     ctx.beginPath();
//     ctx.moveTo(x + a, y);
//     for (let i = 0; i < 2 * Math.PI; i += step) {
//         ctx.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
//     }
//     ctx.closePath();
//     // ctx.fillStyle = "rgba(0,0,0,.2)";
//     ctx.fill();
// }
