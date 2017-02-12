
/**
 * 
 * 
 * @export
 * @param {any} tagName
 * @param {any} attributes
 * @param {any} children
 * @param {any} elm
 */
export function vnode(tagName, attributes, children, elm){
  this.tagName = tagName
  this.attributes = attributes
  this.children = children
  this.elm = elm
  this.key = attributes && attributes.key
}
