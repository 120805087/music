export function addClass(el,className){
    if(hasClass(el,className)) {
        return
    }
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
}

/*检查class存不存在*/
export function hasClass(el,className){
    let reg = new RegExp('(^|\\s)'+ className +'(\\s|$)');
    return reg.test(el.className)
}

/*获取deta-属性值*/

export function getData(el,name,val){
    let prefix = "data-";
    name = prefix + name;
    if(val){
        return el.setAttribute(name, val);
    }else {
        return el.getAttribute(name);
    }
}
