import packageInfo from '../package.json'
import { drawCircle, drawEllipse, drawImage, drawLine, drawRect, getCtx } from './tools/drawImage'
import { GetElement, getCanvasPosition, getEventPos } from './tools/getInfo'
import { update, destroy } from './config/index'
import { throttle } from './common/common'
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
    data: Data;
    option: Options;
    updateConfig: Function;
    destroy: Function;
    canvasImage: HTMLCanvasElement;
    // canvasBox: HTMLElement;
    constructor(ele: string | HTMLElement, option: Options) {
        this.option = option
        let _that = this
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
        const canvasStatus: canvasStatus = {
            // 鼠标事件处于什么状态，如果处于1，那就是绘制形状，
            // 2是自定义绘制形状
            // 3是输入文字
            eventStatus: 0,
            // 绘制的形状
            drawShape: 'Rect'
        }
        // init 
        const canvasBox = GetElement(ele)
        canvasBox.style.position = 'relative'
        const canvasDom: HTMLCanvasElement = document.createElement('canvas')
        // 背景图片层
        const canvasImage: HTMLCanvasElement = document.createElement('canvas')
        const imageBox: HTMLElement = document.createElement('div')
        this.data = {
            graph: []
        }
        this.height = canvasBox.offsetHeight
        this.width = canvasBox.offsetWidth
        canvasDom.height = this.height
        canvasDom.width = this.width
        // 绘制背景图片层
        imageBox.style.width = this.width + 'px'
        imageBox.style.height = this.height + 'px'
        canvasImage.height = this.height
        canvasImage.width = this.width
        imageBox.style.position = 'absolute'
        imageBox.style.left = '0px'
        imageBox.style.top = '0px'
        imageBox.style.zIndex = '-1'
        imageBox.appendChild(canvasImage)
        this.canvasImage = canvasImage
        canvasBox.appendChild(imageBox)
        drawImage(getCtx(canvasImage), option.image, option.x ? option.x : 0, option.y ? option.y : 0, option.w ? option.w : this.width, option.y ? option.y : this.height)
        // 圈选层
        canvasBox.appendChild(canvasDom)
        const ctx = getCtx(canvasDom)
        this.ctx = ctx
        // 获取图片画笔
        // 画笔配置的设置
        this.updateConfig = function (option: CtxOption) {
            update(ctx, option)
        }
        const reDraw = (): void => {
            ctx.clearRect(0, 0, this.width, this.height)
            // 绘制数据内容，内容一般存在内存中
            this.data.graph.forEach(item => {
                // @ts-ignore
                // drawRect(ctx, item.leftTop[0], item.leftTop[1], item.w, item.h)
                // drawEllipse(ctx,item.center[0],item.center[1], item.w/2,item.h/2)
                // drawCircle(ctx,item.center[0],item.center[1],item.h/2)
                drawLine(ctx,item)
            })
        }
        const init = () => {
            reDraw()
            interface TemplateDate{
                initX: number;
                initY: number;
                status: number;
                pos: {x: number,y: number}[];
            }

            let eventData:TemplateDate = {
                initX: 0,
                initY: 0,
                // 1 'down', 2 'moving' 0 null
                status: 0,
                pos: []
            }
            // 合并一次绘制的形状
            canvasStatus.drawShape = option.shape ? option.shape : 'Rect';
            canvasStatus.eventStatus = option.eventStatus ? option.eventStatus : 1;
            this.updateConfig({})
            // 鼠标事件
            canvasDom.addEventListener('mousedown', event => {
                const mousePos = getCanvasPosition(event)
                eventData.initX = mousePos.x
                eventData.initY = mousePos.y
                eventData.status = 1
            })
            canvasDom.addEventListener('mousemove', throttle(function (event: MouseEvent) {
                const mousePos = getCanvasPosition(event)
                if (eventData.status !== 0) {
                    // 根据形状进行绘制
                    switch (canvasStatus.eventStatus) {
                        case 1:
                            // 首先绘制其余的数据
                            reDraw()
                            if (canvasStatus.drawShape === 'Rect') {
                                // 判断位置，直接渲染
                                // let obj = getEventPos([eventData.initX, eventData.initY], [mousePos.x, mousePos.y])
                                // drawRect(ctx, obj.leftTop[0], obj.leftTop[1], obj.w, obj.h)
                                // drawEllipse(ctx,obj.center[0],obj.center[1], obj.w/2, obj.h/2)
                                // console.log(obj.center[0],obj.center[1],obj.h)
                                // drawCircle(ctx,obj.center[0],obj.center[1],obj.h/2)
                                eventData.pos.push({x: mousePos.x, y: mousePos.y})
                                drawLine(ctx,eventData)
                            }
                            break;
                    }
                };
            }, 10, 30))
            // 抬起事件
            canvasDom.addEventListener('mouseup', function (event: MouseEvent) {
                const mousePos = getCanvasPosition(event)
                if (eventData.status !== 0) {
                    // 处理数据，处理成左上角和右下角，形状以及一些别的配置样式一并写入对象中
                    let obj1 = getEventPos([eventData.initX, eventData.initY], [mousePos.x, mousePos.y])
                    // 绘制完毕将数据推入操作数据栈中
                    _that.data.graph.push(Object.assign(obj1, { drawShape: canvasStatus.drawShape },{pos: eventData.pos}))
                    eventData.status = 0
                    eventData.pos = []
                };
            })
        }
        init()
        this.version = packageInfo.version
        // destory
        this.destroy = function () {
            destroy(ctx, canvasBox)
        }
    }

    exportImg(){
        // todo 优化导出 --- 导出的污染画布，还有跨域


        // 先把所有数据在new出来的canvas上边进行渲染，然后进行一个静默导出
        let canvasTemp = document.createElement('canvas')
        canvasTemp.width = this.width
        canvasTemp.height = this.height
        // 绘制数据
        const ctx = getCtx(canvasTemp)
        // ctx.drawImage(this.canvasImage, this.option.x ? this.option.x : 0, this.option.y ? this.option.y : 0,  this.option.w ? this.option.w : this.width, this.option.y ? this.option.y : this.height);
        drawImage(ctx, this.option.image, this.option.x ? this.option.x : 0, this.option.y ? this.option.y : 0, this.option.w ? this.option.w : this.width, this.option.y ? this.option.y : this.height)
        this.data.graph.forEach(item => {
            // @ts-ignore
            // drawRect(ctx, item.leftTop[0], item.leftTop[1], item.w, item.h)
            // drawEllipse(ctx,item.center[0],item.center[1], item.w/2,item.h/2)
            // drawCircle(ctx,item.center[0],item.center[1],item.h/2)
            drawLine(ctx,item)
        })
        return canvasTemp.toDataURL("image/jpeg", 1.0)
        // let image = new Image();
	    // image.src = canvasTemp.toDataURL("image/png");
        // return canvasTemp.toDataURL("image/png")
    }
}
