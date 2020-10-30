import { Formik } from 'formik';
import React from 'react'

interface FilterFormProps {
  title?: String,
  subtitle?: String,
}

export const FilterForm: React.FC<FilterFormProps> = ({title, subtitle}) => {
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
          limit: 20,
          isUnlimited: false,
        }}
        onSubmit={() => {}}
      >
        {/* Start of the form, and pass an object if form needs it */}
        {({
          isSubmitting
        }) => {
        }}

      </Formik>
    </>
  );
}