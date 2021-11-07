import React from "react";

import logoLight from "../../../assets/novaa3Logo.svg";
import logoDark from "../../../assets/novaa3LogoDark.svg";
import { useTheme } from "../../../hooks";
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
  const [theme] = useTheme();

  return (
    <img
      alt="Logotipo Nova A3"
      className={`${
        hasNoMarginTop ? "" : classes.HomeLogo
      } animate__animated animate__fadeIn`}
      height={height || 32}
      src={theme === "light" ? logoDark : logoLight}
    />
  );
}

HomeLogo.defaultProps = defaultProps;
