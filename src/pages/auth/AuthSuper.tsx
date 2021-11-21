import {
  LockOutlined,
  LoginOutlined,
  MailOutlined,
  StarFilled,
} from "@ant-design/icons";
import { message } from "antd";
import React, { useCallback } from "react";

import {
  Form,
  FormField,
  PageDescription,
  PageTitle,
  SubmitButton,
} from "../../components";
import { useForm } from "../../hooks";
import classes from "./AuthSuper.module.css";

type FormValues = { email: string; password: string };

export function AuthSuperPage(): JSX.Element {
  const form = useForm<FormValues>({
    defaultValues: { email: "", password: "" },
  });

  const handleSubmit = useCallback((): void => {
    void message.error("Acesso negado");
    return;
  }, []);

  return (
    <>
      <PageTitle>Entrar • Super</PageTitle>
      <PageDescription>
        Se você for um usuário do tipo{" "}
        <span className={classes.SuperText}>
          <StarFilled /> Super,
        </span>{" "}
        autentique-se para continuar.
      </PageDescription>

      <Form form={form} onSubmit={handleSubmit}>
        <FormField
          label="E-mail"
          labelCol={{ span: 6 }}
          name={form.fieldNames.email}
          prefix={<MailOutlined />}
          rules={{ required: "Digite seu e-mail" }}
          tooltip={{
            arrowPointAtCenter: true,
            placement: "topLeft",
            title:
              "Para solicitar uma conta, entre em contato com o administrador do sistema",
          }}
          type="input"
        />

        <FormField
          label="Senha"
          labelCol={{ span: 6 }}
          name={form.fieldNames.password}
          prefix={<LockOutlined />}
          rules={{ required: "Digite sua senha" }}
          type="password"
        />

        <SubmitButton
          icon={<LoginOutlined />}
          label="Entrar"
          labelWhenLoading="Entrando..."
          wrapperCol={{ sm: { offset: 6, span: 18 }, xs: { span: 24 } }}
        />
      </Form>
    </>
  );
}
