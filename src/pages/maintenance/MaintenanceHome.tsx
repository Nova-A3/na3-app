import { blue, green, red } from "@ant-design/colors";
import React from "react";
import {
  IoGitNetworkOutline,
  IoSettingsOutline,
  IoSpeedometerOutline,
} from "react-icons/io5";

import type { StaticListItemProps } from "../../components";
import { MenuPage } from "../../components";

export function MaintenanceHomePage(): JSX.Element {
  return (
    <MenuPage
      icon={<IoSettingsOutline />}
      items={maintenancePageActions}
      title="Manutenção"
    />
  );
}

const maintenancePageActions: StaticListItemProps[] = [
  {
    color: red[2],
    description: "Gerenciar/criar ordens de serviço do setor",
    href: "/manutencao/os",
    icon: <IoSettingsOutline />,
    title: "Ordens de serviço",
  },
  {
    color: green[2],
    description: "Acessar o dashboard de ordens de serviço",
    href: "/manutencao/dashboard",
    icon: <IoSpeedometerOutline />,
    title: "Dashboard",
  },
  {
    color: blue[2],
    description: "Gerenciar os projetos de manutenção",
    href: "/manutencao/projetos",
    icon: <IoGitNetworkOutline />,
    title: "Projetos de manutenção",
  },
];
