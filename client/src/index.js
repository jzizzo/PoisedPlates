import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { composeWithDevTools } from 'redux-devtools-extension';

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

const store = createStoreWithMiddleware(reducers,
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );


ReactDOM.render(
  <Provider store={store}>
    <div>
      <BrowserRouter>
        <MuiThemeProvider>
          <div>
            <Nav />
            <Switch>
              <Route path="/post/new" component={SubmitProduct} />
              <Route path="/auction/:id" component={ProductPage} />
              <Route path="/" component={BrowseProducts} />
            </Switch>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    </div>
  </Provider>
  , document.getElementById('root'));


