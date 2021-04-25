import React from 'react';
import './index.css'
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import combineReducers from "./redux/reducers/rootReducer";
import thunk from "redux-thunk";

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const store = createStore(combineReducers, composeEnhancers(
    applyMiddleware(thunk)
))

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
)


ReactDOM.render(
    app,
  document.getElementById('root')
);
