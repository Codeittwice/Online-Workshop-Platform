"use client";
import NextLink from "next/link";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { PATHNAMES } from "@/utils/enums";

const Home = () => {
  return (
    <Flex justify="center" textAlign="center">
      <Box marginTop="5%">
        <Heading mb={4}>Welcome to the Online Workshop Portal!</Heading>
        {/* {Cookies.get("loggedIn") !== "true" && (
          <>
            <Text fontSize="xl">
              To search through our vast network of workshops, you'll need to
              log in first.
            </Text>
            <br></br>
            <NextLink href={PATHNAMES.LOGIN} passHref>
              <Button
                rightIcon={<ArrowForwardIcon />}
                colorScheme="teal"
                variant="solid"
              >
                Log in
              </Button>
            </NextLink>
          </>
        )}
        {Cookies.get("loggedIn") === "true" && (
          <>
            <Text fontSize="xl">
              Search through our vast network of workshops.
            </Text>
            <br></br>
            <NextLink href={PATHNAMES.WORKSHOPS} passHref>
              <Button
                rightIcon={<ArrowForwardIcon />}
                colorScheme="teal"
                variant="solid"
              >
                Workshops
              </Button>
            </NextLink>
          </>
        )} */}
        <>
          <Text fontSize="xl">
            To search through our vast network of workshops, you'll need to log
            in first.
          </Text>
          <br></br>
          <NextLink href={PATHNAMES.LOGIN} passHref>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="teal"
              variant="solid"
            >
              Log in
            </Button>
          </NextLink>
        </>
      </Box>
    </Flex>
  );
};
export default Home;
