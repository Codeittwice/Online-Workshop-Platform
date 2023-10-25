import { PATHNAMES } from "@/utils/enums";
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
  Box,
  Flex,
  SimpleGrid,
  Spacer,
  Spinner,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { useQuery } from "react-query";
import { useState } from "react";
import Cookies from "js-cookie";
import WorkshopItem from "../workshops/WorkshopItem";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import ErrorItem from "../ErrorItem";

const UserEnrollments = (props: any) => {
  const {
    isLoading,
    error,
    data: workshops,
  } = useQuery("myworkshops", async () => {
    if (Cookies.get("isLoggedIn") !== "true")
      return { error: { title: "Cannot find user!", msg: "Please log in!" } };

    const user = JSON.parse(new String(Cookies.get("user")).toString());
    console.log(user);

    const responce = await fetch(
      "http://localhost:8000/myworkshops/" + user._id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    //const data = await responce.json();
    return await responce.json();
  });

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (workshops.error) {
    return <ErrorItem error={workshops.error} />;
  }

  return (
    <>
      <Heading mb={4} color="gray.600">
        {" "}
        My Workshops
      </Heading>
      <Spacer />
      <Flex>
        {workshops.length > 0 && (
          <SimpleGrid columns={[2, null, 3]} spacing="40px">
            {workshops.map((workshop: any) => {
              return (
                <Box height="300px" key={workshop._id}>
                  <WorkshopItem data={workshop} />
                </Box>
              );
            })}
          </SimpleGrid>
        )}
        {workshops.length === 0 && (
          <Flex justify="center" textAlign="left">
            <Box marginTop="5%">
              <Text fontSize="2xl">
                You haven't enrolled for any workshops.
              </Text>
              <NextLink href={PATHNAMES.WORKSHOPS} passHref>
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  colorScheme="teal"
                  variant="solid"
                >
                  Let's change that!
                </Button>
              </NextLink>
            </Box>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default UserEnrollments;
