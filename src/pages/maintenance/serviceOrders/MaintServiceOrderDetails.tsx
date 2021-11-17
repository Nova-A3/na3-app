import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Col, Grid, Modal, notification, Row, Space } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";

import {
  DataInfo,
  Divider,
  Page,
  PageActionButtons,
  PageDescription,
  PageTitle,
  RejectSolutionModal,
  Result404,
  ServiceOrderMachineTag,
  ServiceOrderPriorityTag,
  ServiceOrderStatusBadge,
} from "../../../components";
import { useBreadcrumb } from "../../../hooks";
import { useNa3ServiceOrders } from "../../../modules/na3-react";
import type { Na3ServiceOrder } from "../../../modules/na3-types";
import { parseStringId } from "../../../utils";

type PageProps = {
  serviceOrderId: string;
};

const BACK_URL = "/manutencao/os";

export function MaintServiceOrderDetailsPage({
  serviceOrderId,
}: PageProps): JSX.Element {
  const [rejectModalIsVisible, setRejectModalIsVisible] = useState(false);

  const history = useHistory();
  const breakpoint = Grid.useBreakpoint();

  const { setExtra: setBreadcrumbExtra } = useBreadcrumb();

  const {
    helpers: {
      getById: getServiceOrderById,
      getOrderMachine,
      orderRequiresAction,
      acceptSolution: acceptOrderSolution,
      rejectSolution: rejectOrderSolution,
    },
  } = useNa3ServiceOrders();

  const serviceOrder = useMemo(
    () => getServiceOrderById(serviceOrderId),
    [getServiceOrderById, serviceOrderId]
  );

  const handleOpenRejectModal = useCallback(() => {
    setRejectModalIsVisible(true);
  }, []);

  const handleCloseRejectModal = useCallback(() => {
    setRejectModalIsVisible(false);
  }, []);

  const handleAcceptOrderSolution = useCallback(() => {
    if (!serviceOrder) return;

    const confirmModal = Modal.confirm({
      content: `Esta ação encerrará a OS #${serviceOrder.id}.`,
      okText: "Encerrar OS",
      onOk: async () => {
        confirmModal.update({ okText: "Encerrando OS..." });

        const operationRes = await acceptOrderSolution(serviceOrder.id);

        if (operationRes.error) {
          notification.error({
            description: operationRes.error.message,
            message: "Erro ao encerrar a OS",
          });
        } else {
          notification.success({
            description: (
              <>
                OS #{serviceOrder.id} <em>({serviceOrder.description})</em>{" "}
                encerrada com sucesso!
              </>
            ),
            message: "OS encerrada",
          });
          history.push(BACK_URL);
        }
      },
      title: "Aceitar solução?",
    });
  }, [serviceOrder, acceptOrderSolution, history]);

  const handleRejectOrderSolution = useCallback(
    async (data: Na3ServiceOrder, payload: { reason: string }) => {
      return new Promise<void>((resolve) => {
        const confirmModal = Modal.confirm({
          content: (
            <>
              Confirma a recusa da{data.solution ? " seguinte" : ""} solução da
              OS #{data.id}
              {data.solution && (
                <>
                  : <em>{data.solution.trim()}</em>
                </>
              )}
              ?
            </>
          ),
          okText: "Confirmar recusa",
          onCancel: () => resolve(),
          onOk: async () => {
            confirmModal.update({ okText: "Enviando recusa..." });

            const operationRes = await rejectOrderSolution(data.id, payload);

            if (operationRes.error) {
              notification.error({
                description: operationRes.error.message,
                message: "Erro ao recusar solução",
              });
            } else {
              notification.info({
                description: (
                  <>
                    Solução da OS #{data.id} <em>({data.description})</em>{" "}
                    recusada.
                  </>
                ),
                message: "Solução recusada",
              });
              history.push(BACK_URL);
            }

            resolve();
          },
          title: "Recusar solução?",
        });
      });
    },
    [rejectOrderSolution, history]
  );

  useEffect(() => {
    setBreadcrumbExtra(serviceOrder && `#${serviceOrder.id}`);
  }, [setBreadcrumbExtra, serviceOrder]);

  return serviceOrder ? (
    <>
      <PageTitle>OS #{serviceOrder.id}</PageTitle>
      <PageDescription>{serviceOrder.description}</PageDescription>

      {orderRequiresAction(serviceOrder) && (
        <PageActionButtons>
          {serviceOrder.status === "solved" ? (
            <>
              <Button
                icon={<CheckOutlined />}
                onClick={handleAcceptOrderSolution}
                type="primary"
              >
                Aceitar solução
              </Button>
              <Button
                danger={true}
                icon={<CloseOutlined />}
                onClick={handleOpenRejectModal}
                type="text"
              >
                Rejeitar{breakpoint.lg && " solução"}
              </Button>
            </>
          ) : serviceOrder.status === "pending" ? (
            <>
              <Button icon={<CheckOutlined />} type="primary">
                Aceitar OS
              </Button>
              <Button danger={true} icon={<CloseOutlined />} type="text">
                Recusar{breakpoint.lg && " OS"}
              </Button>
            </>
          ) : (
            <>
              <Button>Informar status</Button>
              <Button icon={<CheckOutlined />} type="primary">
                Transmitir solução
              </Button>
            </>
          )}
        </PageActionButtons>
      )}

      <Divider />

      <Page scrollTopOffset={24}>
        <Row gutter={12}>
          <Col lg={6} xs={12}>
            <DataInfo label="Status" marginBottom={!breakpoint.lg}>
              <ServiceOrderStatusBadge status={serviceOrder.status} />
            </DataInfo>
          </Col>

          <Col lg={6} xs={12}>
            <DataInfo label="Prioridade">
              {serviceOrder.priority ? (
                <ServiceOrderPriorityTag priority={serviceOrder.priority} />
              ) : (
                <em>Não atribuída</em>
              )}
            </DataInfo>
          </Col>

          <Col lg={6} xs={12}>
            <DataInfo label="Setor">
              <strong>{serviceOrder.dpt.trim().toUpperCase()}</strong>
            </DataInfo>
          </Col>

          <Col lg={6} xs={12}>
            <DataInfo label="Máquina">
              <ServiceOrderMachineTag
                fallback={serviceOrder.machine.trim().toUpperCase()}
                machine={getOrderMachine(serviceOrder)}
              />
            </DataInfo>
          </Col>
        </Row>

        <Divider />

        <Row gutter={12}>
          <Col lg={6} xs={8}>
            <DataInfo label="Tipo" marginBottom={!breakpoint.lg}>
              {parseStringId(serviceOrder.maintenanceType)}
            </DataInfo>
          </Col>

          <Col lg={6} xs={8}>
            <DataInfo label="Equipe">
              {parseStringId(serviceOrder.team)}
            </DataInfo>
          </Col>

          <Col lg={6} xs={8}>
            <DataInfo label="Causa">
              {parseStringId(serviceOrder.cause)}
            </DataInfo>
          </Col>

          <Col lg={6} xs={24}>
            <DataInfo label="Parou">
              <Space size="large">
                <div>
                  <strong>Produção: </strong>
                  {serviceOrder.interruptions.production ? (
                    <CheckOutlined />
                  ) : (
                    <CloseOutlined />
                  )}
                </div>

                <div>
                  <strong>Linha: </strong>
                  {serviceOrder.interruptions.line ? (
                    <CheckOutlined />
                  ) : (
                    <CloseOutlined />
                  )}
                </div>

                <div>
                  <strong>Máquina: </strong>
                  {serviceOrder.interruptions.equipment ? (
                    <CheckOutlined />
                  ) : (
                    <CloseOutlined />
                  )}
                </div>
              </Space>
            </DataInfo>
          </Col>
        </Row>

        <Divider />

        <Row gutter={12}>
          <Col lg={12} xs={24}>
            <DataInfo
              label="Informações adicionais"
              marginBottom={!breakpoint.lg}
            >
              <em>{serviceOrder.additionalInfo || "—"}</em>
            </DataInfo>
          </Col>

          <Col lg={12} xs={24}>
            <DataInfo label="Solução">
              {serviceOrder.solution ? (
                <strong>{serviceOrder.solution}</strong>
              ) : (
                <em>Nenhuma disponível</em>
              )}
            </DataInfo>
          </Col>
        </Row>
      </Page>

      <RejectSolutionModal
        isVisible={rejectModalIsVisible}
        onClose={handleCloseRejectModal}
        onSubmit={handleRejectOrderSolution}
        serviceOrder={serviceOrder}
      />
    </>
  ) : (
    <Result404 backUrl={BACK_URL}>
      A ordem de serviço solicitada não existe ou foi desabilitada.
    </Result404>
  );
}
