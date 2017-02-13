import { vnode } from './vnode'

const stack = []


/**
 * @export
 * @param {any} nodeName
 * @param {any} attributes
 * @returns
 */
export function h(nodeName, attributes) {
  let children = [], text = '', child, i

  for (i = arguments.length; i-- > 2;) {
    stack.push(arguments[i])
  }
  while (stack.length) {
    child = stack.pop()
    if (child instanceof Array) {
      for (i = child.length; i--;) {
        stack.push(child[i])
      }
    }
    if (typeof (child) === 'string' || typeof (child) === 'number') {
      text = child
    } else if (child) {
      children.push(child)
    }
  }
  let p = new vnode(nodeName, attributes || undefined, children || [], text, undefined)
  return p
}