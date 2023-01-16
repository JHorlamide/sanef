import React, { InputHTMLAttributes } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

export interface CustomInputProps {
  id: string;
  className: string;
  inputProps: any;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  required?: boolean;
  type: string;
  register: UseFormRegister<FieldValues>;
  errors?: any;
  className: string;
  validationSchema?: any;
  parentClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  required,
  type,
  register,
  errors,
  className,
  parentClassName,
  validationSchema,
  ...rest
}) => {
  return (
    <div className={parentClassName}>
      <label htmlFor={id}>
        {label}
        {required && "*"}
      </label>
      <input
        id={id}
        type={type}
        {...register(id, validationSchema)}
        className={className}
        {...rest}
      />
      {errors && errors[id]?.type === "required" && (
        <small className="text-red-500">{errors[id]?.message}</small>
      )}
      {errors && errors[id]?.type === "minLength" && (
        <small className="text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

const CustomInput = ({
  id,
  className,
  inputProps,
  ...rest
}: CustomInputProps & React.HTMLProps<HTMLInputElement>) => {
  const ref = inputProps.ref;
  return (
    <input
      id={id}
      className={className}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...inputProps}
      ref={ref as any}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
};

export default CustomInput;
