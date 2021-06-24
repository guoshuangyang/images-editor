import { isString } from '../../tools'
/**
 * 创建一个图片的背景
 * @param context
 * @param image
 * @param dx x轴坐标
 * @param dy y轴坐标
 * @param dw canvas的宽度
 * @param dh canvas的高度
 */
export function drawImage(context: CanvasRenderingContext2D, image: CanvasImageSource, dx: number, dy: number, dw: number, dh: number) {
    let image1: any;
    function draw(): void {
        try {
            context.globalCompositeOperation="destination-over"
            context.drawImage(image1, dx, dy, dw, dh)
        } catch (err) {
            console.error("drawImage is failed")
        }
    }
    console.log(image)
    // check image
    if (isString(image)) {
        image1 = new Image(dw, dy); // Using optional size for image
        image1.crossOrigin = "Anonymous";
        image1.onload = draw
        image1.src = image
    } else {
        image1 = image
        draw()
    }
}

// 获取画笔
export const getCtx = function (canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d')
    if (!context) {
        throw new Error("canvas is nonsupport !");
    }
    return context
}

/**
 * 绘制圆形
 * @param ctx
 * @param cx
 * @param cy
 * @param r
 * @param fillColor
 */
export const drawCircle = function (context: CanvasRenderingContext2D, cx: number, cy: number, r: number, fillColor = 'red') {
    // 将canvas状态放入栈中
    context.save()
    context.strokeStyle = fillColor
    // 开始绘制路径
    context.beginPath()
    // 绘制圆形 --
    context.arc(cx, cy, r, 0, 2 * Math.PI, true)
    // 绘制填充
    // context.fill()
    // 绘制边框
    context.stroke()
    // 关闭绘制
    context.closePath()
    // 恢复默认的状态
    context.restore()
}

/**
 * 绘制矩形 --- 绘制正圆形的时候会出现宽大于高，依旧出来圆形，但是不是常规意义的圆形
 * @param context 画笔
 * @param rx
 * @param ry
 * @param rw
 * @param rh
 * @param fillColor
 */
export const drawRect = function (context: CanvasRenderingContext2D, rx: number, ry: number, rw: number, rh: number, fillColor = 'red') {
    // 将canvas状态放入栈中
    context.save()
    context.strokeStyle = fillColor
    // 开始绘制路径
    context.beginPath()
    // 绘制矩形 --
    context.strokeRect(rx, ry, rw, rh)
    // 绘制填充
    // context.fill()
    // 绘制边框
    context.stroke()
    // 关闭绘制
    context.closePath()
    // 恢复默认的状态
    context.restore()
}

/**
 * 绘制椭圆
 * @param ctx 画笔
 * @param x 坐标
 * @param y 坐标
 * @param a x轴半径宽度
 * @param b y轴半径高度
 */
export const drawEllipse = function (context: CanvasRenderingContext2D, x: number, y: number, a: number, b: number) {
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

/**
 * 绘制曲线或者线段什么的
 */
export const drawLine = function (context: CanvasRenderingContext2D, option: any) {
    context.save();
    context.strokeStyle = 'red'
    context.beginPath();
    context.moveTo(option.pos[0].x, option.pos[0].y);
    for (let i = 1; i < option.pos.length; i++) {
        context.lineTo(option.pos[i].x, option.pos[i].y)
    }
    context.stroke();
    context.restore();
}


/**
 * 根据传值进行不同的渲染样式
 * @param option
 */
export const drawByMouse = function (option: any) {

}
