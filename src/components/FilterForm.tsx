import { Alert, AlertIcon, Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';

import React, { useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';
import { Filter } from '../models/filter';
import { InputField } from './InputField';
import { setFilter, clearFilter, addJourney, clearJourney } from '../redux/actions';
import { IResponseJourney, Journey } from '../models/journey';

interface FilterFormProps {
  title?: String,
  subtitle?: String,
}

export const FilterForm: React.FC<FilterFormProps> = ({ title, subtitle }) => {
  const titleJSX = title ? <h3>{title}</h3> : null;
  const subtitleJSX = subtitle ? <p>{subtitle}</p> : null;
  const shouldRenderTitle = title && subtitle;

  const [errors, setFunctionError] = useState([] as Error[]);
  const filter: Filter = useSelector(state => state['filter']);
  const dispatch = useDispatch();

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
          vendor: filter.vendors,
          timeStart: filter.timeStart ? filter.timeStart : '2015-01-01T05:00',
          timeEnd: filter.timeEnd ? filter.timeEnd : '2015-01-01T11:59',
          limit: filter.limit,
          isUnlimited: filter.isUnlimited,
        } as Filter}
        onSubmit={async (values, { setErrors }) => {
          setFunctionError([]);
          dispatch(setFilter(values))

          let url = 'http://localhost:5000/api/statistics'
          Object.keys(values).forEach((key, i) => {
            if (i === 0) {
              url += '?';
            }

            if (values[key]) {
              url += '&' + key + '=' + values[key].toString();
            }
          });
          
          try {
            const response = await fetch(
               url.toString(), {
                method: 'GET',
              }
            )
  
            dispatch(clearJourney());
            response.json().then((res) => {
              if (res.journeys) {
                const journeys: Journey[] = []
                res.journeys.forEach((element: IResponseJourney) => {
                  journeys.push(Journey.fromResponse(element));
                });
  
                dispatch(addJourney(...journeys));
              }
            });
          } catch (error) {
            console.log(error);
            setFunctionError([
              new Error('Internal server Error: ' + error.toString())
            ]);
          }
        }}
      >
        {/* Start of the form, and pass an object if form needs it */}
        {({
          isSubmitting,
          handleChange,
          values,
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

              <InputField type="number" placeholder="Limit" className="filter-form__limit" label="Limit" name="limit" hideLabel>
              </InputField>

              {/* In case i want to show the toggle */}
              {/* <Flex justify="center" align="center">
                <FormLabel htmlFor="isUnlimited">Unlimited</FormLabel>
                <Switch id="isUnlimited" name="isUnlimited" />
              </Flex> */}

              <Button type="submit" isLoading={isSubmitting} loadingText="Filtering" >Refine</Button>
            </Form>

          )}
      </Formik>

      {errors.length > 0 && (
        <Alert className="filter-form__error" status="error">
          <AlertIcon />
          {errors.map((err: Error, i) => (
            <p key={'error' + i}>{err.message}</p>
          ))}
        </Alert>
      )}

    </>
  );
}


// If using connect
const mapStateToProps = (state, ownProps) => ({
  ownProps,
  filter: state.filter,
});

const mapDispatchToProps = {
  setFilter,
  clearFilter,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterForm);