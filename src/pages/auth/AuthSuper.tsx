import {
  LockOutlined,
  LoginOutlined,
  MailOutlined,
  StarOutlined,
} from "@ant-design/icons";
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

  const handleSubmit = useCallback(({ email, password }: FormValues): void => {
    /*
      function setSignInError(message: string): void {
        form.setError("password", { message });
      }

      const parsedDepartment = departments.helpers.getByDisplayName(dpt);

      if (!parsedDepartment) {
        return setSignInError(
          `Nenhuma conta encontrada para o setor "${dpt}".`
        );
      }

      const signInResult = await auth.helpers.signIn(
        parsedDepartment.id,
        password
      );

      if (signInResult.error) {
        setSignInError(signInResult.error.message);
      } else {
        void message.success("Autenticado!");
        if (redirectUrl) history.replace(redirectUrl);
      }
      */

    return;
  }, []);

  return (
    <>
      <PageTitle>Entrar • Super</PageTitle>
      <PageDescription>
        Se você for um usuário do tipo{" "}
        <span className={classes.SuperText}>
          <StarOutlined /> Super,
        </span>
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
              "Para solicitar uma conta, entre em contato com o administrador do sistema.",
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
