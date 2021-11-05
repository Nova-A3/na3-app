import React from "react";

import logo from "../../../assets/novaa3LogoDark.svg";
import classes from "./HomeLogo.module.css";

export function HomeLogo(): JSX.Element {
  return (
    <img
      alt="Logotipo Nova A3"
      className={`${classes.HomeLogo} animate__animated animate__fadeIn`}
      height={32}
      src={logo}
    />
  );
}
