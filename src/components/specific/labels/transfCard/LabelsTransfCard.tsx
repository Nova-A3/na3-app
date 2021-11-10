import { Card, Divider, Tooltip, Typography } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { IoPersonCircleOutline, IoPricetagOutline } from "react-icons/io5";

import type { Na3TransfLabelTemplate } from "../../../../modules/na3-types";
import { isTouchDevice } from "../../../../utils";
import classes from "./LabelsTransfCard.module.css";

type LabelsTransfCardProps = {
  data: Na3TransfLabelTemplate;
  onSelect: (template: Na3TransfLabelTemplate) => void;
  tooltipActionText?: string;
};

const defaultProps: Omit<LabelsTransfCardProps, "data" | "onSelect"> = {
  tooltipActionText: undefined,
};

export function LabelsTransfCard({
  data,
  onSelect,
  tooltipActionText,
}: LabelsTransfCardProps): JSX.Element {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseEnter = useCallback(() => setIsMouseOver(true), []);

  const handleMouseLeave = useCallback(() => setIsMouseOver(false), []);

  const handleSelect = useCallback(() => onSelect(data), [data, onSelect]);

  return (
    <Tooltip
      title={`${isTouchDevice() ? "Toque" : "Clique"} para ${
        tooltipActionText || "selecionar"
      }`}
      visible={isMouseOver}
    >
      <Card
        className={classes.Card}
        hoverable={true}
        onClick={handleSelect}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        size="small"
      >
        <div>
          <Typography.Text strong={isMouseOver}>
            {data.name.toUpperCase()}
          </Typography.Text>
        </div>

        {isMouseOver && (
          <>
            <Divider className={classes.Details} />

            <div className={classes.DetailsItem}>
              <span className={classes.DetailsIcon}>
                <IoPricetagOutline />
              </span>
              {data.productName.toUpperCase()}
            </div>

            <div className={classes.DetailsItem}>
              <span className={classes.DetailsIcon}>
                <IoPersonCircleOutline />
              </span>
              {data.customerName.toUpperCase()}
            </div>
          </>
        )}
      </Card>
    </Tooltip>
  );
}

LabelsTransfCard.defaultProps = defaultProps;
