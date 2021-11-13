import { Modal, notification } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  ListFormPage,
  MaintCreateServiceOrderForm,
  MaintServiceOrderDetailsModal,
  MaintServiceOrdersList,
} from "../../../components";
import { useNa3ServiceOrders } from "../../../modules/na3-react";
import type { Na3ServiceOrder } from "../../../modules/na3-types";

export function MaintServiceOrdersHomePage(): JSX.Element {
  const history = useHistory();

  const serviceOrders = useNa3ServiceOrders();

  const [selectedOrder, setSelectedOrder] = useState<Na3ServiceOrder>();

  const userOrders = useMemo(
    () => serviceOrders.helpers.getDepartmentOrders(),
    [serviceOrders.helpers]
  );

  const listData = useMemo(
    () =>
      serviceOrders.helpers.sortByStatus(
        ["solved", "solving", "pending", "closed"],
        userOrders
      ),
    [serviceOrders.helpers, userOrders]
  );

  const handleCreateServiceOrderClick = useCallback(() => {
    history.push("/manutencao/os/abrir-os");
  }, [history]);

  const handleCloseOrderDetailsModal = useCallback(() => {
    setSelectedOrder(undefined);
  }, []);

  const handleAcceptOrderSolution = useCallback(
    (data: Na3ServiceOrder) => {
      const confirmModal = Modal.confirm({
        content: `Esta ação encerrará a OS #${data.id}.`,
        okText: "Encerrar OS",
        onOk: async () => {
          confirmModal.update({ okText: "Encerrando OS..." });

          const operationRes = await serviceOrders.helpers.acceptSolution(
            data.id
          );

          if (operationRes.error) {
            notification.error({
              description: operationRes.error.message,
              message: "Erro ao encerrar a OS",
            });
          } else {
            notification.success({
              description: (
                <>
                  OS #{data.id} <em>({data.description})</em> encerrada com
                  sucesso!
                </>
              ),
              message: "OS encerrada",
            });
            setSelectedOrder(undefined);
          }
        },
        title: "Aceitar solução?",
      });
    },
    [serviceOrders.helpers]
  );

  const handleRejectOrderSolution = useCallback(
    async (data: Na3ServiceOrder, payload: { reason: string }) => {
      return new Promise<void>((resolve) => {
        const confirmModal = Modal.confirm({
          content: (
            <>
              Confirma a recusa da seguinte solução da OS #{data.id}
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

            const operationRes = await serviceOrders.helpers.rejectSolution(
              data.id,
              payload
            );

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
              setSelectedOrder(undefined);
            }

            resolve();
          },
          title: "Recusar solução?",
        });
      });
    },
    [serviceOrders.helpers]
  );

  return (
    <>
      <ListFormPage
        actions={[
          { label: "Abrir OS", onClick: handleCreateServiceOrderClick },
        ]}
        form={<MaintCreateServiceOrderForm />}
        formTitle="Abrir OS"
        list={
          <MaintServiceOrdersList
            data={listData}
            onSelectOrder={setSelectedOrder}
          />
        }
        listTitle="Suas OS"
        title="Manutenção • Ordens de Serviço"
      />

      <MaintServiceOrderDetailsModal
        as="shop-floor"
        data={selectedOrder}
        onAcceptSolution={handleAcceptOrderSolution}
        onCancel={handleCloseOrderDetailsModal}
        onRejectSolution={handleRejectOrderSolution}
      />
    </>
  );
}
