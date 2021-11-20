import { Layout, message, notification } from "antd";
import React, { useEffect, useRef } from "react";
import {
  ThemeSwitcherProvider,
  useThemeSwitcher,
} from "react-css-theme-switcher";
import Div100vh from "react-div-100vh";
import useLocalStorage from "react-use-localstorage";

import classes from "./App.module.css";
import {
  Content,
  Footer,
  Header,
  Helmet,
  RouteHandler,
  Sider,
  Spinner,
} from "./components";
import { useA2HS } from "./hooks";
import { useAppReady } from "./modules/na3-react";

const themes = {
  dark: `${process.env.PUBLIC_URL}/theme/dark.theme.css`,
  light: `${process.env.PUBLIC_URL}/theme/light.theme.css`,
};

notification.config({ duration: 6 });

function Main(): JSX.Element {
  const appIsReady = useAppReady();
  const { status: themeStatus } = useThemeSwitcher();

  const connectionStatus = useRef<"offline" | "online">("online");

  const [hasA2HS, promptA2HS] = useA2HS();

  useEffect(() => {
    function handleIsOnline(): void {
      if (connectionStatus.current === "offline") {
        void message.success("Você está online");
        message.destroy("offlineMsg");
        connectionStatus.current = "online";
      }
    }
    function handleIsOffline(): void {
      if (connectionStatus.current === "online") {
        void message.warn({
          content: "Você está offline",
          duration: 0,
          key: "offlineMsg",
        });
        connectionStatus.current = "offline";
      }
    }

    window.addEventListener("online", handleIsOnline);
    window.addEventListener("offline", handleIsOffline);

    return (): void => {
      window.removeEventListener("online", handleIsOnline);
      window.removeEventListener("offline", handleIsOffline);
    };
  }, []);

  useEffect(() => {
    void promptA2HS();
  }, [promptA2HS]);

  console.log(hasA2HS);

  return (
    <>
      <Helmet />

      <Spinner spinning={!appIsReady}>
        <Div100vh>
          <Layout className={classes.App}>
            <Sider />
            <Layout>
              <Header />
              <Content>
                <RouteHandler />
              </Content>
              <Footer />
            </Layout>
          </Layout>
        </Div100vh>
      </Spinner>

      {themeStatus === "loading" && (
        <div className={classes.ThemeLoadingModal}>
          <Spinner color="#fff" text={null} />
        </div>
      )}
    </>
  );
}

export function App(): JSX.Element {
  const [storedTheme] = useLocalStorage("NA3_APP_PREFERRED_THEME", "light");

  return (
    <ThemeSwitcherProvider
      defaultTheme={storedTheme}
      insertionPoint={document.getElementById("styles-insertion-point")}
      themeMap={themes}
    >
      <Main />
    </ThemeSwitcherProvider>
  );
}
