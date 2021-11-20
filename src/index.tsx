import "animate.css";
import "./index.css";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { ConfigProvider as AntdConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import firebase from "firebase";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import { APP_VERSION } from "./constants";
import { BreadcrumbProvider } from "./contexts";
import { Na3Provider } from "./modules/na3-react";
// import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

Sentry.init({
  dsn: "https://c384ca31afea4def96034257d183c365@o1073983.ingest.sentry.io/6073606",
  integrations: [new Integrations.BrowserTracing()],

  tracesSampleRate: 1.0,
});

dayjs.extend(dayOfYear);
dayjs.extend(utc);
dayjs.extend(timezone);

firebase.initializeApp({
  apiKey: "AIzaSyAynKF5joA-_wpax9jzatonSZgxSE-MaRQ",
  appId: "1:810900069450:web:0f69447751bb45cac59ab3",
  authDomain: "nova-a3-ind.firebaseapp.com",
  measurementId: "G-PXKR7KDTEP",
  messagingSenderId: "810900069450",
  projectId: "nova-a3-ind",
  storageBucket: "nova-a3-ind.appspot.com",
});

firebase.performance();

function Root(): JSX.Element {
  return (
    <AntdConfigProvider input={{ autoComplete: "off" }} locale={ptBR}>
      <Na3Provider appVersion={APP_VERSION}>
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

// https://cra.link/PWA
serviceWorkerRegistration.register();

// https://bit.ly/CRA-vitals
// reportWebVitals();
