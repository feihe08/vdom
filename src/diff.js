import {isString} from './util'

const diffTypes = {
  REPLACE: 0,
  REOLDER: 1,
  PROPS: 2,
  TEXT: 3
}

/**
 * @export
 * @param {any} oldTree
 * @param {any} newTree
 */
export function diff(oldTree, newTree){
  let index = 0
  let patches = {}
  dfsWalk(oldTree, newTree, index, patches)
  return patches
}

function dfsWalk(oldNode, newNode, index, patches, currentPatch){
  var currentPatch = currentPatch || []

  if(newNode === null){

  }else if(isString(newNode) && isString(oldNode)){
    if(newNode !== newNode){
      currentPatch.push({type: diffTypes.TEXT, context: newNode})
    }
  }else if(oldNode.nodeName === newNode.nodeName){
    let propsPatches = diffProps(oldNode, newNode)
    if(propsPatches){
      currentPatch.push({type: diffTypes.PROPS, context: propsPatches})
    }
    diffChildren(oldNode.children, newNode.children, index, patches, currentPatch)
  }else {
    currentPatch.push({type: diffTypes.REPLACE, context: newNode})
  }
  
  if(currentPatch.length){
    patches[index] = currentPatch
  }
}

function diffProps(oldNode, newNode){
  let count = 0, propsPatches = {}, key, value
  for(key in newNode){
    value = newNode[key]
    if(oldNode.hasOwnProperty(key)){
      if(value !== oldNode[key]){
        propsPatches[key] = value
        count++
      }
    }else {
      propsPatches[key] = value
    }
  }
  if(count === 0){
    return null
  }
  return propsPatches
}

function diffChildren(oldChildren, newChildren, index, patches, currentPatch){
  let oldChild
  oldChildren.forEach(function(child, i){
    index++
    oldChild = oldChildren[i]
    dfsWalk(child, oldChild, index, patches, currentPatch)
  })
}


