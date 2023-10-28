import { Box, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { PATHNAMES } from "@/utils/enums";
import { ErrorType } from "@/utils/types";
import ErrorItem from "../ErrorItem";
import NewWorkshopForm from "./NewWorkshopForm";

const NewWorkshop = (props: any) => {
  const [requestError, setRequestError] = useState<ErrorType>();
  const router = useRouter();

  const createWorkshopRequest = async (_values: any) => {
    const responce = await fetch(`http://localhost:8000/workshops/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify({
        title: _values.title,
        description: _values.description,
        date: _values.date,
        instructor_name: _values.instructor_name,
        capacity: _values.capacity,
      }),
    });
    const data = await responce.json();
    if (data.error) setRequestError(data);
  };

  const handleSubmit = async (_values: any) => {
    await createWorkshopRequest(_values);

    if (!requestError) router.push(PATHNAMES.WORKSHOPS);
  };

  if (requestError?.error) {
    return <ErrorItem error={requestError.error} />;
  }

  return (
    <>
      <Flex justify="center">
        <Box
          borderRadius="md"
          backgroundColor="greyAlpha.300"
          px={10}
          h="60%"
          w="40%"
          textAlign="center"
          shadow="dark-lg"
          padding="3rem"
        >
          <Heading mb={4} color="gray.600">
            {"Add New Workshop"}
          </Heading>

          <NewWorkshopForm onSubmit={handleSubmit}></NewWorkshopForm>
        </Box>
      </Flex>
    </>
  );
};

export default NewWorkshop;
