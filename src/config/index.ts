// 配置相关文件
export const update = function (ctx: CanvasRenderingContext2D,colorOption: object):void{
    const options = {
        borderColor: 'red',
        textColor: 'black',
        fillColor: 'red',
        borderStyle: 'rect'
    }
    let option = Object.assign(options,colorOption)
    ctx.strokeStyle = option.borderColor
    ctx.fillStyle = option.fillColor
}

export const destroy = function (ctx:CanvasRenderingContext2D,parentElement:HTMLElement) {
    // 清除画布的内容
    ctx.restore()
    // 移除所有子元素
    parentElement.innerHTML = ""
}