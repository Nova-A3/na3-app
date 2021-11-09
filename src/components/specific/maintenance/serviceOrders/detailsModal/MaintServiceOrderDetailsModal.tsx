import { CheckOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Grid, Modal, Row } from "antd";
import React, { useCallback, useState } from "react";

import { useNa3Departments } from "../../../../../modules/na3-react";
import type { Na3ServiceOrder } from "../../../../../modules/na3-types";
import { translateId } from "../../../../../utils";
import { ServiceOrderStatusBadge } from "../card/ServiceOrderStatusBadge";
import { RejectSolutionModal } from "./RejectSolutionModal";
import { ServiceOrderDetailsItem } from "./ServiceOrderDetailsItem";

type MaintServiceOrderDetailsModalProps = {
  as: "maintenance" | "shop-floor";
  data: Na3ServiceOrder | undefined;
  onAcceptSolution: (data: Na3ServiceOrder) => Promise<void> | void;
  onCancel: () => void;
  onRejectSolution: (
    data: Na3ServiceOrder,
    payload: { reason: string }
  ) => Promise<void> | void;
};

export function MaintServiceOrderDetailsModal({
  as,
  onCancel,
  onAcceptSolution,
  onRejectSolution,
  data,
}: MaintServiceOrderDetailsModalProps): JSX.Element {
  const [showRejectModal, setShowRejectModal] = useState(false);

  const departments = useNa3Departments();

  const breakpoint = Grid.useBreakpoint();

  const handleClickOnAcceptSolution = useCallback(() => {
    if (!data) return;
    void onAcceptSolution(data);
  }, [onAcceptSolution, data]);

  const handleClickOnRejectSolution = useCallback(() => {
    setShowRejectModal(true);
  }, []);

  const handleCloseRejectModal = useCallback(() => {
    setShowRejectModal(false);
  }, []);

  const handleRejectSolution = useCallback(
    async (data: Na3ServiceOrder, payload: { reason: string }) => {
      await onRejectSolution(data, payload);
      setShowRejectModal(false);
    },
    [onRejectSolution]
  );

  return (
    <>
      <Modal
        footer={null}
        onCancel={onCancel}
        title={data?.description.toUpperCase()}
        visible={!!data}
        width={breakpoint.lg ? "65%" : breakpoint.md ? "80%" : undefined}
      >
        {data && (
          <>
            {as === "shop-floor" && data.status === "solved" && (
              <>
                <Row gutter={8}>
                  <Col span={16}>
                    <Button
                      block={true}
                      icon={<CheckOutlined />}
                      onClick={handleClickOnAcceptSolution}
                      type="primary"
                    >
                      Aceitar solução
                    </Button>
                  </Col>

                  <Col span={8}>
                    <Button
                      block={true}
                      danger={true}
                      onClick={handleClickOnRejectSolution}
                    >
                      Recusar{breakpoint.md && " solução"}
                    </Button>
                  </Col>
                </Row>

                <Divider />
              </>
            )}

            <Row gutter={32}>
              <Col md={12} xs={24}>
                <ServiceOrderDetailsItem label="Status">
                  <ServiceOrderStatusBadge status={data.status} />
                </ServiceOrderDetailsItem>

                <Divider />

                <ServiceOrderDetailsItem label="Setor">
                  {data.dpt}
                </ServiceOrderDetailsItem>
                <ServiceOrderDetailsItem label="Máquina">
                  {departments.helpers
                    .getById(data.username)
                    ?.machines[data.machine]?.name.toUpperCase() || (
                    <em>data.machine.toUpperCase()</em>
                  )}
                </ServiceOrderDetailsItem>

                <Divider />

                <ServiceOrderDetailsItem
                  label={breakpoint.md ? "Tipo de manutenção" : "Tipo"}
                >
                  {translateId(data.maintenanceType)}
                </ServiceOrderDetailsItem>
                <ServiceOrderDetailsItem
                  label={breakpoint.md ? "Equipe responsável" : "Equipe"}
                >
                  {translateId(data.team)}
                </ServiceOrderDetailsItem>

                <ServiceOrderDetailsItem
                  label={breakpoint.md ? "Tipo de causa" : "Causa"}
                >
                  {translateId(data.cause)}
                </ServiceOrderDetailsItem>

                <Divider />

                <ServiceOrderDetailsItem label="Parou máquina?">
                  {data.interruptions.equipment ? "SIM" : "NÃO"}
                </ServiceOrderDetailsItem>
                <ServiceOrderDetailsItem label="Parou linha?">
                  {data.interruptions.line ? "SIM" : "NÃO"}
                </ServiceOrderDetailsItem>
                <ServiceOrderDetailsItem label="Parou produção?">
                  {data.interruptions.production ? "SIM" : "NÃO"}
                </ServiceOrderDetailsItem>
              </Col>

              <Col md={12} xs={24}>
                {!breakpoint.md && <Divider />}

                <ServiceOrderDetailsItem
                  isStacked={true}
                  label="Solução atribuída"
                >
                  {data.solution ? (
                    <strong>{data.solution}</strong>
                  ) : (
                    <em>Nenhuma solução disponível</em>
                  )}
                </ServiceOrderDetailsItem>

                <Divider />

                <ServiceOrderDetailsItem isStacked={true} label="Histórico">
                  <em>Em breve</em>
                </ServiceOrderDetailsItem>
              </Col>
            </Row>
          </>
        )}
      </Modal>

      {data && (
        <RejectSolutionModal
          isVisible={showRejectModal}
          onClose={handleCloseRejectModal}
          onSubmit={handleRejectSolution}
          serviceOrder={data}
        />
      )}
    </>
  );
}
