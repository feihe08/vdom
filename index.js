import {h, diff} from './src/index'

/**
 * 大致思路
 * h函数：得到自定义的vnode
 * diff：比较两个vnode的不同，并返回一个新的
 * 初始化的时候接受一个dom容器，一个vnode
 * 在diff内部处理都没的更新
 * 整体结构类似于snabbdom
 */

let foo = <div id="foo">Hello</div>

let container = document.querySelector('#container')

diff(container, foo)


let bar = <div id="bar">Vdom</div>

diff(foo, bar)



