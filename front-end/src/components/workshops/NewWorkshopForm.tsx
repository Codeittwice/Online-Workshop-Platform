import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";

const NewWorkshopForm = (props: any) => {
  function validateTitle(value: String) {
    let error;
    if (!value) {
      error = "Required";
    }
    return error;
  }
  function validateDescription(value: String) {
    let error;
    if (!value) {
      error = "Required";
    } else if (value.length < 20) {
      error = "Description must be more than 20 characters";
    }
    return error;
  }
  function validateDate(value: string) {
    let error;
    if (!value) {
      error = "Required";
    } else if (Date.parse(value) < Date.now()) {
      error = "Date must not be in the past";
    }
    return error;
  }
  function validateInstructorName(value: String) {
    let error;
    if (!value) {
      error = "Required";
    }
    return error;
  }
  function validateCapacity(value: number) {
    let error;
    if (!value) {
      error = "Required";
    } else if (value < 20) {
      error = "Capacity needs to be more than 20 people";
    }
    return error;
  }

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        date: "",
        instructor_name: "",
        capacity: "",
      }}
      onSubmit={(values, actions) => {
        props.onSubmit(values);

        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Field name="title" validate={validateTitle}>
            {({ field, form }: any) => (
              <FormControl isInvalid={form.errors.title && form.touched.title}>
                <FormLabel>Title</FormLabel>
                <Input {...field} type="name" />
                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="description" validate={validateDescription}>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.description && form.touched.description}
              >
                <FormLabel>Description</FormLabel>
                <Textarea {...field} type="text" />
                <FormErrorMessage>{form.errors.description}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="date" validate={validateDate}>
            {({ field, form }: any) => (
              <FormControl isInvalid={form.errors.date && form.touched.date}>
                <FormLabel>Date</FormLabel>
                <Input {...field} type="date" />
                <FormErrorMessage>{form.errors.date}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="instructor_name" validate={validateInstructorName}>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={
                  form.errors.instructor_name && form.touched.instructor_name
                }
              >
                <FormLabel>Instructor</FormLabel>
                <Input {...field} type="name" />
                <FormErrorMessage>
                  {form.errors.instructor_name}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="capacity" validate={validateCapacity}>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.capacity && form.touched.capacity}
              >
                <FormLabel>Capacity</FormLabel>
                <Input {...field} type="number" />
                <FormErrorMessage>{form.errors.capacity}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            {"Create workshop"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default NewWorkshopForm;
