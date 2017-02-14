import {h, diff} from './src/index'

/**
 * 大致思路
 * h函数：得到自定义的vnode
 * diff：比较两个vnode的不同，并返回一个新的
 * 初始化的时候接受一个dom容器，一个vnode
 * 在diff内部处理都没的更新
 * 整体结构类似于snabbdom
 * todo 
 * text节点和子节点并存的情况要不要考虑
 * 不特殊对待text节点改如何做
 * 
 */

let foo = (
  <div id="foo">
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
  </div>
)

let container = document.querySelector('#container')

diff(container, foo)


let bar  = (
  <div id="foo" style="color:red;">
    <ul>
      <li>2</li>
      <li>3</li>
    </ul>
  </div>
)
setTimeout(function() {
  diff(foo, bar)  
}, 2000);