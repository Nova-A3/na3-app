import type { ButtonProps } from "antd";
import { Button, Form, Tooltip } from "antd";
import { useFormikContext } from "formik";
import React, { useCallback, useState } from "react";

import { isTouchDevice } from "../../utils";

type SubmitButtonProps = ButtonProps & {
  disableShowInvalidFields?: boolean;
  isHorizontal?: boolean;
};

const defaultProps: SubmitButtonProps = {
  disableShowInvalidFields: false,
  isHorizontal: false,
};

export function SubmitButton({
  isHorizontal,
  disableShowInvalidFields,
  children,
}: SubmitButtonProps): JSX.Element {
  const { initialValues, isValid, isSubmitting, setTouched } =
    useFormikContext();

  const [tooltipIsVisible, setTooltipIsVisible] = useState(false);

  const handleTooltipVisibleChange = useCallback(
    (visible: boolean) => {
      if (disableShowInvalidFields || !visible || isValid) {
        setTooltipIsVisible(false);
        return;
      }
      setTooltipIsVisible(true);
    },
    [disableShowInvalidFields, isValid]
  );

  const handleClick = useCallback(
    (ev: React.MouseEvent<HTMLElement>) => {
      if (
        tooltipIsVisible &&
        typeof initialValues === "object" &&
        initialValues !== null
      ) {
        ev.preventDefault();
        setTouched(
          Object.fromEntries(
            Object.keys(initialValues).map((key) => [key, true])
          ),
          true
        );
        setTooltipIsVisible(false);
      }
    },
    [tooltipIsVisible, initialValues, setTouched]
  );

  return (
    <Form.Item
      wrapperCol={
        isHorizontal
          ? { sm: { offset: 6, span: 18 }, xs: { span: 24 } }
          : { span: 24 }
      }
    >
      <Tooltip
        color="#ff4d4f"
        onVisibleChange={handleTooltipVisibleChange}
        title={`Alguns campos estão inválidos. ${
          isTouchDevice() ? "Toque" : "Clique"
        } para mostrar.`}
        visible={tooltipIsVisible}
      >
        <Button
          block={true}
          danger={tooltipIsVisible}
          disabled={!isValid && !tooltipIsVisible}
          htmlType="submit"
          loading={isSubmitting}
          onClick={handleClick}
          type={tooltipIsVisible ? "default" : "primary"}
        >
          {tooltipIsVisible ? "Mostrar campos inválidos" : children}
        </Button>
      </Tooltip>
    </Form.Item>
  );
}

SubmitButton.defaultProps = defaultProps;
