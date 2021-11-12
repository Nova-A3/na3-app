import { Row } from "antd";
import React from "react";
import {
  IoCheckmarkDoneOutline,
  IoCreateOutline,
  IoLockClosedOutline,
  IoThumbsUpOutline,
} from "react-icons/io5";

import type { Na3ServiceOrder } from "../../../../../modules/na3-types";
import { DataCard } from "../../../../ui/DataCard/DataCard";
import { ServiceOrderCardHeader } from "./ServiceOrderCardHeader";
import { ServiceOrderStep } from "./ServiceOrderStep";

type MaintServiceOrderCardProps = {
  data: Na3ServiceOrder;
  onSelect: ((serviceOrder: Na3ServiceOrder) => void) | null;
};

export function MaintServiceOrderCard({
  data,
  onSelect,
}: MaintServiceOrderCardProps): JSX.Element {
  return (
    <DataCard
      data={data}
      header={
        <ServiceOrderCardHeader priority={data.priority} status={data.status} />
      }
      onClick={onSelect}
      preTitle={`#${data.id}`}
      title={data.description}
    >
      <Row>
        <ServiceOrderStep
          icon={<IoCreateOutline />}
          timestamp={data.createdAt}
        />
        <ServiceOrderStep
          icon={<IoThumbsUpOutline />}
          timestamp={data.acceptedAt}
        />
        <ServiceOrderStep
          icon={<IoCheckmarkDoneOutline />}
          timestamp={data.solvedAt}
        />
        <ServiceOrderStep
          icon={<IoLockClosedOutline />}
          timestamp={data.closedAt}
        />
      </Row>
    </DataCard>
  );
}
