import {
  FileOutlined,
  HomeOutlined,
  SettingOutlined,
  TagsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";

import type { Na3DepartmentId, Na3DepartmentType } from "../modules/na3-types";
import {
  AuthPage,
  HomePage,
  LabelsHomePage,
  LabelsManagePage,
  LabelsPrintPage,
  LabelsTransfCreateTemplatePage,
  LabelsTransfManagePage,
  LabelsTransfPrintPage,
  MaintDashboardHomePage,
  MaintenanceHomePage,
  MaintProjectsCreatePage,
  MaintProjectsHomePage,
  MaintServiceOrdersCreatePage,
  MaintServiceOrdersHomePage,
} from "../pages";

export type SiderConfig = {
  children?: SiderChild[];
  title?: string;
};

type SiderChild = {
  path: string;
  title: string;
};

export type AppRoute = {
  authorized?: (Na3DepartmentId | Na3DepartmentType)[];
  component: React.ReactNode | null;
  icon?: React.ReactNode;
  notExact?: boolean;
  siderConfig?: SiderConfig;
  title: string | null;
};

type AppRouteMap<Path extends string> = Readonly<
  Record<Path | string, AppRoute>
>;

export const ROUTES: AppRouteMap<
  | "/"
  | "/docs"
  | "/docs/comex"
  | "/docs/transferencia"
  | "/entrar"
  | "/etiquetas"
  | "/etiquetas/gerenciar"
  | "/etiquetas/gerenciar/transferencia"
  | "/etiquetas/gerenciar/transferencia/criar-modelo"
  | "/etiquetas/imprimir"
  | "/etiquetas/imprimir/transferencia"
  | "/manutencao"
  | "/manutencao/dashboard"
  | "/manutencao/os"
  | "/manutencao/os/abrir-os"
  | "/manutencao/projetos"
  | "/manutencao/projetos/novo-projeto"
> = {
  "/": {
    component: <HomePage />,
    icon: <HomeOutlined />,
    siderConfig: { title: "Início" },
    title: null,
  },

  "/docs": {
    component: null,
    icon: <FileOutlined />,
    siderConfig: {
      children: [
        { path: "/docs/comex", title: "Comércio Exterior" },
        { path: "/docs/transferencia", title: "Transferência" },
      ],
    },
    title: "Documentos",
  },

  "/docs/comex": {
    component: null,
    title: "Comércio Exterior",
  },
  "/docs/transferencia": {
    component: null,
    title: "Transferência",
  },

  "/entrar": {
    component: <AuthPage authorized="all" redirectUrl="/" />,
    icon: <UserOutlined />,
    title: "Entrar",
  },

  "/etiquetas": {
    component: <LabelsHomePage />,
    icon: <TagsOutlined />,
    siderConfig: {
      children: [
        { path: "/etiquetas/imprimir", title: "Imprimir" },
        { path: "/etiquetas/gerenciar", title: "Gerenciar" },
      ],
    },
    title: "Etiquetas",
  },
  "/etiquetas/gerenciar": {
    authorized: ["pcp"],
    component: <LabelsManagePage />,
    title: "Gerenciar",
  },
  "/etiquetas/gerenciar/transferencia": {
    authorized: ["pcp"],
    component: <LabelsTransfManagePage />,
    title: "Transferência",
  },
  "/etiquetas/gerenciar/transferencia/criar-modelo": {
    authorized: ["pcp"],
    component: <LabelsTransfCreateTemplatePage />,
    title: "Novo modelo",
  },
  "/etiquetas/imprimir": {
    authorized: ["shop-floor"],
    component: <LabelsPrintPage />,
    title: "Imprimir",
  },
  "/etiquetas/imprimir/transferencia": {
    authorized: ["shop-floor"],
    component: <LabelsTransfPrintPage />,
    title: "Transferência",
  },

  "/manutencao": {
    component: <MaintenanceHomePage />,
    icon: <SettingOutlined />,
    siderConfig: {
      children: [
        { path: "/manutencao/os", title: "Ordens de Serviço" },
        { path: "/manutencao/dashboard", title: "Dashboard" },
        { path: "/manutencao/projetos", title: "Projetos" },
      ],
    },
    title: "Manutenção",
  },
  "/manutencao/dashboard": {
    authorized: ["manutencao"],
    component: <MaintDashboardHomePage />,
    title: "Dashboard",
  },
  "/manutencao/os": {
    authorized: ["shop-floor"],
    component: <MaintServiceOrdersHomePage />,
    title: "Ordens de Serviço",
  },
  "/manutencao/os/abrir-os": {
    authorized: ["shop-floor"],
    component: <MaintServiceOrdersCreatePage />,
    title: "Abrir OS",
  },
  "/manutencao/projetos": {
    authorized: ["manutencao"],
    component: <MaintProjectsHomePage />,
    title: "Projetos",
  },
  "/manutencao/projetos/novo-projeto": {
    authorized: ["manutencao"],
    component: <MaintProjectsCreatePage />,
    title: "Novo Projeto",
  },
};
