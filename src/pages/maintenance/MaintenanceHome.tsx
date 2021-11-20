import { blue, geekblue, green, red } from "@ant-design/colors";
import { SettingOutlined } from "@ant-design/icons";
import React from "react";
import {
  IoGitBranchOutline,
  IoGitNetworkOutline,
  IoSettingsOutline,
  IoSpeedometerOutline,
} from "react-icons/io5";

import { MenuPage } from "../../components";
import type { MenuPageAction } from "../../types";

export function MaintenanceHomePage(): JSX.Element {
  return (
    <MenuPage
      icon={<SettingOutlined />}
      items={maintenancePageActions}
      title="Manutenção"
    />
  );
}

const maintenancePageActions: MenuPageAction[] = [
  {
    colors: { background: red[2], foreground: red[8] },
    description: "Gerenciar/criar ordens de serviço do setor",
    href: "/manutencao/os",
    icon: <IoSettingsOutline />,
    title: "Ordens de serviço",
  },
  {
    colors: { background: green[2], foreground: green[8] },
    description: "Acessar o dashboard de ordens de serviço",
    href: "/manutencao/dashboard",
    icon: <IoSpeedometerOutline />,
    title: "Dashboard",
  },
  {
    colors: { background: blue[2], foreground: blue[8] },
    description: "Gerenciar os projetos de manutenção",
    href: "/manutencao/projetos",
    icon: <IoGitNetworkOutline />,
    title: "Projetos de manutenção",
  },
  {
    colors: { background: geekblue[2], foreground: geekblue[8] },
    description:
      "Gerenciar os projetos de preditiva/preventiva e lubrificação da Manutenção",
    href: "/manutencao/predprev",
    icon: <IoGitBranchOutline />,
    title: "Preditiva/Preventiva/Lubrificação",
  },
];
