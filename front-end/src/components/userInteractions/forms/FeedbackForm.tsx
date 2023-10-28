import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  FormErrorMessage,
  Spinner,
  RadioGroup,
  Select,
  Spacer,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import StarRating from "../rating/StarRating";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import ErrorItem from "@/components/ErrorItem";

const UserFormLayout = (props: any) => {
  const [rating, setRating] = useState(0);
  const { isLoading, error, data } = useQuery("workshops", async () => {
    const responce = await fetch("http://localhost:8000/workshops", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${Cookies.get("token")}`,
      },
    });

    return responce.json();
  });

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (data.error) {
    return <ErrorItem error={data.error} />;
  }

  return (
    <Formik
      initialValues={{
        text: " ",
        rating: 0,
        user_id: JSON.parse(new String(Cookies.get("user")).toString())._id,
        workshop_id: props.defaultWorkshopId,
      }}
      onSubmit={(values, actions) => {
        values.rating = rating;
        props.onSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Field name="workshop_id">
            {({ field, form }: any) => (
              <Select
                {...field}
                variant="outline"
                placeholder="Select workshop"
              >
                {" "}
                {data.map((workshop: any) => {
                  return (
                    <option key={workshop._id} value={workshop._id}>
                      <b>{workshop.title}</b>
                    </option>
                  );
                })}
              </Select>
            )}
          </Field>
          <Spacer />
          <Field name="workshop_id">
            {({ field, form }: any) => (
              <StarRating {...field} rating={rating} setRating={setRating} />
            )}
          </Field>
          <Spacer />
          <Field name="text">
            {({ field, form }: any) => (
              <FormControl isInvalid={form.errors.text && form.touched.text}>
                <FormLabel>Description</FormLabel>
                <Input {...field} type="text" />
                <FormErrorMessage>{form.errors.text}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Spacer />
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            {"Submit feedback"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
export default UserFormLayout;
