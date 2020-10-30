import { FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputRightElement, NumberInput, NumberInputField } from '@chakra-ui/core';
import { useField } from 'formik';
import React, { InputHTMLAttributes, useState } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string,
  label: string,
  hideLabel?: Boolean,
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  type,
  hideLabel,
  ...props
}) => {
  const [field, {error, touched}] = useField(props);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  let inputField;
  if (type && type === "password") {
    
    inputField = (
      <InputGroup size="md">
        <Input
          type={show ? "text" : "password"}
          variant="outline"
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
        />
        <InputRightElement>
          <IconButton
            aria-label="Show password or Hide"
            onClick={handleClick}
            variant="ghost"
            icon={show ? "view" : "view-off"} />
        </InputRightElement>
      </InputGroup>
    );
  } else if (type && type === 'number') {
    inputField = (
      <NumberInput
        defaultValue={field.value}
      >
        <NumberInputField
          type='number'
          {...field}
          {...props}
          id={field.name}
        />
      </NumberInput>
    );
  } else {
    inputField = (
      <Input
        type={type}
        {...field}
        {...props}
        id={field.name}
        variant="outline"
        placeholder={props.placeholder} />
    );
  }

  const hasErrorOrTouched = error && touched; 

  return (
    <FormControl className={props.className} isInvalid={!!error}>
      {!hideLabel && <FormLabel htmlFor={field.name}>{label}</FormLabel> }
      {inputField}
      { hasErrorOrTouched ? <FormErrorMessage>{error}</FormErrorMessage> : null }
    </FormControl>
  );
}