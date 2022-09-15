import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import { Provider } from 'react-redux';
// import { store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { store,  persistor } from './store';


const loader = document.querySelector("#preloader");

// if you want to show the loader when React loads data again
const showLoader = () => loader.classList.remove("loader--hide");

const hideLoader = () => loader.classList.add("loader--hide");

setTimeout(
  () =>
    // the show/hide functions are passed as props
    ReactDOM.render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
        <App hideLoader={hideLoader} showLoader={showLoader} />
        </PersistGate>
      </Provider>,
      document.getElementById("root")
    ),
  1700
);
// ReactDOM.render(
//   // <React.StrictMode>
//     <Provider store={store}>
//         <App />
//     </Provider>,
//   // </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
