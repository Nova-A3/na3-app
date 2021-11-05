import React from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";

import logoLight from "../../../assets/novaa3Logo.svg";
import logoDark from "../../../assets/novaa3LogoDark.svg";
import classes from "./HomeLogo.module.css";

export function HomeLogo(): JSX.Element {
  const { currentTheme } = useThemeSwitcher();

  return (
    <img
      alt="Logotipo Nova A3"
      className={`${classes.HomeLogo} animate__animated animate__fadeIn`}
      height={32}
      src={currentTheme === "light" ? logoDark : logoLight}
    />
  );
}
