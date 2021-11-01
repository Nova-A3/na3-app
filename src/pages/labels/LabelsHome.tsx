import { green, red } from "@ant-design/colors";
import React from "react";
import { IoPricetags, IoPricetagsOutline } from "react-icons/io5";

import type { StaticListItemProps } from "../../components";
import { MenuPage } from "../../components";

export function LabelsHomePage(): JSX.Element {
  return (
    <MenuPage
      icon={<IoPricetagsOutline />}
      items={labelsPageActions}
      title="Etiquetas"
    />
  );
}

const labelsPageActions: StaticListItemProps[] = [
  {
    color: red[2],
    description: "Imprimir etiquetas a partir dos modelos pré-definidos",
    href: "/etiquetas/imprimir",
    icon: <IoPricetags />,
    title: "Imprimir etiquetas",
  },
  {
    color: green[2],
    description: "Gerenciar/criar modelos de etiqueta",
    href: "/etiquetas/gerenciar",
    icon: <IoPricetags />,
    title: "Gerenciar modelos",
  },
];
