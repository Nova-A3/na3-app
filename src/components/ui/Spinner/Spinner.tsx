import { LoadingOutlined } from "@ant-design/icons";
import type { SpinProps } from "antd";
import { Spin } from "antd";
import React from "react";

import classes from "./Spinner.module.css";

type SpinnerProps = Omit<SpinProps, "tip"> & {
  children?: React.ReactNode;
  text?: string | null;
};

const defaultProps: SpinnerProps = {
  children: null,
  text: undefined,
};

export function Spinner({
  children,
  className,
  delay,
  indicator,
  prefixCls,
  size,
  spinning,
  style,
  text,
  wrapperClassName,
}: SpinnerProps): JSX.Element {
  return (
    <Spin
      className={className || classes.Spin}
      delay={delay}
      indicator={
        indicator || (
          <LoadingOutlined className={classes.Indicator} spin={true} />
        )
      }
      prefixCls={prefixCls}
      size={size}
      spinning={spinning}
      style={style}
      tip={text === null ? undefined : text || "Carregando..."}
      wrapperClassName={wrapperClassName || classes.Spin}
    >
      {children}
    </Spin>
  );
}

Spinner.defaultProps = defaultProps;
