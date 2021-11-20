import { red } from "@ant-design/colors";
import React from "react";
import { IoPricetagsOutline } from "react-icons/io5";

import { MenuPage } from "../../components";

export function LabelsPrintPage(): JSX.Element {
  return (
    <MenuPage
      description="Selecione um grupo de etiquetas para imprimir."
      items={labelTemplateGroups}
      title="Imprimir etiquetas"
    />
  );
}

const labelTemplateGroups = [
  {
    colors: { background: red[2], foreground: red[8] },
    description: "Imprimir etiquetas de transferência",
    href: "/etiquetas/imprimir/transferencia",
    icon: <IoPricetagsOutline />,
    title: "Transferência",
  },
];
