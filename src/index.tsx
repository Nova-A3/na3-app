import "animate.css";
import "antd/dist/antd.css";
import "./index.css";

import { ConfigProvider as AntdConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import firebase from "firebase";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import { BreadcrumbProvider } from "./contexts";
import { Na3Provider } from "./modules/na3-react";
import reportWebVitals from "./reportWebVitals";

firebase.initializeApp({
  apiKey: "AIzaSyAynKF5joA-_wpax9jzatonSZgxSE-MaRQ",
  appId: "1:810900069450:web:0f69447751bb45cac59ab3",
  authDomain: "nova-a3-ind.firebaseapp.com",
  measurementId: "G-PXKR7KDTEP",
  messagingSenderId: "810900069450",
  projectId: "nova-a3-ind",
  storageBucket: "nova-a3-ind.appspot.com",
});

function Root(): JSX.Element {
  return (
    <AntdConfigProvider input={{ autoComplete: undefined }} locale={ptBR}>
      <Na3Provider env="production">
        <BrowserRouter>
          <BreadcrumbProvider>
            <App />
          </BreadcrumbProvider>
        </BrowserRouter>
      </Na3Provider>
    </AntdConfigProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.querySelector("#root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
