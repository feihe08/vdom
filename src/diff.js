import {
  isString,
  isUndefined
} from './util'
import {
  vnode
} from './vnode'


function isVnode(vnode) {
  return vnode.tagNeme !== undefined
}

function sameNode(vnode1, vnode2) {
  return vnode1.tagNeme === vnode2.tagNeme && vnode1.key === vnode2.key
}


export function diff(oldNode, newNode) {
  if (sameNode(oldNode, newNode)) {
    return patchVnode(oldNode, newNode)
  } else {
    return newNode
  }
}

function patchVnode(oldNode, newNode) {
  diffProps(oldNode, newNode)
  diffChildren(oldNode.children, newNode.children)
}

function diffProps(oldNode, newNode) {
  let key, old, cur, oldAttrs = oldNode.attributes,
    newAttrs = newNode.attributes

  if (!oldAttrs && !newAttrs) return
  oldAttrs = oldAttrs || {}
  newAttrs = newAttrs || {}

  for (key in newAttrs) {
    cur = newAttrs[key]
    if (oldAttrs[key] !== cur) {
      oldAttrs[key] = cur
    }
  }

  for (key in oldAttrs) {
    if (isUndefined(newAttrs[key])) {
      delete oldAttrs[key]
    }
  }
}

function diffChildren(oldCh, newCh) {
  let reusltCh,
    oldStartIdx = newStartIdx = 0
  
}