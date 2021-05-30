import * as packageInfo from '../package.json'
import {isDom} from './common/judge'

/**
 * 返回一个canvas编辑器对象
 * @param {*} ele dom元素或者id
 * @param {*} option 相关的配置
 * @returns
 */
export default function ImagesEditor(ele, option) {
    let contentDom;
    // 判断是不是dom元素，否则抛出异常
    let tempDom;
    tempDom = null
    if (typeof ele === 'string') tempDom = document.getElementById(ele);
    contentDom = isDom(tempDom) ? tempDom : null
    if (!contentDom) return console.warn('未获取到元素')
    console.log('???')
    return {
        version: packageInfo.version
    }
}
