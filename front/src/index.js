import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.scss";
import App from "./components/app/App.jsx";
import { Provider } from "react-redux";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";

import thunk from "redux-thunk";

import reducers from "./redux/reducers";

import sizeMiddleware from "./redux/middlewares/size-middleware";

const middlewares = applyMiddleware(thunk, sizeMiddleware);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(middlewares));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
