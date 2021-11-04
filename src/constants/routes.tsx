import {
  FileOutlined,
  HomeOutlined,
  SettingOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import React from "react";

import type { Na3DepartmentId, Na3DepartmentType } from "../modules/na3-types";
import {
  HomePage,
  LabelsHomePage,
  LabelsManagePage,
  LabelsPrintPage,
  LabelsTransfCreateTemplatePage,
  LabelsTransfManagePage,
  LabelsTransfPrintPage,
  MaintenanceHomePage,
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

type AppRouteMap = Record<string, AppRoute>;

export const ROUTES: AppRouteMap = {
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
    component: null,
    title: "Dashboard",
  },
  "/manutencao/os": {
    component: null,
    title: "Ordens de Serviço",
  },
  "/manutencao/projetos": {
    component: null,
    title: "Projetos",
  },
};
