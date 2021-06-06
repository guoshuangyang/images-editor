/**
 * 根据无论是元素还是id都拿到对应元素
 * @param id 元素或者id
 * @returns 
 */
export default function GetElement(id: string | HTMLElement): HTMLElement {
    let ele;
    if (typeof id === 'string') {
        ele = document.getElementById(id)
    } else {
        ele = id
    }
    if(!ele) throw new Error("is not a HtmlElement");
    return ele
}