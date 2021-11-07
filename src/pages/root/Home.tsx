import { blue, green, red } from "@ant-design/colors";
import { FileOutlined, SettingOutlined, TagsOutlined } from "@ant-design/icons";
import { Col, Divider, Row } from "antd";
import { nanoid } from "nanoid";
import React from "react";

import { HomeLogo, PageDescription, StaticListItem } from "../../components";
import { useNa3Auth } from "../../modules/na3-react";
import classes from "./Home.module.css";

export function HomePage(): JSX.Element {
  const { department } = useNa3Auth();

  return (
    <>
      {department && (
        <>
          <HomeLogo />

          <div>
            <Divider />
          </div>
        </>
      )}

      <PageDescription className={classes.HomeDescription}>
        Comece selecionando uma aba no menu à esquerda.
      </PageDescription>

      <div>
        <Divider orientation="center">
          <em>ou</em>
        </Divider>
      </div>

      <Row gutter={12}>
        {quickLinks.map(({ title, icon, color, description, href }) => (
          <Col key={nanoid()} md={8} xs={24}>
            <StaticListItem
              cardClassName={classes.HomeQuickLink}
              color={color}
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
    color: red[2],
    description: "Gerencie ou abra uma nova Ordem de Serviço para a Manutenção",
    href: "/manutencao/os",
    icon: <SettingOutlined />,
    title: "Ordens de Serviço",
  },
  {
    color: blue[2],
    description:
      "Imprima etiquetas de Transferência a partir dos modelos disponíveis",
    href: "/etiquetas/imprimir",
    icon: <TagsOutlined />,
    title: "Etiquetas",
  },
  {
    color: green[2],
    description:
      "Emita documentos diversos, como o de Transferência de Materiais",
    href: "/docs",
    icon: <FileOutlined />,
    title: "Documentos",
  },
];
