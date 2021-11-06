import React from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";

import logoLight from "../../../assets/novaa3Logo.svg";
import logoDark from "../../../assets/novaa3LogoDark.svg";
import classes from "./HomeLogo.module.css";

type HomeLogoProps = {
  hasNoMarginTop?: boolean;
  height?: number;
};

const defaultProps: Required<HomeLogoProps> = {
  hasNoMarginTop: false,
  height: 32,
};

export function HomeLogo({
  height,
  hasNoMarginTop,
}: HomeLogoProps): JSX.Element {
  const { currentTheme } = useThemeSwitcher();

  return (
    <img
      alt="Logotipo Nova A3"
      className={`${
        hasNoMarginTop ? "" : classes.HomeLogo
      } animate__animated animate__fadeIn`}
      height={height || 32}
      src={currentTheme === "light" ? logoDark : logoLight}
    />
  );
}

HomeLogo.defaultProps = defaultProps;
