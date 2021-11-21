import React, { useCallback } from "react";
import { useHistory } from "react-router";

import { ListFormPage } from "../../../components";
import { useQuery } from "../../../hooks";

export function DocTransfHomePage(): JSX.Element {
  const history = useHistory();
  const query = useQuery("id");

  const handleTransfDocCreateClick = useCallback(() => {
    history.push("/docs/transferencia/nova");
  }, [history]);

  /*
  const handleTransfDocSelect = useCallback(
    (doc: { id: string }) => {
      history.push(`/docs/transferencia?id=${doc.id}`);
    },
    [history]
  );
  */

  return query.id ? (
    <>DETAILS</>
  ) : (
    <ListFormPage
      actions={[
        { label: "Nova transferência", onClick: handleTransfDocCreateClick },
      ]}
      form={<>FORM</>}
      formTitle="Nova Transferência"
      list={<>LIST</>}
      listTitle="Suas Transferências"
      title="Documentos • Transferência"
    />
  );
}
