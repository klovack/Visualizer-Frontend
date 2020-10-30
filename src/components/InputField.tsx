import { useField } from 'formik';
import React, { InputHTMLAttributes, useState } from 'react'
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Message } from 'primereact/message'; 

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string,
  label: string,
  hideLabel?: boolean,
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  hideLabel = true,
  size: _,
  type,
  ...props
}) => {
  const [field, {error, touched}] = useField(props);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  let inputField;
  if (type && type === "password") {
    
    inputField = (
      <div className="p-inputgroup">
        {!show ? () => (
          <Password
            {...field}
            {...props}
            id={field.name}
            placeholder={props.placeholder}
          />
        ): () => (
          <InputText
            {...field}
            {...props}
            id={field.name}
            placeholder={props.placeholder}
          />
        )}
        <Button onClick={handleClick} icon={show ? "pi pi-eye" : "pi pi-eye-slash"} classNam="p-button-link"/>
      </div>
    );
  } else if (type && (type === "date" || type === 'datetime')) {
    inputField = (
      <Calendar
        id={field.name}
        placeholder={props.placeholder}
        showTime
        showSeconds
      />
    );
  } else {
    inputField = (
      <InputText
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
    );
  }

  const hasErrorOrTouched = error && touched;

  return (
    <div className="input-field">
      {!hideLabel && <label htmlFor={field.name} className="p-d-block">{label}</label>}
      {inputField}
      { hasErrorOrTouched && <Message className="input-field__error" severity="error" text={error} /> }
    </div>
  );
}