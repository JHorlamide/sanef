import { Spinner } from "flowbite-react";
import React, { SelectHTMLAttributes } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface SelectOptionType {
  label?: string;
  value?: string;
  name?: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  selectProps: any;
  selectPlaceholder: string;
  selectLoading?: any;
  className: string;
  required?: boolean;
  errors?: any;
  register: UseFormRegister<FieldValues>;
  validationSchema?: any;
  selectOptions: SelectOptionType[];
}

const CustomSelect: React.FC<SelectProps> = ({
  id,
  className,
  register,
  selectProps,
  selectOptions,
  selectLoading,
  validationSchema,
  selectPlaceholder,
  ...rest
}) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <select
      className={className}
      id={id}
      {...rest}
      {...register(id, validationSchema)}
    >
      {selectPlaceholder ? (
        <option value={""} disabled>
          {selectPlaceholder}
        </option>
      ) : null}

      {selectLoading ? (
        <option disabled>
          <Spinner
            color="success"
            aria-label="spinner"
            className="text-buttonColor"
            size={"md"}
          />
        </option>
      ) : (
        selectOptions?.map((option) => (
          <option
            value={option.value || option.name}
            key={`${option.value || option.name}${Math.random()}`}
          >
            {option.label || option.name}
          </option>
        ))
      )}
    </select>
  );
};

export default CustomSelect;
