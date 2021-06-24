/**
 * @param image 必要的参数，图片
 * @param x  绘制的x坐标位置
 * @param y  绘制的y坐标的开始
 * @param w  绘制的宽度
 * @param h  绘制图片的高度
 */
interface Options {
    image: CanvasImageSource;
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    shape?: string;
    eventStatus?: number;
}
/**
 * borderColor 边框的颜色
 * borderStyle 边框的类型
 * fillColor  绘制的填充色
 * textColor 文字颜色
 */
interface CtxOption {
    borderColor?: string;
    textColor?: string;
    fillColor?: string;
    borderStyle?: string;
}

/**
 * 图层数据，渲染的数据
 */
interface Data {
    graph: {
        leftTop: number[];
        rightBottom: number[];
        center: number[];
        w: number,
        h: number,
    }[];
}

/**
 * @interface canvasStatus
 * @description eventStatus 鼠标事件出发后事件的类型
 * @description drawShape  鼠标事件的触发绘制之后的形状
 */
interface canvasStatus {
    eventStatus: number;
    // 绘制的形状
    drawShape: string
}