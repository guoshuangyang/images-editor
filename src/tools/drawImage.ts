import { isString } from '../common/judge'
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
        let image1: any;
        function draw():void{
            try {
                ctx.drawImage(image1, dx, dy, dw, dh)
            } catch (err) {
                console.error("drawImage is failed")
            }
        }
        // check image 
        if (isString(image)){
            image1 = new Image(dw, dy); // Using optional size for image
            image1.onload = draw
            image1.src = image
        }else {
            image1 = image
            draw()
        }
    }
}