import { Form, Formik } from 'formik';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputSwitch } from 'primereact/inputswitch';

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
          timeStart: '',
          timeEnd: '',
          limit: '',
          isUnlimited: false,
        }}
        onSubmit={(_, { setErrors }) => {
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
                <InputText
                  name="vendor"
                  placeholder="Vendor"
                />
              </InputField>

              <InputField label="Time Start" name="timeStart" hideLabel>
                <Calendar
                  name="timeStart"
                  placeholder="2020-01-02 05:42"
                  showTime
                  showSeconds
                />
              </InputField>

              <InputField label="Time Start" name="timeEnd" hideLabel>
                <Calendar
                  name="timeStart"
                  placeholder="2020-01-02 05:42"
                  showTime
                  showSeconds
                />
              </InputField>

              <InputField className="filter-form__limit" label="Time Start" name="timeStart" hideLabel>
                <InputNumber
                  name="limit"
                  placeholder="20"
                />
              </InputField>

              <div className="p-d-flex p-ai-center limit-switcher">
                <label htmlFor="isUnlimited" className="p-pr-2">Unlimited</label>
                <InputSwitch
                  checked={values.isUnlimited}
                  id="isUnlimited"
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" label="Refine" />
            </Form>

          )}
      </Formik>
    </>
  );
}