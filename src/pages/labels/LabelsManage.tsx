import { red } from "@ant-design/colors";
import React from "react";
import { IoPricetagsOutline } from "react-icons/io5";

import { MenuPage } from "../../components";
import type { MenuPageAction } from "../../types";

export function LabelsManagePage(): JSX.Element {
  return (
    <MenuPage
      description="Selecione um grupo de modelos de etiqueta para gerenciar."
      items={labelTemplateGroups}
      title="Gerenciar modelos"
    />
  );
}

const labelTemplateGroups: MenuPageAction[] = [
  {
    colors: { background: red[2], foreground: red[8] },
    description: "Gerenciar modelos das etiquetas de transferência",
    href: "/etiquetas/gerenciar/transferencia",
    icon: <IoPricetagsOutline />,
    title: "Transferência",
  },
];
