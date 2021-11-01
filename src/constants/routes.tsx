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
} from "../pages";

export type RoutePath = `/${Lowercase<string>}`;

export type SiderConfig = {
  title?: Capitalize<string>;
  children?: SiderChild[];
};

type SiderChild = {
  path: `${RoutePath}${RoutePath}`;
  title: Capitalize<string>;
};

export type AppRoute = {
  title: string | null;
  component: React.ReactNode;
  icon?: React.ReactNode;
  authorized?: (Na3DepartmentId | Na3DepartmentType)[];
  notExact?: boolean;
  siderConfig?: SiderConfig;
};

type AppRouteMap = {
  [Path in RoutePath]: AppRoute;
};

export const ROUTES: AppRouteMap = {
  "/": {
    component: <HomePage />,
    icon: <HomeOutlined />,
    siderConfig: { title: "Início" },
    title: null,
  },

  "/docs": {
    component: <HomePage />,
    icon: <FileOutlined />,
    siderConfig: {
      children: [
        { path: "/docs/comex", title: "Comércio Exterior" },
        { path: "/docs/transferencia", title: "Transferência" },
      ],
    },
    title: "Documentos",
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
    component: <HomePage />,
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
};
