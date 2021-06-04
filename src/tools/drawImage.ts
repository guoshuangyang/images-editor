export default class drawImage {
    /**
     * 创建一个图片的背景
     * @param ctx 
     * @param image 
     * @param dx x轴坐标
     * @param dy y轴坐标
     * @param dw canvas的宽度
     * @param dh canvas的高度
     */
    constructor(ctx: CanvasRenderingContext2D, image: CanvasImageSource, dx: number, dy: number, dw: number, dh: number) {
        try {
            ctx.drawImage(image, dx, dy, dw, dh)
        } catch (err) {
            throw new Error("drawImage is failed");
        }
    }
}