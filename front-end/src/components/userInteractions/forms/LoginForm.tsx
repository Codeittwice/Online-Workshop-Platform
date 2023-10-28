import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useState } from "react";

const UserFormLayout = (props: any) => {
  const { buttonText } = props;

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

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
      error = "Required";
    } else if (value.length < 7) {
      error = "Password must be more than 7 symbols";
    }
    return error;
  }
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, actions) => {
        props.onSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
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
                <InputGroup size="md">
                  <Input {...field} type={show ? "text" : "password"} />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
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
