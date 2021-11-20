import { LockOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { message } from "antd";
import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router";

import type { SelectOptionGroup } from "../../components";
import { PageAlert } from "../../components";
import {
  Form,
  FormField,
  PageDescription,
  PageTitle,
  SubmitButton,
} from "../../components";
import { useForm } from "../../hooks";
import { useNa3Auth, useNa3Departments } from "../../modules/na3-react";
import type { Na3Department } from "../../modules/na3-types";

type AuthProps = {
  authorized: Na3Department[] | "all";
  redirectUrl?: string;
};

const defaultProps = {
  redirectUrl: undefined,
};

type FormValues = { dpt: string; password: string };

export function AuthPage({ authorized, redirectUrl }: AuthProps): JSX.Element {
  const history = useHistory();

  const auth = useNa3Auth();
  const departments = useNa3Departments();

  const authorizedDpts = useMemo(() => {
    if (!departments.data) {
      return [];
    } else if (authorized === "all") {
      return departments.data;
    } else {
      return authorized;
    }
  }, [authorized, departments.data]);

  const form = useForm<FormValues>({
    defaultValues: {
      dpt:
        authorizedDpts.length === 1
          ? authorizedDpts[0].displayName.toUpperCase()
          : "",
      password: "",
    },
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
        if (redirectUrl) history.replace(redirectUrl);
      }
    },
    [form, auth.helpers, departments.helpers, redirectUrl, history]
  );

  const selectOptions = useMemo(() => {
    const optionGroups: (Pick<SelectOptionGroup, "options"> & {
      label: "Fábrica" | "Filial" | "Setores";
    })[] = [];

    authorizedDpts.forEach((dpt) => {
      const dptTypeName = departments.helpers.getDptTypeName(dpt.type);
      const group = optionGroups.find((g) => g.label === dptTypeName);
      const option = {
        label: dpt.displayName.toUpperCase(),
        value: dpt.displayName.toUpperCase(),
      };

      if (group) {
        group.options.push(option);
      } else {
        optionGroups.push({ label: dptTypeName, options: [option] });
      }
    });

    const groupLabelMap = { Filial: 3, Fábrica: 2, Setores: 1 };

    return [...optionGroups].sort(
      (a, b) => groupLabelMap[a.label] - groupLabelMap[b.label]
    );
  }, [authorizedDpts, departments.helpers]);

  return (
    <>
      <PageTitle>Entrar</PageTitle>

      {auth.department && (
        <PageAlert type="warning">
          Você não possui acesso a esta área.
        </PageAlert>
      )}

      <PageDescription>
        Por favor, {auth.department ? "troque de conta" : "autentique-se"} para
        continuar.
      </PageDescription>

      <Form form={form} onSubmit={handleSubmit}>
        <FormField
          disabled={authorizedDpts.length === 1}
          label="Setor"
          labelCol={{ span: 6 }}
          name="dpt"
          options={selectOptions}
          prefix={<UserOutlined />}
          rules={{ required: "Selecione o setor" }}
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
                "Selecione o setor"
              ),
          }}
          type={authorizedDpts.length === 1 ? "input" : "select"}
        />

        <FormField
          label="Senha"
          labelCol={{ span: 6 }}
          name="password"
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

AuthPage.defaultProps = defaultProps;
