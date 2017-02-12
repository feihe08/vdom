import { isString, isUndefined, isArray } from './util'
import { vnode } from './vnode'


function isVnode(vnode) {
  return vnode.tagNeme !== undefined
}

function sameNode(vnode1, vnode2) {
  return vnode1.tagNeme === vnode2.tagNeme && vnode1.key === vnode2.key
}

function createElm(vnode) {
  let tagName = vnode.tagName,
    children = vnode.children,
    child, childElm, elm, i
  elm = document.createElement(tagName)
  setAttributes(elm, attrs)
  for (i = 0; i < children.length; ++i) {
    child = children[i]
    childElm = isString(child) ? document.createTextNode(child) : createElm(child)
    elm.appendChild(childElm)
  }
  vnode.elm = elm
}

function emptyVnode(elm) {
  let tagName = elm.tagName.toLowerCase()
  return vnode(tagName, {}, [], elm);
}


export function diff(oldVnode, newVnode) {
  const insertVnodeQueue = [], parent, elm
  //如果第一个参数不是vnode
  if (isVnode(oldVnode)) {
    oldVnode = emptyVnode(oldVnode)
  }
  if (sameNode(oldVnode, newVnode)) {
    patchVnode(oldVnode, newVnode)
  } else {
    elm = oldVnode.elm
    parent = elm.parentNode
    createElm(newVnode)
    if (parent !== null) {
      parent.insertBefore(newVnode.elm, oldVnode.elm)
      parent.removeChild(oldVnode.elm)
    }
  }
  return newVnode
}

function patchVnode(oldVnode, newVnode) {
  let elm = oldVnode.elm
  if(oldVnode === newVnode) return
  diffProps(elm, oldVnode, newVnode)
  diffChildren(oldVnode, newVnode)
}

function diffProps(elm, oldVnode, newVnode) {
  let key, old, cur
    oldAttrs = oldVnode.attributes,
    newAttrs = newVnode.attributes

  if (!oldAttrs && !newAttrs) return
  oldAttrs = oldAttrs || {}
  newAttrs = newAttrs || {}

  //新增属性、更新属性
  for (key in newAttrs) {
    cur = newAttrs[key]
    if (oldAttrs[key] !== cur) {
      //todo 布尔属性，比如checked, selected
      elm.setAttribute(key, cur)
    }
  }
  //删除已被删除的属性
  for (key in oldAttrs) {
    if (isUndefined(newAttrs[key])) {
      elm.removeAttribute(key)
    }
  }
}

function setAttributes(elm, attrs) {
  let p
  for (p in attrs) {
    elm.setAttribute(p, attrs[p])
  }
}

function diffChildren(oldVnode, newVnode) {
  let reusltCh,
    oldStartIdx = newStartIdx = 0,
    oldCh = oldVnode.children, newCh = newVnode.children
  //todo children的diff算法

}

function oldKeyToIdx(ch) {
  let i, map = {}, key
  for (i = 0; i < ch.length; ++i) {
    key = ch.key
    if (key !== undefined) {
      map[key] = i
    }
  }
  return map
}
