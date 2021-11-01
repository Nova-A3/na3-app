import { LockOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { message } from "antd";
import React, { useCallback } from "react";
import type { HandleSubmit } from "../../components";
import {
  Form,
  FormItem,
  PageDescription,
  PageTitle,
  SubmitButton,
} from "../../components";
import { useNa3Auth, useNa3Departments } from "../../modules/na3-react";
import type { Na3Department } from "../../modules/na3-types";

type AuthProps = {
  authorizedDpts: Na3Department[];
};

type FormValues = { department: string; password: string };

export function AuthPage({ authorizedDpts }: AuthProps): JSX.Element {
  const auth = useNa3Auth();
  const departments = useNa3Departments();

  const handleSubmit: HandleSubmit<FormValues> = useCallback(
    async ({ department, password }, helpers) => {
      function setSignInError(message: string) {
        helpers.setFieldError("password", message);
      }

      const parsedDepartment = departments.helpers.getByDisplayName(department);

      if (!parsedDepartment) {
        return setSignInError(
          `Nenhuma conta encontrada para o setor "${department}".`
        );
      }

      const signInResult = await auth.helpers.signIn(
        parsedDepartment.id,
        password
      );

      if (signInResult.error) setSignInError(signInResult.error.message);
      else void message.success("Autenticado!");
    },
    [auth.helpers, departments.helpers]
  );

  return (
    <>
      <PageTitle>Entrar</PageTitle>
      <PageDescription>
        Por favor, autentique-se para continuar.
      </PageDescription>

      <Form<FormValues>
        horizontal={true}
        initialValues={{
          department:
            authorizedDpts.length === 1
              ? authorizedDpts[0].displayName.toUpperCase()
              : "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <>
            <FormItem
              autoCapitalize={true}
              autoFocus={authorizedDpts.length > 1}
              disabled={authorizedDpts.length === 1}
              label="Setor"
              name="department"
              options={authorizedDpts.map((dpt) => ({
                label: dpt.displayName.toUpperCase(),
                value: dpt.displayName.toUpperCase(),
              }))}
              prefix={<UserOutlined />}
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

            <FormItem
              label="Senha"
              name="password"
              prefix={<LockOutlined />}
              tooltip={{ placement: "right", title: "Digite sua senha" }}
              type="password"
            />

            <SubmitButton horizontal={true} icon={<LoginOutlined />}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </SubmitButton>
          </>
        )}
      </Form>
    </>
  );
}
