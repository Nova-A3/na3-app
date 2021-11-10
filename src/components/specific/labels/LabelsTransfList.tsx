import React, { useCallback } from "react";

import { useNa3TransfLabelTemplates } from "../../../modules/na3-react";
import type { Na3TransfLabelTemplate } from "../../../modules/na3-types";
import { List } from "../../lists/List";
import { LabelsTransfCard } from "./transfCard/LabelsTransfCard";

type LabelsTransfListProps = {
  cardTooltipActionText?: string;
  onSelectTemplate: (template: Na3TransfLabelTemplate) => void;
};

const defaultProps: Omit<LabelsTransfListProps, "onSelectTemplate"> = {
  cardTooltipActionText: undefined,
};

export function LabelsTransfList({
  onSelectTemplate,
  cardTooltipActionText,
}: LabelsTransfListProps): JSX.Element {
  const transfLabelTemplates = useNa3TransfLabelTemplates();

  const handleRenderItem = useCallback(
    (item: Na3TransfLabelTemplate) => (
      <LabelsTransfCard
        data={item}
        onSelect={onSelectTemplate}
        tooltipActionText={cardTooltipActionText}
      />
    ),
    [onSelectTemplate, cardTooltipActionText]
  );

  const handleFilterItem = useCallback(
    (query: string): Na3TransfLabelTemplate[] =>
      transfLabelTemplates.data?.filter((template) => {
        const formattedQuery = query.trim().toLowerCase();
        return (
          template.name.toLowerCase().includes(formattedQuery) ||
          template.productName.toLowerCase().includes(formattedQuery) ||
          template.productCode.toLowerCase().includes(formattedQuery) ||
          template.customerName.toLowerCase().includes(formattedQuery)
        );
      }) || [],
    [transfLabelTemplates.data]
  );

  return (
    <List
      data={transfLabelTemplates.data}
      error={transfLabelTemplates.error?.message}
      filterItem={handleFilterItem}
      isLoading={transfLabelTemplates.loading}
      renderItem={handleRenderItem}
      verticalSpacing={8}
    />
  );
}

LabelsTransfList.defaultProps = defaultProps;
