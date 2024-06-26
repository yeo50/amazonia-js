/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */

import axios from 'axios';
import Rating from '../components/Rating';
import { hideLoading, parseRequestUrl, showLoading } from '../utils';
import { getProducts } from '../api';

const HomeScreen = {
    render: async () => {
        showLoading();
        // const response = await axios({
        //     url: 'http://localhost:5000/api/products?',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // });
        const { value } = parseRequestUrl();
        const products = await getProducts({ searchKeyword: value });

        // if (!response || response.statusText !== 'OK') {
        //     return '<div>Error in getting data </div>';
        // }

        hideLoading();

        return `
       <ul class="products">
    ${products
        .map((product) => {
            return `
      <li>
           <div class="product">
                <a href="#/product/${product._id}">
                  <img src="${product.image}" alt="${product.name}" />
                 
                </a>
                <div class="product-name">
                  <a href="#/product/${product._id}"> ${product.name} </a>
                </div>
                <div class="product-rating">
                   ${Rating.render({
                       value: product.rating,
                       text: `${product.numReviews} reviews`,
                   })}
                </div>
                <div class="product-brand">${product.brand}</div>
                <div class="product-price">$${product.price}</div>
              </div>
      </li>`;
        })
        .join('\n')}
      </ul>`;
    },
};
export default HomeScreen;
