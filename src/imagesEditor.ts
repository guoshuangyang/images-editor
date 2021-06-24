/**
 * @description 入口文件
 * @author yyy <guoshuangyang0@163.com>
 */

import imagesEditor from './editor'
// 非浏览器不可用
try {
    document
} catch (ex) {
    throw new Error('请在浏览器环境下运行')
}
export default imagesEditor