import { Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';

import React from 'react'
import { InputField } from './InputField';

interface FilterFormProps {
  title?: String,
  subtitle?: String,
}

export const FilterForm: React.FC<FilterFormProps> = ({ title, subtitle }) => {
  const titleJSX = title ? <h3>{title}</h3> : null;
  const subtitleJSX = subtitle ? <p>{subtitle}</p> : null;
  const shouldRenderTitle = title && subtitle;

  return (
    <>
      {shouldRenderTitle &&
        (
          <div className="filter-form__header">
            {titleJSX}
            {subtitleJSX}
          </div>
        )
      }

      <Formik
        initialValues={{
          vendor: '',
          timeStart: '2015-01-01T05:00',
          timeEnd: '2015-01-01T11:59',
          limit: '',
          isUnlimited: false,
        }}
        onSubmit={async (values, { setErrors }) => {

          let url = 'http://localhost:5000/api/statistics'
          Object.keys(values).forEach((key, i) => {
            if (i === 0) {
              url += '?';
            }

            if (values[key]) {
              url += '&' + key + '=' + values[key].toString();
            }
          });
          
          const response = await fetch(
             url.toString(), {
              method: 'GET',
            }
          )

          console.log(response);
        }}
      >
        {/* Start of the form, and pass an object if form needs it */}
        {({
          isSubmitting,
          handleChange,
          values
        }) => (
            <Form className="filter-form__form">
              <InputField
                placeholder="Vendor"
                label="Vendor" 
                name="vendor" 
                hideLabel>
              </InputField>

              <InputField
                type="datetime-local" label="Time Start" name="timeStart" hideLabel>
              </InputField>

              <InputField type="datetime-local" label="Time End" name="timeEnd" hideLabel>
              </InputField>

              <InputField type="number" className="filter-form__limit" label="Limit" name="limit" hideLabel>
              </InputField>

              <Button type="submit" >Refine</Button>
            </Form>

          )}
      </Formik>
    </>
  );
}