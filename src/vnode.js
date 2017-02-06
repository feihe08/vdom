/**
 * 
 * 
 * @export
 * @param {any} nodeName
 * @param {any} attributes
 * @param {any} children
 */
export function vnode(nodeName, attributes, children){

  this.nodeName = nodeName
  this.attributes = attributes
  this.children = children
}

