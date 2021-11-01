import { Layout } from "antd";
import React from "react";
import classes from "./App.module.css";
import { Content, Footer, Header, Helmet, Sider, Spinner } from "./components";
import { RouteHandler } from "./components/pages/RouteHandler";
import { useAppReady } from "./modules/na3-react";

export function App(): JSX.Element {
  const appIsReady = useAppReady();

  return (
    <>
      <Helmet />
      <Spinner spinning={!appIsReady}>
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
      </Spinner>
    </>
  );
}
