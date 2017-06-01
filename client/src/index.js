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

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div>
      <Nav />
      <BrowserRouter>
        <Switch>
          <Route path="/post/new" component={SubmitProduct} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/" component={BrowseProducts} />
        </Switch>
      </BrowserRouter>
    </div>
  </Provider>
  , document.getElementById('root'));


