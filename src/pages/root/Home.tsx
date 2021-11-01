import { Divider, Typography } from "antd";
import React from "react";

export function HomePage(): JSX.Element {
  return (
    <>
      <Typography.Title level={3}>Nova A3 Web</Typography.Title>

      <Divider />

      <Typography.Paragraph italic={true}>
        Comece selecionando uma aba no menu à esquerda.
      </Typography.Paragraph>
    </>
  );
}
