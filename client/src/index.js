import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import Nav from './components/nav';
import BrowseProducts from './containers/browse_products';
import ProductPage from './containers/product_page';
import SubmitProduct from './containers/submit_product';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./dist/service-worker.js')
  .then(registration => console.log('Service worker registered.'))
  .catch(error => console.error('Error during service worker registration:', error));
} else {
  console.log('Service worker is not supported.');
}

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div>
      <BrowserRouter>
        <div>
          <Nav />
          <Switch>
            <Route path="/post/new" component={SubmitProduct} />
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/" component={BrowseProducts} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  </Provider>
  , document.getElementById('root'));


