import { LockOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { message } from "antd";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

import {
  FormField,
  FormV2,
  PageDescription,
  PageTitle,
  SubmitButtonV2,
} from "../../components";
import { useNa3Auth, useNa3Departments } from "../../modules/na3-react";
import type { Na3Department } from "../../modules/na3-types";

type AuthProps = {
  authorizedDpts: Na3Department[];
};

type FormValues = { dpt: string; password: string };

export function AuthPage({ authorizedDpts }: AuthProps): JSX.Element {
  const auth = useNa3Auth();
  const departments = useNa3Departments();

  const form = useForm<FormValues>({
    criteriaMode: "all",
    defaultValues: {
      dpt:
        authorizedDpts.length === 1
          ? authorizedDpts[0].displayName.toUpperCase()
          : "",
      password: "",
    },
    mode: "onChange",
  });

  const handleSubmit = useCallback(
    async ({ dpt, password }: FormValues): Promise<void> => {
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
      }
    },
    [form, auth.helpers, departments.helpers]
  );

  return (
    <>
      <PageTitle>Entrar</PageTitle>
      <PageDescription>
        Por favor, autentique-se para continuar.
      </PageDescription>

      <FormV2 form={form} onSubmit={handleSubmit}>
        <FormField
          disabled={authorizedDpts.length === 1}
          label="Setor"
          labelCol={{ span: 6 }}
          name="dpt"
          options={authorizedDpts.map((dpt) => ({
            label: dpt.displayName.toUpperCase(),
            value: dpt.displayName.toUpperCase(),
          }))}
          prefix={<UserOutlined />}
          rules={{
            minLength: { message: "Campo obrigatório", value: 1 },
            required: "Campo obrigatório",
            validate: (value): string | undefined =>
              value === undefined ? "Campo obrigatório" : undefined,
          }}
          tooltip={{
            placement: "right",
            title:
              authorizedDpts.length === 1 ? (
                <>
                  Apenas o setor{" "}
                  <strong>
                    <em>{authorizedDpts[0].displayName}</em>
                  </strong>{" "}
                  tem acesso a esta área
                </>
              ) : (
                "Selecione seu setor"
              ),
          }}
          type={authorizedDpts.length === 1 ? "input" : "select"}
        />

        <FormField
          label="Senha"
          labelCol={{ span: 6 }}
          name="password"
          prefix={<LockOutlined />}
          rules={{ required: "Campo obrigatório" }}
          tooltip={{ placement: "right", title: "Digite sua senha" }}
          type="password"
        />

        <SubmitButtonV2
          icon={<LoginOutlined />}
          label="Entrar"
          labelWhenLoading="Entrando..."
          wrapperCol={{ sm: { offset: 6, span: 18 }, xs: { span: 24 } }}
        />
      </FormV2>
    </>
  );
}
