import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Row, Tooltip, Typography } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { IoPersonCircleOutline, IoPricetagOutline } from "react-icons/io5";

import type { Na3TransfLabelTemplate } from "../../../../modules/na3-types";
import { isTouchDevice } from "../../../../utils";
import classes from "./LabelsTransfCard.module.css";

type LabelsTransfCardProps = {
  data: Na3TransfLabelTemplate;
  onDelete?: (template: Na3TransfLabelTemplate) => void;
  onSelect: (template: Na3TransfLabelTemplate) => void;
  tooltipActionText?: string;
};

const defaultProps: Omit<LabelsTransfCardProps, "data" | "onSelect"> = {
  onDelete: undefined,
  tooltipActionText: undefined,
};

export function LabelsTransfCard({
  data,
  onSelect,
  onDelete,
  tooltipActionText,
}: LabelsTransfCardProps): JSX.Element {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [showTopLevelTooltip, setShowTopLevelTooltip] = useState(true);

  const handleMouseEnter = useCallback(() => setIsMouseOver(true), []);

  const handleMouseLeave = useCallback(() => setIsMouseOver(false), []);

  const handleSelect = useCallback(() => onSelect(data), [data, onSelect]);

  const handleDelete = useCallback(() => onDelete?.(data), [data, onDelete]);

  const handleToggleTopLevelTooltip = useCallback(
    (delButtonVisible) => setShowTopLevelTooltip(!delButtonVisible),
    []
  );

  const cardBodyStyle = useMemo(() => ({ padding: 0 }), []);

  return (
    <Tooltip
      title={`${isTouchDevice() ? "Toque" : "Clique"} para ${
        tooltipActionText || "selecionar"
      }`}
      visible={isMouseOver && showTopLevelTooltip}
    >
      <Card
        bodyStyle={cardBodyStyle}
        className={classes.Card}
        hoverable={true}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        size="small"
      >
        <Row align="middle" justify="space-between">
          <Col
            className={classes.Content}
            onClick={handleSelect}
            span={onDelete && isMouseOver ? 21 : 24}
          >
            <Row>
              <Typography.Text strong={isMouseOver}>
                {data.name.toUpperCase()}
              </Typography.Text>
            </Row>

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
          </Col>

          {onDelete && isMouseOver && (
            <Col className={classes.Actions} span={3}>
              <Tooltip
                color="#ff4d4f"
                onVisibleChange={handleToggleTopLevelTooltip}
                title="Excluir"
              >
                <Button
                  danger={true}
                  icon={<DeleteOutlined />}
                  onClick={handleDelete}
                  shape="circle"
                  type="link"
                />
              </Tooltip>
            </Col>
          )}
        </Row>
      </Card>
    </Tooltip>
  );
}

LabelsTransfCard.defaultProps = defaultProps;
