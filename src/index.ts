import * as packageInfo from '../package.json'
import drawImage from './tools/drawImage'
import GetElement from './tools/getElement'

/**
 * image 必要的参数，图片
 * 
 */
interface Options {
    image: CanvasImageSource;
    x?: number;
    y?: number;
    w?: number;
    h?: number;
}


/**
 * 返回一个canvas编辑器对象
 * @param {*} ele dom元素或者id
 * @param {*} option 相关的配置
 * @returns
 */
export default class ImagesEditor {
    height: number;
    width: number;
    ctx: CanvasRenderingContext2D;
    version: string;
    // canvasBox: HTMLElement;
    constructor(ele: string | HTMLElement, option: Options) {
        const canvasBox = GetElement(ele)
        const canvasDom: HTMLCanvasElement = document.createElement('canvas')
        this.height = canvasBox.offsetHeight
        this.width = canvasBox.offsetWidth
        canvasDom.height = this.height
        canvasDom.width = this.width
        canvasBox.appendChild(canvasDom)
        console.log(canvasBox)
        const ctx = canvasDom.getContext('2d')
        if (!ctx) {
            throw new Error("未创建画笔");
        }
        this.ctx = ctx
        new drawImage(ctx, option.image, option.x ? option.x : 0, option.y ? option.y : 0, option.w ? option.w : this.width, option.y ? option.y : this.height)
        this.version = packageInfo.version
    }
}
