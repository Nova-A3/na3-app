import {
  FileOutlined,
  HomeOutlined,
  SettingOutlined,
  StarOutlined,
  TagsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import type { LiteralUnion } from "type-fest";

import type { Na3DepartmentId, Na3DepartmentType } from "../modules/na3-types";
import {
  AuthPage,
  AuthSuperPage,
  DocsHomePage,
  DocTransfHomePage,
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
  Record<LiteralUnion<Path, string>, AppRoute>
>;

export const ROUTES: AppRouteMap<
  | "/"
  | "/docs"
  | "/docs/comex"
  | "/docs/modelos"
  | "/docs/transferencia"
  | "/docs/transferencia/nova"
  | "/entrar"
  | "/entrar/super"
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
  | "/manutencao/predprev"
  | "/manutencao/predprev/nova-predprev"
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
    component: <DocsHomePage />,
    icon: <FileOutlined />,
    siderConfig: {
      children: [
        { path: "/docs/transferencia", title: "Transferência" },
        { path: "/docs/comex", title: "Comércio Exterior" },
        { path: "/docs/modelos", title: "Modelos" },
      ],
    },
    title: "Documentos",
  },
  "/docs/comex": {
    component: null,
    title: "Comércio Exterior",
  },
  "/docs/modelos": {
    component: null,
    title: "Modelos",
  },
  "/docs/transferencia": {
    component: <DocTransfHomePage />,
    title: "Transferência",
  },
  "/docs/transferencia/nova": {
    component: null,
    title: "Nova Transferência",
  },

  "/entrar": {
    component: <AuthPage authorized="all" redirectUrl="/" />,
    icon: <UserOutlined />,
    title: "Entrar",
  },
  "/entrar/super": {
    component: <AuthSuperPage />,
    icon: <StarOutlined />,
    title: "Super",
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
        { path: "/manutencao/predprev", title: "Pred/Prev/Lub" },
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
    authorized: ["shop-floor", "manutencao"],
    component: <MaintServiceOrdersHomePage />,
    title: "Ordens de Serviço",
  },
  "/manutencao/os/abrir-os": {
    authorized: ["shop-floor"],
    component: <MaintServiceOrdersCreatePage />,
    title: "Abrir OS",
  },
  "/manutencao/predprev": {
    authorized: ["manutencao"],
    component: <MaintProjectsHomePage isPredPrev={true} />,
    title: "Pred/Prev",
  },
  "/manutencao/predprev/nova-predprev": {
    authorized: ["manutencao"],
    component: <MaintProjectsCreatePage isPredPrev={true} />,
    title: "Nova Pred/Prev",
  },
  "/manutencao/projetos": {
    authorized: ["manutencao"],
    component: <MaintProjectsHomePage isPredPrev={false} />,
    title: "Projetos",
  },
  "/manutencao/projetos/novo-projeto": {
    authorized: ["manutencao"],
    component: <MaintProjectsCreatePage isPredPrev={false} />,
    title: "Novo Projeto",
  },
};
