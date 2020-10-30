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
          timeStart: new Date('2010/01/01 05:00'),
          timeEnd: new Date('2010/01/01 11:59'),
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
              url += '&' + key + '=' + values[key] as string;
            }
          });
          
          const response = await fetch(
             url.toString(), {
              method: 'GET',
              // headers: {
              //   'Content-Type': 'application/json'
              // }
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
              <InputField label="Vendor" name="vendor" hideLabel>
               
              </InputField>

              <InputField label="Time Start" name="timeStart" hideLabel>
              </InputField>

              <InputField label="Time End" name="timeEnd" hideLabel>

              </InputField>

              <InputField className="filter-form__limit" label="Time Start" name="timeStart" hideLabel>
              </InputField>

            </Form>

          )}
      </Formik>
    </>
  );
}