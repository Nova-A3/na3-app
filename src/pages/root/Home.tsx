import { blue, green, red } from "@ant-design/colors";
import { Col, Divider, Row } from "antd";
import { nanoid } from "nanoid";
import React from "react";
import {
  IoDocumentTextOutline,
  IoPricetagsOutline,
  IoSettingsOutline,
} from "react-icons/io5";

import { HomeLogo, PageDescription, StaticListItem } from "../../components";
import { useNa3Auth } from "../../modules/na3-react";
import classes from "./Home.module.css";

export function HomePage(): JSX.Element {
  const { department } = useNa3Auth();

  return (
    <>
      {department && (
        <>
          <HomeLogo className={classes.Logo} />

          <div>
            <Divider className={classes.LogoDivider} />
          </div>
        </>
      )}

      <PageDescription className={classes.HomeDescription}>
        Comece selecionando uma aba no menu à esquerda
      </PageDescription>

      <div>
        <Divider className={classes.QuickLinksDivider} orientation="center">
          <em>ou</em>
        </Divider>
      </div>

      <Row gutter={[12, 8]}>
        {quickLinks.map(({ title, icon, colors, description, href }) => (
          <Col key={nanoid()} md={8} xs={24}>
            <StaticListItem
              cardClassName={classes.HomeQuickLink}
              colors={colors}
              description={description}
              href={href}
              icon={icon}
              title={title}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}

const quickLinks = [
  {
    colors: { background: red[2], foreground: red[8] },
    description:
      "Gerencie ou abra ordens de serviço para o setor de Manutenção",
    href: "/manutencao",
    icon: <IoSettingsOutline />,
    title: "Manutenção",
  },
  {
    colors: { background: green[2], foreground: green[8] },
    description: "Imprima etiquetas a partir de modelos pré-definidos pelo PCP",
    href: "/etiquetas",
    icon: <IoPricetagsOutline />,
    title: "Etiquetas",
  },
  {
    colors: { background: blue[2], foreground: blue[8] },
    description:
      "Emita documentos diversos, como o de Transferência de Materiais",
    href: "/docs",
    icon: <IoDocumentTextOutline />,
    title: "Documentos",
  },
];
