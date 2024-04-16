import ProductScreen from "./screens/ProductScreen.js";
import { HomeScreen } from "./screens/homeScreen.js";
import { parseRequestUrl } from "./utils.js";
const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
};
const router = () => {
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : `/`) +
    (request.id ? `/:id` : "") +
    (request.verb ? `/${request.verb}` : "");
  const main = document.getElementById("main-container");
  main.innerHTML = HomeScreen.render();
  // main.innerHTML = Something.show();
};
window.addEventListener("load", router);
console.log(HomeScreen);
