import React, { useCallback } from "react";
import { useNa3TransfLabelTemplates } from "../../../modules/na3-react";
import type { Na3TransfLabelTemplate } from "../../../modules/na3-types";
import type { ListRenderItem } from "../../lists/List";
import { List } from "../../lists/List";
import { LabelsTransfCard } from "./LabelsTransfCard";

type LabelsTransfListProps = {
  onSelectTemplate: (template: Na3TransfLabelTemplate) => void;
  onDeleteTemplate?: (template: Na3TransfLabelTemplate) => void;
  cardTooltipActionText?: string;
};

export function LabelsTransfList({
  onSelectTemplate,
  onDeleteTemplate,
  cardTooltipActionText,
}: LabelsTransfListProps): JSX.Element {
  const transfLabelTemplates = useNa3TransfLabelTemplates();

  const handleRenderItem: ListRenderItem<Na3TransfLabelTemplate> = useCallback(
    (item) => (
      <LabelsTransfCard
        data={item}
        onDelete={onDeleteTemplate}
        onSelect={onSelectTemplate}
        tooltipActionText={cardTooltipActionText}
      />
    ),
    [onSelectTemplate, onDeleteTemplate, cardTooltipActionText]
  );

  return (
    <List
      data={transfLabelTemplates.data}
      error={transfLabelTemplates.error?.message}
      loading={transfLabelTemplates.loading}
      renderItem={handleRenderItem}
      verticalSpacing={8}
    />
  );
}
