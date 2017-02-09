/**
 * 
 * 
 * @export
 * @param {any} tagName
 * @param {any} attributes
 * @param {any} children
 */
export function vnode(tagName, attributes, children){
  this.tagName = tagName
  this.attributes = attributes
  this.children = children
  this.key = attributes && attributes.key
}
