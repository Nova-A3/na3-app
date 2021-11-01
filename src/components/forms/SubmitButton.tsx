import type { ButtonProps } from "antd";
import { Button, Form, Tooltip } from "antd";
import { useFormikContext } from "formik";
import React, { useCallback, useState } from "react";

import { isTouchDevice } from "../../utils";

type SubmitButtonProps = ButtonProps & {
  horizontal?: boolean;
};

const defaultProps: SubmitButtonProps = {
  horizontal: false,
};

export function SubmitButton({
  horizontal,
  children,
}: SubmitButtonProps): JSX.Element {
  const { initialValues, isValid, isSubmitting, setTouched } =
    useFormikContext();

  const [tooltipIsVisible, setTooltipIsVisible] = useState(false);

  const handleTooltipVisibleChange = useCallback(
    (visible: boolean) => {
      if (!visible || isValid) {
        setTooltipIsVisible(false);
        return;
      }
      setTooltipIsVisible(true);
    },
    [isValid]
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
    <Tooltip
      color="#ff4d4f"
      onVisibleChange={handleTooltipVisibleChange}
      title={`Alguns campos estão inválidos. ${
        isTouchDevice() ? "Toque" : "Clique"
      } para mostrar.`}
      visible={tooltipIsVisible}
    >
      <Form.Item
        wrapperCol={
          horizontal
            ? { sm: { offset: 6, span: 18 }, xs: { span: 24 } }
            : { span: 24 }
        }
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
      </Form.Item>
    </Tooltip>
  );
}

SubmitButton.defaultProps = defaultProps;
