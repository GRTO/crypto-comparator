import { FormEvent, useState } from "react";

interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: string | RegExp;
    message: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    message: string;
  };
}

type ErrorRecord<T> = Record<keyof T, string>;

type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;

export const useForm = <T extends Record<keyof T, any> = {}>(options?: {
  validations?: Validations<T>;
  initialValues?: Partial<T>;
  onSubmit?: (formData: Partial<T>) => void;
}) => {
  const noErrors: ErrorRecord<T> = {} as ErrorRecord<T>;
  const [data, setData] = useState<Partial<T>>(options?.initialValues || {});
  const [errors, setErrors] = useState<ErrorRecord<T>>(noErrors);

  const handleFormChange =
    (key: string, sanitizeFn?: (value: string) => string) =>
    (e: FormEvent<HTMLInputElement>) => {
      const value = sanitizeFn
        ? sanitizeFn(e.currentTarget.value)
        : e.currentTarget.value;
      setData({
        ...data,
        [key]: value,
      });
    };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newErrors = {} as Record<keyof T, string>;
      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;
        if (
          pattern?.value &&
          !new RegExp(pattern.value).test(value as string)
        ) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value as string)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors(noErrors);

    if (options?.onSubmit) {
      options.onSubmit(data);
    }
  };

  return {
    data,
    handleFormChange,
    handleOnSubmit,
    errors,
  };
};
