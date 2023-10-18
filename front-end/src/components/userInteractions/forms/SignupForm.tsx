import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

const UserFormLayout = (props: any) => {
  const { buttonText } = props;
  function validateName(value: String) {
    let error;
    if (!value) {
      error = "Name is required";
    }
    return error;
  }
  function validateEmail(value: any) {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }
  function validatePassword(value: String) {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value.length < 7) {
      error = "Password must be more than 7 symbols";
    }
    return error;
  }
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={(values, actions) => {
        props.onSubmit(values);
        //alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Field name="name" validate={validateName}>
            {({ field, form }: any) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel>Name</FormLabel>
                <Input {...field} type="name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="email" validate={validateEmail}>
            {({ field, form }: any) => (
              <FormControl isInvalid={form.errors.email && form.touched.email}>
                <FormLabel>Email Address</FormLabel>
                <Input {...field} type="email" />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="password" validate={validatePassword}>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.password && form.touched.password}
              >
                <FormLabel>Password</FormLabel>
                <Input {...field} type="password" />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            {buttonText}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
export default UserFormLayout;

/* 
<FormControl>
  <FormLabel>Name</FormLabel>
  <Input
    type="name"
    onChange={formik.handleChange}
    value={formik.values.name}
  />
  <FormLabel>Email address</FormLabel>
  <Input
    type="email"
    onChange={formik.handleChange}
    value={formik.values.email}
  />
  <FormLabel>Password</FormLabel>
  <Input
    type="password"
    onChange={formik.handleChange}
    value={formik.values.password}
  />
  <FormHelperText textAlign="right">At least 7 characters long.</FormHelperText>
  { <FormLabel>Confirm password</FormLabel>
      <Input
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <FormHelperText textAlign="right">
        At least 7 characters long.
      </FormHelperText> }
  <Box position="relative" padding="5"></Box>
  <Button type="submit" backgroundColor="teal.500" color="white">
    {props.buttonText}
  </Button>
</FormControl>;
*/
