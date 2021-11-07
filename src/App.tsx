import { Layout } from "antd";
import React from "react";
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
import { useAppReady } from "./modules/na3-react";

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark.theme.css`,
  light: `${process.env.PUBLIC_URL}/light.theme.css`,
};

function Main(): JSX.Element | null {
  const appIsReady = useAppReady();

  const { status: themeStatus } = useThemeSwitcher();

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
          <Spinner text={null} />
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
