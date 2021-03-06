/**
 * 工具函数
 **/

/**
 * 通过屏幕尺寸以及图片尺寸，计算出图片在屏幕中完整显示的缩放比例
 * @param {number} naturalWidth - 图片原始宽
 * @param {number} naturalHeight - 图片原始高
 * @param {number} [edge] - 需要预留的边距
 */
export const calcFitScale = (naturalWidth, naturalHeight, edge=0) => {
    const figureWidth = naturalWidth + 2*edge
    const figureHeight = naturalHeight + 2*edge
    const scaleX = figureWidth>clientWidth() ? clientWidth()/(naturalWidth+2*edge) : 1
    const scaleY = figureHeight>clientHeight() ? clientHeight()/(naturalHeight+2*edge) : 1
    return Math.min(scaleX, scaleY) + 0.002 // 防止在高dpi设备出现无法占满边距的问题
}

/**
 * 屏幕尺寸
 */
export const windowWidth = () => window.innerWidth
export const scrollWidth = () => document.body.scrollWidth
export const clientWidth = () => document.documentElement.clientWidth
export const windowHeight = () => window.innerHeight
export const scrollHeight = () => document.body.scrollHeight
export const clientHeight = () => document.documentElement.clientHeight

/**
 * 平台判断
 * https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
 */
export const isMobile = () => {
    const ua = navigator.userAgent || navigator.vendor || window.opera
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(ua)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0,4))
};
export const isDesktop = () => !isMobile()

/**
 * 触摸交互锁定
 * 缩放, 滚动等
 */
const touchStyle = { html:{}, body:{} }
export const lockTouchInteraction = () => {
    // Save
    touchStyle.html.overflow = document.documentElement.style.overflow
    touchStyle.body.overflow = document.body.style.overflow
    touchStyle.body.position = document.body.style.position
    // Apply
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'relative'
};
export const unlockTouchInteraction = () => {
    // Recover
    document.documentElement.style.overflow = touchStyle.html.overflow
    document.body.style.overflow = touchStyle.body.overflow
    document.body.style.position = touchStyle.body.position
};

/**
 * 根据传入的属性, 返回附带对应显示状态的类名
 * @param {string}  defClassName - 基准类名
 * @param {boolean} isShow - 是否显示
 * @param {string} [showName] - 显示时附加的类名
 */
export const withShowingStatus = (defClassName, isShow=false, showName="show") => {
    return isShow ? `${defClassName} ${showName}` : defClassName
}

/**
 * 检查图片是否完全载入
 * @param {HTMLImageElement} targetImageElement - 目标图片元素
 * @param {function} [callback] - 回调函数
 */
export const checkImageLoadedComplete = (targetImageElement, callback) => {
    let timer
    const checker = () => {
        if (!targetImageElement || targetImageElement.complete) {
            clearInterval(timer)
            callback && callback()
        }
    }
    timer = setInterval(checker, 500)
    return timer
}

/**
 * 为 Url 附加参数
 * @param {string}  url - 目标地址
 * @param {object} [params] - 要附加的参数列表
 */
export const appendParams = (url, params={}) => {
    const paramString = Object.keys(params).reduce((acc, cur) => params[cur] ? acc.concat(`${cur}=${params[cur]}`) : acc, []).join("&")
    return paramString ? `${url}${url.includes('?') ? '&' : '?'}${paramString}` : url
}

/**
 * 提取样式对象中的数值
 * @param {string}  unit - 目标样式对象
 * @param {number} [percentRef] - 当 unit 为百分比时的基准参考数值
 */
export const numberOfStyleUnits = (unit, percentRef=100) => unit ? unit.includes('%') ? percentRef*Number(unit.substring(0, unit.length - 1))/100 : Number(unit.substring(0, unit.length - 2)) : unit

/**
 * 下载文件
 * @param {string}  href - 下载目标地址
 * @param {string} [name] - 下载文件名称
 */
export const downloadFromLink = (href, name) => {
    const downloadLink = document.createElement('a');
    downloadLink.href = href;
    downloadLink.download = name || href.split("/")[href.split("/").length-1];
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

/**
 * 令首字母大写
 * @param {string} string - 目标文本
 */
export const uppercaseFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * 增加浏览器前缀
 * @param {object} style - 目标样式
 */
export const withVendorPrefix = (style) => {
    const vendorPrefixList = ['webkit', 'moz', 'ms', 'o']
    return Object.keys(style).reduce((styleAcc, styleCur) => {
        const stylesWithPrefix = vendorPrefixList.reduce((prefixAcc, prefixCur) => {
            return Object.assign(prefixAcc, {
                [`${prefixCur}${uppercaseFirstLetter(styleCur)}`]: style[styleCur]
            })
        }, {})
        return Object.assign(styleAcc, stylesWithPrefix)
    }, {})
}