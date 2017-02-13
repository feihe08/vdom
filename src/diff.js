import { isString, isUndefined, isArray } from './util'
import { vnode } from './vnode'


function isVnode(vNode) {
  return vNode instanceof vnode
}

function sameVnode(vnode1, vnode2) {
  let id1 = vnode1.attributes ? vnode1.attributes.id : undefined
  let id2 = vnode2.attributes ? vnode2.attributes.id : undefined
  let classList1 = vnode1.attributes ? vnode1.attributes.class : undefined
  let classList2 = vnode2.attributes ? vnode2.attributes.class : undefined
  return vnode1.nodeName === vnode2.nodeName
    && vnode1.key === vnode2.key
    && id1 === id2
    && classList1 === classList2
}

function createElm(vnode) {
  let nodeName = vnode.nodeName,
    attrs = vnode.attributes,
    vCh = vnode.children,
    text = vnode.text,
    vChild, child, elm, i
  elm = document.createElement(nodeName)
  setAttributes(elm, attrs)
  if(text){
    elm.appendChild(document.createTextNode(text))
  }
  for (i = 0; i < vCh.length; ++i) {
    vChild = vCh[i]
    if(vChild){
      child = createElm(vChild)
      elm.appendChild(child)
    }
  }
  vnode.elm = elm
  return elm
}

function emptyVnode(elm) {
  let nodeName = elm.tagName.toLowerCase()
  return new vnode(nodeName, {}, [], undefined, elm);
}


export function diff(oldVnode, newVnode) {
  // const insertVnodeQueue = []
  let parent
  let elm
  //如果第一个参数不是vnode
  if (!isVnode(oldVnode)) {
    oldVnode = emptyVnode(oldVnode)
  }
  if (sameVnode(oldVnode, newVnode)) {
    patchVnode(oldVnode, newVnode)
  } else {
    elm = oldVnode.elm
    parent = elm.parentNode
    createElm(newVnode)
    if (parent) {
      parent.replaceChild(newVnode.elm, oldVnode.elm)
    }
  }
  return newVnode
}

function patchVnode(oldVnode, newVnode) {
  //todo 
  let elm = oldVnode.elm
  if (!newVnode.text) {
    newVnode.elm = elm
    let oldProps = oldVnode.attributes,
      newProps = newVnode.attributes,
      oldCh = oldVnode.children,
      newCh = newVnode.children
    if (oldProps !== newProps) {
      diffProps(elm, oldVnode, newVnode)
    }
    if (oldCh !== newCh) {
      diffChildren(elm, oldVnode.children, newVnode.children)
    }
  } else if (oldVnode.text !== newVnode.text) {
    elm.textContent = newVnode.text  
  }
}

function diffProps(elm, oldVnode, newVnode) {
  let key, old, cur,
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
function diffChildren(parentElm, oldCh, newCh) {
  let oldStartIdx = 0,
    oldEndIdx = oldCh.length - 1,
    oldStartVnode = oldCh[0],
    oldEndVnode = oldCh[oldEndIdx],
    newStartIdx = 0,
    newEndIdx = newCh.length - 1,
    newStartVnode = newCh[0],
    newEndVnode = newCh[newEndIdx],
    oldKeyToIdx, idxInOld, elmToMove, before
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (isUndefined(oldStartVnode)) {
      oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
    } else if (isUndefined(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
      patchVnode(oldStartVnode, newEndVnode);
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
      patchVnode(oldEndVnode, newStartVnode);
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      if (isUndefined(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      idxInOld = oldKeyToIdx[newStartVnode.key];
      if (isUndefined(idxInOld)) { // New element
        parentElm.insertBefore(createElm(newStartVnode), oldStartVnode.elm);
        newStartVnode = newCh[++newStartIdx];
      } else {
        elmToMove = oldCh[idxInOld];
        patchVnode(elmToMove, newStartVnode);
        oldCh[idxInOld] = undefined;
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
        newStartVnode = newCh[++newStartIdx];
      }
    }
  }
  if (oldStartIdx > oldEndIdx) {
    before = isUndefined(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
    addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx);
  } else if (newStartIdx > newEndIdx) {
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
  }


}

function setAttributes(elm, attrs) {
  let p
  for (p in attrs) {
    elm.setAttribute(p, attrs[p])
  }
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, map = {}, key;
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (key) map[key] = i;
  }
  return map;
}

function addVnodes(parentElm, before, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    parentElm.insertBefore(createElm(vnodes[startIdx]), before);
  }
}

function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    var ch = vnodes[startIdx];
    if (ch) {
      parentElm.removeChild(ch.elm);
    }
  }
}