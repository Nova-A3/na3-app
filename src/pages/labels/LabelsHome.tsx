import { green, red } from "@ant-design/colors";
import { TagsOutlined } from "@ant-design/icons";
import React from "react";
import { IoPricetagsOutline } from "react-icons/io5";

import { MenuPage } from "../../components";
import type { MenuPageAction } from "../../types";

export function LabelsHomePage(): JSX.Element {
  return (
    <MenuPage
      icon={<TagsOutlined />}
      items={labelsPageActions}
      title="Etiquetas"
    />
  );
}

const labelsPageActions: MenuPageAction[] = [
  {
    colors: { background: red[2], foreground: red[8] },
    description: "Imprimir etiquetas a partir dos modelos pré-definidos",
    href: "/etiquetas/imprimir",
    icon: <IoPricetagsOutline />,
    title: "Imprimir etiquetas",
  },
  {
    colors: { background: green[2], foreground: green[8] },
    description: "Gerenciar/criar modelos de etiqueta",
    href: "/etiquetas/gerenciar",
    icon: <IoPricetagsOutline />,
    title: "Gerenciar modelos",
  },
];
