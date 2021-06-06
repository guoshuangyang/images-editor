import * as packageInfo from '../package.json'
import drawImage from './tools/drawImage'
import GetElement from './tools/getElement'
import { update, destroy } from './config/index'
/**
 * image 必要的参数，图片
 * x  绘制的x坐标位置
 * y  绘制的y坐标的开始
 * w  绘制的宽度
 * h  绘制图片的高度
 */
interface Options {
    image: CanvasImageSource;
    x?: number;
    y?: number;
    w?: number;
    h?: number;
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
    config: object;
    update: Function;
    destroy: Function;
    // canvasBox: HTMLElement;
    constructor(ele: string | HTMLElement, option: Options) {
        // init 
        const canvasBox = GetElement(ele)
        const canvasDom: HTMLCanvasElement = document.createElement('canvas')
        this.config = {
            graph: []
        }
        this.height = canvasBox.offsetHeight
        this.width = canvasBox.offsetWidth
        canvasDom.height = this.height
        canvasDom.width = this.width
        canvasBox.appendChild(canvasDom)
        const ctx = canvasDom.getContext('2d')
        if (!ctx) {
            throw new Error("canvas is nonsupport !");
        }
        this.ctx = ctx
        // 画笔配置的设置
        this.update = function (option: CtxOption) {
            update(ctx, option)
        }
        const init = () => {
            new drawImage(ctx, option.image, option.x ? option.x : 0, option.y ? option.y : 0, option.w ? option.w : this.width, option.y ? option.y : this.height)
            this.update({})
        }
        init()
        this.version = packageInfo.version
        // destory
        this.destroy = function () {
            destroy(ctx, canvasBox)
        }
    }
}
