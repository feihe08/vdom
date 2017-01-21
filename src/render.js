/**
 * @export
 * @param {VNode} vnode
 * @param {any} parent
 */
export function render(vnode) {
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode)
  }
  let el = document.createElement(vnode.nodeName)

  for (let key in vnode.attributes) {
    let value = vnode.attributes[key]
    el.setAttribute(attribute, value)
  }

  vnode.children
    .map(render)
    .forEach(el.appendChild.bind(el))  
  return el
}
