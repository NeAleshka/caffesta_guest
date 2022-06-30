import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, HashRouter} from "react-router-dom";
import {Provider} from'react-redux'
import store from "./store";

//HashRouter для продакшена меняем на BrowserRouter,HashRouter для gp
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <HashRouter>
          <Provider store={store}>
              <App/>
          </Provider>
      </HashRouter>
);


