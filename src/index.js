import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/main.css';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/Auth';
import userReducer from './store/reducers/User';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;


const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
})

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)) //리덕스에 미들웨어 사용시
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
