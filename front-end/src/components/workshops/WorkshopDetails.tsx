import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Image,
  Text,
  ButtonGroup,
  CardHeader,
  Flex,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { PATHNAMES } from "@/utils/enums";
import { ErrorType } from "@/utils/types";
import ErrorItem from "../ErrorItem";
import UserButtons from "./utils/UserButtons";
import AdminButtons from "./utils/AdminButtons";

const WorkshopDetails = (props: any) => {
  const [enrollError, setEnrollError] = useState<ErrorType>();
  const router = useRouter();
  const id = props.id;

  const {
    isLoading,
    error,
    data: workshop,
  } = useQuery("workshopSingle", async () => {
    const responce = await fetch(`http://localhost:8000/workshop/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${Cookies.get("token")}`,
      },
    });
    return responce.json();
  });

  const enrollRequest = async () => {
    const responce = await fetch(`http://localhost:8000/enroll/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify({
        user: Cookies.get("user"),
      }),
    });
    const data = await responce.json();
    if (data.error) setEnrollError(data);
  };

  const handleEnrollClick = async () => {
    await enrollRequest();

    if (!enrollError) router.push(PATHNAMES.MY_ENROLLMENTS);
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (enrollError?.error) {
    return <ErrorItem error={enrollError.error} />;
  }

  return (
    <>
      <Flex textAlign="center" justify="center" marginTop="">
        {workshop && (
          <Card maxW="xl" align="center">
            <CardHeader>
              <Image
                src={"https://picsum.photos/seed/" + id + "/1000"}
                alt={workshop.title}
                borderRadius="lg"
              />
            </CardHeader>
            <CardBody>
              <Stack mt="6" spacing="3">
                <Heading size="xl" color="teal.500">
                  {workshop.title}
                </Heading>
                <Spacer />
                <Text>{workshop.description}</Text>
                <Text>Our instructor: {workshop.instructor_name}</Text>
                <Text>Date: {workshop.date}</Text>
                <Text>Capacity: {workshop.capacity} people</Text>
              </Stack>
            </CardBody>
            <Spacer />
            <CardFooter>
              <ButtonGroup alignItems="center">
                {Cookies.get("isAdmin") !== "true" && (
                  <UserButtons
                    _id={workshop._id}
                    handleEnrollClick={handleEnrollClick}
                  />
                )}
                {Cookies.get("isAdmin") === "true" && (
                  <AdminButtons _id={workshop._id} />
                )}
              </ButtonGroup>
            </CardFooter>
          </Card>
        )}
      </Flex>
    </>
  );
};

export default WorkshopDetails;
