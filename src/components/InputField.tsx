import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string,
  label: string,
  hideLabel?: boolean,
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  hideLabel = false,
  type,
  children,
  ...props
}) => {
  const [field, {error, touched}] = useField(props);

  const hasErrorOrTouched = error && touched;

  return (
    <div className={props.className + ' input-field'}>
      {!hideLabel && <label htmlFor={field.name} className="p-d-block">{label}</label>}
      {children}
      { hasErrorOrTouched && {error}}
    </div>
  );
}