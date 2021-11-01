import { red } from "@ant-design/colors";
import React from "react";
import { IoPricetags } from "react-icons/io5";

import type { StaticListItemProps } from "../../components";
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

const labelTemplateGroups: StaticListItemProps[] = [
  {
    color: red[2],
    description: "Imprimir etiquetas de transferência",
    href: "/etiquetas/imprimir/transferencia",
    icon: <IoPricetags />,
    title: "Transferência",
  },
];
