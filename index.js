import {h, render} from './src/index'


let foo = <div id="foo">Hello</div>

let el = render(foo)

document.body.appendChild(el)


