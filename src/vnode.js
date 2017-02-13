
/**
 * 
 * 
 * @export
 * @param {any} nodeName
 * @param {any} attributes
 * @param {any} children
 * @param {any} text
 * @param {any} elm
 * @returns
 */
export function vnode(nodeName, attributes, children, text, elm){
  this.nodeName = nodeName
  this.attributes = attributes
  this.children = children
  this.text = text
  this.elm = elm
  this.key = attributes && attributes.key
}
