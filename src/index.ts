import { version } from '../package.json'
import { isDom } from './common/judge'
/**
 * 返回一个canvas编辑器对象
 * @param {*} dom dom元素或者id
 * @param {*} option 相关的配置
 * @returns 
 */
export default function imagesEditor(ele, option) {
    let contentDom;
    // 判断是不是dom元素，否则抛出异常
    try {
        let tempDom;
        tempDom = null
        if (typeof ele === 'string') tempDom = document.getElementById(ele);
        contentDom = isDom(tempDom) ? tempDom : null
    } catch {
        throw ('is not a HtmlElement')
    }
    return {
        version: version
    }
}