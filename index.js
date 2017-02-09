import {h, diff} from './src/index'


let foo = <div id="foo">Hello</div>

let container = document.querySelector('#container')

diff(container, foo)


let bar = <div id="bar">Vdom</div>

diff(foo, bar)

