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

const WorkshopDetails = (props: any) => {
  const id = props.id;
  useState(() => {});
  const [workshop, setWorkshop] = useState<any>();
  const [shouldEnroll, setShouldEnroll] = useState<boolean>(false);

  const {
    isLoading: isLoadingWorkshops,
    error: errorWorkshops,
    data: dataWorkshops,
  } = useQuery("workshopSingle", async () => {
    const responce = await fetch(`http://localhost:8000/workshops/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authentication: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await responce.json();
    setWorkshop(data);
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

  const {
    isLoading: isLoadingEnroll,
    error: errorEnroll,
    data: dataEnroll,
  } = useQuery({
    queryKey: "enroll",
    queryFn: enrollRequest,
    enabled: shouldEnroll,
  });

  const handleEnrollClick = () => {
    setShouldEnroll(true);
  };

  //const { title, description, date, instructor_name, capacity } = workshop;
  return (
    <Flex textAlign="center" justify="center" marginTop="-150">
      {workshop && (
        <Card maxW="xl" align="center">
          <CardHeader>
            <Image
              src="https://st3.depositphotos.com/12731704/19191/i/450/depositphotos_191919290-stock-photo-business-colleagues-conference-meeting-room.jpg"
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
      {!workshop && <Spinner></Spinner>}
    </Flex>
  );
};

export default WorkshopDetails;
