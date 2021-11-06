import "animate.css";
import "./index.css";

import { ConfigProvider as AntdConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import firebase from "firebase";
import React from "react";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import { BreadcrumbProvider } from "./contexts";
import { Na3Provider } from "./modules/na3-react";
import reportWebVitals from "./reportWebVitals";

dayjs.extend(utc);
dayjs.extend(timezone);

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark.theme.css`,
  light: `${process.env.PUBLIC_URL}/light.theme.css`,
};

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
      <Na3Provider>
        <BrowserRouter>
          <BreadcrumbProvider>
            <ThemeSwitcherProvider
              defaultTheme="light"
              insertionPoint={document.getElementById("styles-insertion-point")}
              themeMap={themes}
            >
              <App />
            </ThemeSwitcherProvider>
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
