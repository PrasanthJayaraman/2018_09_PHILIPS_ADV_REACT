import React, { Component } from 'react';
import axios from 'axios';

import AppHeader from './AppHeader';

import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../redux/reducers/rootReducer';
import { Provider } from 'react-redux'; // react-redux bindings
import { composeWithDevTools } from 'redux-devtools-extension';
// import logAction from '../middlewares/logAction';
import thunk from 'redux-thunk';

import { HashRouter as Router, Route } from 'react-router-dom';

// import ProductCatalog from './ProductCatalog';
// import Sidebar from './Sidebar';
// import CartDetails from './CartDetails';
// import Login from './Login';
// import Register from './Register';

import Loadable from 'react-loadable';


const ProductCatalog = Loadable({
    loader: () => import('./ProductCatalog'),
    loading: () => <p className="lead">loading...</p>
});
const Sidebar = Loadable({
    loader: () => import('./Sidebar'),
    loading: () => <p className="lead">loading...</p>
});
const CartDetails = Loadable({
    loader: () => import('./CartDetails'),
    loading: () => <p className="lead">loading...</p>
});
const Login = Loadable({
    loader: () => import('./Login'),
    loading: () => <p className="lead">loading...</p>
});
const Register = Loadable({
    loader: () => import('./Register'),
    loading: () => <p className="lead">loading...</p>
});


let state = window.sessionStorage.reduxstate;
if (state) {
    state = JSON.parse(state);
}

// remove "composeWithDevTools()" in production bundle
let store = null;
if (state) {
    store = createStore(rootReducer, state,
        composeWithDevTools(applyMiddleware(thunk)));
}
else {
    store = createStore(rootReducer,
        composeWithDevTools(applyMiddleware(thunk)));
}

// the callback to subscribe is executed everytime the state changes
// in the store
store.subscribe(() => {
    window.sessionStorage['reduxstate'] = JSON.stringify(store.getState());
});

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="container">
                        <AppHeader />
                        <div className="row">
                            <div className="col-sm-3">
                                <Route path="/"
                                    component={Sidebar} />
                            </div>
                            <div className="col-sm-9">
                                {/* <ProductCatalog /> */}
                                <Route path="/" exact={true}
                                    component={ProductCatalog} />
                                <Route path="/products/:key?/:value?"
                                    component={ProductCatalog} />
                                <Route path="/view-cart"
                                    component={CartDetails} />
                                <Route path="/login"
                                    component={Login} />
                                <Route path="/register"
                                    component={Register} />
                            </div>
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}


export default App;