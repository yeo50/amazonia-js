import Error404Screen from './screens/Error404Screen';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import { hideLoading, parseRequestUrl, showLoading } from './utils';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import Header from './components/Header';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

const routes = {
    '/': HomeScreen,
    '/product/:id': ProductScreen,
    '/product/:id/edit': ProductEditScreen,
    '/cart/:id': CartScreen,
    '/cart': CartScreen,
    '/signin': SigninScreen,
    '/register': RegisterScreen,
    '/profile': ProfileScreen,
    '/shipping': ShippingScreen,
    '/payment': PaymentScreen,
    '/placeorder': PlaceOrderScreen,
    '/orders/:id': OrderScreen,
    '/dashboard': DashboardScreen,
    '/productlist': ProductListScreen,
    '/orderlist': OrderListScreen,
};
const router = async () => {
    showLoading();
    const request = parseRequestUrl();
    const parseUrl =
        (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') +
        (request.action ? `/${request.action}` : '');

    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
    const header = document.getElementById('header-container');
    header.innerHTML = await Header.render();
    await Header.after_render();
    const main = document.getElementById('main-container');
    main.innerHTML = await screen.render();
    if (screen.after_render) {
        await screen.after_render();
    }
    hideLoading();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
console.log(document.location);
