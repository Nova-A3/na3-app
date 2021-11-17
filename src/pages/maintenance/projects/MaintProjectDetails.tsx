import { CheckOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Grid,
  Modal,
  notification,
  Row,
  Timeline,
} from "antd";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  DataInfo,
  MaintProjectActionForm,
  MaintProjectPriorityTag,
  MaintProjectStatusBadge,
  MaintProjectTimelineItem,
  Page,
  PageActionButtons,
  PageDescription,
  PageTitle,
  Result404,
} from "../../../components";
import { useBreadcrumb } from "../../../hooks";
import { useNa3MaintProjects } from "../../../modules/na3-react";
import type { Na3MaintenanceProject } from "../../../modules/na3-types";
import { createErrorNotifier } from "../../../utils";
import classes from "./MaintProjectDetails.module.css";

type PageProps = {
  projectId: string;
};

export function MaintProjectDetails({ projectId }: PageProps): JSX.Element {
  const [actionForm, setActionForm] = useState<"deliver" | "status">();

  const history = useHistory();
  const breakpoint = Grid.useBreakpoint();

  const { setExtra: setBreadcrumbExtra } = useBreadcrumb();

  const {
    helpers: {
      formatInternalId,
      getProjectStatus,
      getById: getProjectById,
      shareProjectStatus,
      deliverProject,
    },
  } = useNa3MaintProjects();

  const project = useMemo(
    () => getProjectById(projectId),
    [getProjectById, projectId]
  );

  const projectStatus = useMemo(
    () => (project ? getProjectStatus(project) : undefined),
    [getProjectStatus, project]
  );

  const handleActionFormClose = useCallback(() => {
    setActionForm(undefined);
  }, []);

  const handleProjectDeliver = useCallback(
    (
      project: Na3MaintenanceProject,
      actionPayload: { author: string; message: string | null }
    ) => {
      const confirmModal = Modal.confirm({
        content: (
          <>
            Confirma a entrega do projeto {formatInternalId(project.internalId)}{" "}
            — <em>{project.title}</em>?
          </>
        ),
        okText: "Confirmar entrega",
        onOk: async () => {
          const notifyError = createErrorNotifier("Erro ao entregar o projeto");

          confirmModal.update({ okText: "Entregando projeto..." });

          const operationRes = await deliverProject(project.id, {
            author: actionPayload.author,
            message: actionPayload.message,
          });

          if (operationRes.error) {
            notifyError(operationRes.error.message);
          } else {
            notification.success({
              description: (
                <>
                  Projeto {formatInternalId(project.internalId)}{" "}
                  <em>({project.title.trim()})</em> entregue com sucesso!
                </>
              ),
              message: "Projeto entregue",
            });
            setActionForm(undefined);
            history.push("/manutencao/projetos");
          }
        },
        title: "Entregar projeto?",
      });
    },
    [formatInternalId, deliverProject, history]
  );

  const handleProjectShareStatus = useCallback(
    (
      project: Na3MaintenanceProject,
      actionPayload: { author: string; message: string | null }
    ) => {
      const confirmModal = Modal.confirm({
        content: (
          <>
            Confirma o seguinte status para o projeto{" "}
            {formatInternalId(project.internalId)}:{" "}
            <em>{actionPayload.message}</em>?
          </>
        ),
        okText: "Confirmar status",
        onOk: async () => {
          const notifyError = createErrorNotifier("Erro ao informar status");

          confirmModal.update({ okText: "Enviando status..." });

          if (!actionPayload.message) {
            notifyError("Nenhum status encontrado para informar.");
            return;
          }

          const operationRes = await shareProjectStatus(project.id, {
            author: actionPayload.author,
            message: actionPayload.message,
          });

          if (operationRes.error) {
            notifyError(operationRes.error.message);
          } else {
            notification.success({
              description: (
                <>
                  Status do projeto {formatInternalId(project.internalId)}{" "}
                  <em>({project.title.trim()})</em> compartilhado com sucesso!
                </>
              ),
              message: "Status compartilhado",
            });
            setActionForm(undefined);
            history.push("/manutencao/projetos");
          }
        },
        title: "Compartilhar status?",
      });
    },
    [formatInternalId, shareProjectStatus, history]
  );

  useEffect(() => {
    setBreadcrumbExtra(project && formatInternalId(project.internalId));
  }, [setBreadcrumbExtra, project, formatInternalId]);

  return project ? (
    <>
      <PageTitle pre={formatInternalId(project.internalId)}>
        {project.title}
      </PageTitle>
      <PageDescription>{project.description}</PageDescription>

      {projectStatus !== "finished" && (
        <PageActionButtons>
          <Button onClick={(): void => setActionForm("status")}>
            Informar status
          </Button>
          <Button
            icon={<CheckOutlined />}
            onClick={(): void => setActionForm("deliver")}
            type="primary"
          >
            Entregar projeto
          </Button>
        </PageActionButtons>
      )}

      <Divider />

      <Row gutter={12}>
        <Col lg={6} xs={12}>
          <DataInfo label="Status" marginBottom={!breakpoint.lg}>
            <MaintProjectStatusBadge status={projectStatus || "running"} />
          </DataInfo>
        </Col>

        <Col lg={6} xs={12}>
          <DataInfo label="Prioridade">
            <MaintProjectPriorityTag priority={project.priority} />
          </DataInfo>
        </Col>

        <Col lg={6} xs={12}>
          <DataInfo icon={<UserOutlined />} label="Responsável">
            <strong>{project.team.manager.trim()}</strong>
          </DataInfo>
        </Col>

        <Col lg={6} xs={12}>
          <DataInfo icon={<TeamOutlined />} label="Equipe">
            {project.team.others.trim()}
          </DataInfo>
        </Col>
      </Row>

      <Divider />

      <Page scrollTopOffset={24}>
        <Row>
          <Col lg={4} xs={24}>
            <DataInfo label="Histórico" />
          </Col>

          <Col lg={20} xs={24}>
            <Timeline className={classes.Timeline} mode="left" reverse={true}>
              {project.events.map((ev) => (
                <MaintProjectTimelineItem event={ev} key={nanoid()} />
              ))}
            </Timeline>
          </Col>
        </Row>
      </Page>

      <MaintProjectActionForm
        isVisible={!!actionForm}
        onClose={handleActionFormClose}
        onSubmit={
          actionForm === "status"
            ? handleProjectShareStatus
            : handleProjectDeliver
        }
        project={project}
        type={actionForm || "status"}
      />
    </>
  ) : (
    <Result404 backUrl="/manutencao/projetos">
      O projeto de manutenção solicitado não existe ou foi desabilitado.
    </Result404>
  );
}
