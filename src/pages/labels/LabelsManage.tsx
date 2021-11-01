import { green } from "@ant-design/colors";
import React from "react";
import { IoPricetags } from "react-icons/io5";

import type { StaticListItemProps } from "../../components";
import { MenuPage } from "../../components";

export function LabelsManagePage(): JSX.Element {
  return (
    <MenuPage
      description="Selecione um grupo de modelos para gerenciar."
      items={labelTemplateGroups}
      title="Gerenciar modelos"
    />
  );
}

const labelTemplateGroups: StaticListItemProps[] = [
  {
    color: green[2],
    description: "Gerenciar modelos das etiquetas de transferência",
    href: "/etiquetas/gerenciar/transferencia",
    icon: <IoPricetags />,
    title: "Transferência",
  },
];
