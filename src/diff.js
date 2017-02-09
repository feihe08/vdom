import { isString, isUndefined } from './util'
import { vnode } from './vnode'


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
  diffChildren(oldNode, newNode)
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

function diffChildren(oldNode, newNode) {
  let reusltCh,
    oldStartIdx = newStartIdx = 0,
    oldCh = oldNode.children, newCh = newNode.children
  //todo children的diff算法
  
}

function oldKeyToIdx(ch) {
  let i, map = {}, key
  for (var i = 0; i < ch.length; ++i) {
    key = ch.key
    if (key !== undefined) {
      map[key] = i
    }    
  }
  return map
}