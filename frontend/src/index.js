import Error404Screen from './screens/Error404Screen'
import ProductScreen from './screens/ProductScreen'
import HomeScreen from './screens/HomeScreen'
import { parseRequestUrl } from './utils'

const routes = {
    '/': HomeScreen,
    '/product/:id': ProductScreen,
}
const router = async () => {
    const request = parseRequestUrl()
    const parseUrl =
        (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? `/${request.verb}` : '')

    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen
    const main = document.getElementById('main-container')
    main.innerHTML = await screen.render()
    console.log(parseUrl)
    // main.innerHTML = HomeScreen.render();
}

window.addEventListener('load', router)
window.addEventListener('hashchange', router)
console.log(document.location)
