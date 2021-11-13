import { CheckOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Timeline, Typography } from "antd";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  MaintProjectActionForm,
  MaintProjectPriorityTag,
  MaintProjectStatusBadge,
  Page,
  PageActionButtons,
  PageDescription,
  PageTitle,
  Result,
} from "../../../components";
import { useBreadcrumb } from "../../../hooks";
import { useNa3MaintProjects } from "../../../modules/na3-react";
import { parseStringId } from "../../../utils";
import classes from "./MaintProjectDetails.module.css";

type PageProps = {
  projectId: string;
};

export function MaintProjectDetails({ projectId }: PageProps): JSX.Element {
  const [actionForm, setActionForm] = useState<"deliver" | "status">();

  const history = useHistory();

  const { setExtra: setBreadcrumbExtra } = useBreadcrumb();

  const {
    helpers: { formatInternalId, getProjectStatus, getById: getProjectById },
  } = useNa3MaintProjects();

  const project = useMemo(
    () => getProjectById(projectId),
    [getProjectById, projectId]
  );

  const projectStatus = useMemo(
    () => (project ? getProjectStatus(project) : undefined),
    [getProjectStatus, project]
  );

  const handleNavigateBack = useCallback(() => {
    history.replace("/manutencao/projetos");
  }, [history]);

  const handleActionFormClose = useCallback(() => {
    setActionForm(undefined);
  }, []);

  const handleProjectDeliver = useCallback(() => {
    return;
  }, []);

  const handleProjectShareStatus = useCallback(() => {
    return;
  }, []);

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

      <Row>
        <Col className={classes.MarginCol} lg={6} xs={12}>
          <Typography.Text className={classes.DataLabel}>
            Status:
          </Typography.Text>
          <MaintProjectStatusBadge status={projectStatus || "running"} />
        </Col>

        <Col lg={6} xs={12}>
          <Typography.Text className={classes.DataLabel}>
            Prioridade:
          </Typography.Text>
          <MaintProjectPriorityTag priority={project.priority} />
        </Col>

        <Col lg={6} xs={12}>
          <Typography.Text className={classes.DataLabel}>
            <UserOutlined /> Responsável:
          </Typography.Text>
          <strong>{project.team.manager.trim()}</strong>
        </Col>

        <Col lg={6} xs={12}>
          <Typography.Text className={classes.DataLabel}>
            <TeamOutlined /> Equipe:
          </Typography.Text>
          {project.team.others.trim()}
        </Col>
      </Row>

      <Divider />

      <Page scrollTopOffset={24}>
        <Row>
          <Col lg={4} xs={24}>
            <Typography.Text className={classes.DataLabel}>
              Histórico:
            </Typography.Text>
          </Col>

          <Col lg={20} xs={24}>
            <Timeline className={classes.Timeline} mode="left">
              {project.events.map((ev) => (
                <Timeline.Item
                  color={
                    ev.type === "complete"
                      ? "green"
                      : ev.type === "create"
                      ? "cyan"
                      : undefined
                  }
                  key={nanoid()}
                >
                  <div>
                    <Typography.Text>
                      {parseStringId(`project-${ev.type}`)}
                    </Typography.Text>

                    <small className={classes.TimelineTimestamp}>
                      <Typography.Text italic={true} type="secondary">
                        {dayjs(ev.timestamp.toDate()).format("DD/MM/YY HH:mm")}
                      </Typography.Text>
                    </small>
                  </div>

                  {"message" in ev && (
                    <Typography.Text type="secondary">
                      {ev.message}
                    </Typography.Text>
                  )}
                </Timeline.Item>
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
    <Result
      description="O projeto de manutenção solicitado não existe ou foi desabilitado."
      extra={
        <Button onClick={handleNavigateBack} type="primary">
          Voltar
        </Button>
      }
      status="404"
      title="Oops!"
    />
  );
}
