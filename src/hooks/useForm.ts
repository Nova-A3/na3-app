import { useCallback } from "react";
import type {
  FieldValues,
  Path,
  UseFormProps as UseFormOriginalProps,
  UseFormReturn as UseFormOriginalReturn,
} from "react-hook-form";
import { useForm as useFormOriginal } from "react-hook-form";

type UseFormOptions<
  Fields extends FieldValues = FieldValues,
  Context extends Record<string, unknown> = Record<string, unknown>
> = Partial<Omit<UseFormOriginalProps<Fields, Context>, "defaultValues">>;

type UseFormConfig<
  Fields extends FieldValues = FieldValues,
  Context extends Record<string, unknown> = Record<string, unknown>
> = Required<Pick<UseFormOriginalProps<Fields, Context>, "defaultValues">>;

type UseFormReturn<
  Fields extends FieldValues = FieldValues,
  Context extends Record<string, unknown> = Record<string, unknown>
> = UseFormOriginalReturn<Fields, Context> & {
  resetForm: () => void;
};

export function useForm<
  Fields extends FieldValues = FieldValues,
  Context extends Record<string, unknown> = Record<string, unknown>
>(
  config: UseFormConfig<Fields, Context>,
  options?: UseFormOptions<Fields, Context>
): UseFormReturn<Fields, Context> {
  const form = useFormOriginal<Fields, Context>({
    ...config,
    mode: "onTouched",
    shouldUnregister: true,
    ...options,
  });

  const resetForm = useCallback(() => {
    const formValues = form.getValues();

    Object.keys(formValues).forEach((key) => {
      const fieldName = key as Path<Fields>;

      form.setValue(fieldName, config.defaultValues[fieldName]);
      form.clearErrors(fieldName);
    });
  }, [config.defaultValues, form]);

  return { ...form, resetForm };
}
