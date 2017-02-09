import {h, diff, render} from './src/index'

/**
 * 大致思路
 * h函数：得到自定义的vnode
 * diff：比较两个vnode的不同，并返回一个新的vnode
 * render：渲染vnode
 */

let foo = <div id="foo">Hello</div>

let container = document.querySelector('#container')

render(container, foo)


let bar = <div id="bar">Vdom</div>

let node = diff(foo, bar)

render(container, node)

