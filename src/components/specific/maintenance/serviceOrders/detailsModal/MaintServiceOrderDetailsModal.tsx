import { Button, Col, Divider, Grid, Modal, Row } from "antd";
import React from "react";

import { useNa3Departments } from "../../../../../modules/na3-react";
import type { Na3ServiceOrder } from "../../../../../modules/na3-types";
import { translateId } from "../../../../../utils";
import { ServiceOrderStatusBadge } from "../card/ServiceOrderStatusBadge";
import { ServiceOrderDetailsItem } from "./ServiceOrderDetailsItem";

type MaintServiceOrderDetailsModalProps = {
  data: Na3ServiceOrder | undefined;
  onAcceptSolution: (() => void) | undefined;
  onCancel: () => void;
  onRefuseSolution: (() => void) | undefined;
};

export function MaintServiceOrderDetailsModal({
  onCancel,
  onAcceptSolution,
  onRefuseSolution,
  data,
}: MaintServiceOrderDetailsModalProps): JSX.Element {
  const departments = useNa3Departments();

  const breakpoint = Grid.useBreakpoint();

  return (
    <Modal
      footer={null}
      onCancel={onCancel}
      title={data?.description.toUpperCase()}
      visible={!!data}
      width={breakpoint.lg ? "65%" : breakpoint.md ? "80%" : undefined}
    >
      {data && (
        <>
          {data.status === "solved" && (
            <>
              <Row gutter={8}>
                <Col span={onAcceptSolution ? (onRefuseSolution ? 16 : 24) : 0}>
                  <Button
                    block={true}
                    onClick={onAcceptSolution}
                    type="primary"
                  >
                    Aceitar solução
                  </Button>
                </Col>
                <Col span={onRefuseSolution ? (onAcceptSolution ? 8 : 24) : 0}>
                  <Button block={true} danger={true} onClick={onRefuseSolution}>
                    Recusar solução
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
  );
}
