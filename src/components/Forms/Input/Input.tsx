import { FC, HTMLProps, memo } from "react";

interface InputProps extends HTMLProps<HTMLInputElement> {
  value?: string;
  name: string;
  label?: string;
  hasError?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = memo(
  ({ value, label, name, onChange = () => {}, hasError, ...props }) => (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        value={value}
        name={name}
        className={hasError ? "error" : undefined}
        onChange={onChange}
        {...props}
      />
    </>
  )
);
