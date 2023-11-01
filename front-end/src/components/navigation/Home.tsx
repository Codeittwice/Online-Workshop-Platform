"use client";
import NextLink from "next/link";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { PATHNAMES } from "@/utils/enums";
import { useState } from "react";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    Cookies.get("isLoggedIn") ? true : false
  );
  return (
    <Flex justify="center" textAlign="center">
      <Box marginTop="5%">
        <Heading mb={4}>Welcome to the Online Workshop Portal!</Heading>
        {!isLoggedIn && (
          <>
            <Text fontSize="xl">
              To search through our vast network of workshops, you'll need to
              log in first.
            </Text>
            <br />
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
        {isLoggedIn && (
          <>
            <Text fontSize="xl">
              Search through our vast network of workshops.
            </Text>
            <br />
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
        )}
      </Box>
    </Flex>
  );
};
export default Home;
