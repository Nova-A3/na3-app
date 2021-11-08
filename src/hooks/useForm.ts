import type { FieldValues, UseFormProps, UseFormReturn } from "react-hook-form";
import { useForm as useFormOriginal } from "react-hook-form";

type UseFormOptions<
  Fields extends FieldValues = FieldValues,
  Context extends Record<string, unknown> = Record<string, unknown>
> = Partial<Omit<UseFormProps<Fields, Context>, "defaultValues">>;

type UseFormConfig<
  Fields extends FieldValues = FieldValues,
  Context extends Record<string, unknown> = Record<string, unknown>
> = Required<Pick<UseFormProps<Fields, Context>, "defaultValues">>;

export function useForm<
  Fields extends FieldValues = FieldValues,
  Context extends Record<string, unknown> = Record<string, unknown>
>(
  config: UseFormConfig<Fields, Context>,
  options?: UseFormOptions<Fields, Context>
): UseFormReturn<Fields, Context> {
  return useFormOriginal({
    ...config,
    mode: "onTouched",
    shouldUnregister: true,
    ...options,
  });
}
