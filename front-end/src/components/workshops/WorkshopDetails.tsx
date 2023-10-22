import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
  Image,
  Text,
  ButtonGroup,
  Divider,
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

const WorkshopDetails = (props: any) => {
  const router = useRouter();
  const id = props.id;
  useState(() => {});
  const [shouldEnroll, setShouldEnroll] = useState<boolean>(false);

  const {
    isLoading,
    error,
    data: workshop,
  } = useQuery("workshopSingle", async () => {
    const responce = await fetch(`http://localhost:8000/workshops/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authentication: `Bearer ${localStorage.getItem("token")}`,
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
    //const data = await responce.json();
    setShouldEnroll(false);
  };

  const handleEnrollClick = async () => {
    await enrollRequest();
    setShouldEnroll(true);
    //router.back();
    router.push(PATHNAMES.MYWORKSHOPS);
  };

  if (isLoading) {
    return <Spinner />;
  }

  //const { title, description, date, instructor_name, capacity } = workshop;
  return (
    <Flex textAlign="center" justify="center" marginTop="">
      {workshop && (
        <Card maxW="xl" align="center">
          <CardHeader>
            <Image
              src={"https://picsum.photos/seed/" + workshop._id + "/1000"}
              //src="https://st3.depositphotos.com/12731704/19191/i/450/depositphotos_191919290-stock-photo-business-colleagues-conference-meeting-room.jpg"
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
              <Button
                onClick={handleEnrollClick}
                variant="solid"
                colorScheme="teal"
              >
                Enroll
              </Button>
              <Button variant="ghost" colorScheme="teal">
                Add to wishlist
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      )}
    </Flex>
  );
};

export default WorkshopDetails;
