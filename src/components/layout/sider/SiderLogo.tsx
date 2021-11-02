import React from "react";

import logo from "../../../assets/novaa3Logo.svg";
import logoIcon from "../../../assets/novaa3LogoIcon.svg";
import classes from "./SiderLogo.module.css";

type SiderLogoProps = {
  isCollapsed: boolean;
};

export function SiderLogo({ isCollapsed }: SiderLogoProps): JSX.Element {
  return (
    <div className={classes.Logo}>
      {!isCollapsed && (
        <img
          alt="Logotipo Nova A3"
          className={`animate__animated ${
            isCollapsed ? "animate__fadeOut" : "animate__fadeIn"
          }`}
          height={32}
          src={logo}
        />
      )}

      {isCollapsed && (
        <img
          alt="Logotipo Nova A3"
          className={`animate__animated ${
            isCollapsed ? "animate__fadeIn" : "animate__fadeOut"
          }`}
          height={32}
          src={logoIcon}
        />
      )}
    </div>
  );
}
