"use client";
import NextLink from "next/link";
import {
  Flex,
  Heading,
  Spacer,
  ButtonGroup,
  Button,
  Box,
  Avatar,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import {
  MdAccountCircle,
  MdFeedback,
  MdInventory,
  MdLogout,
  MdSettings,
} from "react-icons/md";

import { PATHNAMES } from "@/utils/enums";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Header = (props: any) => {
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [loggedIn, setLoggedIn] = useState<boolean>(
    Cookies.get("isLoggedIn") === "true"
  );
  // Cookies.set("isLoggedIn", "flase");
  // Cookies.set("token", "");
  // Cookies.set("user", "");
  console.log(Cookies.get("isLoggedIn") === "true");
  useEffect(() => {
    console.log("USEEFFECT");
    if (loggedIn !== (Cookies.get("isLoggedIn") === "true")) {
      console.log("SETLOGGEDIN");
      setLoggedIn(Cookies.get("isLoggedIn") === "true");
    }
    if (
      Cookies.get("isLoggedIn") === "true" /*&&
      user !== JSON.parse(new String(Cookies.get("user")).toString())*/
    ) {
      console.log("SETUSER");
      const _user = JSON.parse(new String(Cookies.get("user")).toString());

      setUser(_user);
    }
  }, [Cookies.get("isLoggedIn") === "true"]);

  ///LOGOUT
  const handleLogOut = async () => {
    await logOutUserRequest();
    setLoggedIn(false);

    Cookies.set("isLoggedIn", "false");
    Cookies.set("isAdmin", "false");
    Cookies.set("token", "");
    Cookies.set("user", "");
    router.push(PATHNAMES.HOME);
  };

  const logOutUserRequest = async () => {
    await fetch("http://localhost:8000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user,
        token: Cookies.get("token"),
      }),
    });
  };
  if (typeof window === "undefined") {
    return <Spinner />;
  }

  return (
    <>
      <Box
        borderRadius="xl"
        backgroundColor="greyAlpha.100"
        px={10}
        py={2}
        h={20}
        shadow="lg"
        margin={"1rem"}
      >
        <Flex
          minWidth="max-content"
          alignItems="center"
          justifyContent="center"
          gap="2"
          padding="1rem"
        >
          <Box>
            <NextLink href={PATHNAMES.HOME} passHref>
              <Button colorScheme="teal" variant="ghost">
                <Heading mb={4} color="gray.600">
                  Workshop Portal
                </Heading>
              </Button>
            </NextLink>
          </Box>

          {loggedIn && (
            <>
              <ButtonGroup gap="2" paddingLeft="5rem">
                <NextLink href={PATHNAMES.WORKSHOPS} passHref>
                  <Button colorScheme="teal" variant={"ghost"}>
                    Browse Workshops
                  </Button>
                </NextLink>
                {Cookies.get("isAdmin") === "true" && (
                  <NextLink href={PATHNAMES.NEW_WORKSHOP} passHref>
                    <Button colorScheme="teal" variant={"ghost"}>
                      Add New Workshop
                    </Button>
                  </NextLink>
                )}
              </ButtonGroup>
              <Spacer />
              <Text color="teal.500" textDecoration="underline">
                {user.name}
              </Text>
              <Menu>
                <MenuButton as={Button} variant="ghost">
                  <Avatar
                    size="sm"
                    name={user.name}
                    src="https://bit.ly/broken-link"
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Button
                      variant="ghost"
                      rightIcon={<Icon as={MdAccountCircle} />}
                    >
                      Acount
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      variant="ghost"
                      rightIcon={<Icon as={MdSettings} />}
                    >
                      Settings
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <NextLink href={PATHNAMES.MY_ENROLLMENTS} passHref>
                      <Button
                        variant="ghost"
                        rightIcon={<Icon as={MdInventory} />}
                      >
                        Enrollments
                      </Button>
                    </NextLink>
                  </MenuItem>
                  <MenuItem>
                    <NextLink href={PATHNAMES.FEEDBACKS} passHref>
                      <Button
                        variant="ghost"
                        rightIcon={<Icon as={MdFeedback} />}
                      >
                        Feedbacks
                      </Button>
                    </NextLink>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      variant="ghost"
                      color={"red"}
                      onClick={handleLogOut}
                      rightIcon={<Icon as={MdLogout} />}
                    >
                      Log out
                    </Button>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
          {!loggedIn && (
            <>
              <Spacer />
              <ButtonGroup gap="2">
                <NextLink href={PATHNAMES.SIGNUP} passHref>
                  <Button colorScheme="teal">Sign Up</Button>
                </NextLink>
                <NextLink href={PATHNAMES.LOGIN} passHref>
                  <Button colorScheme="teal">Log in</Button>
                </NextLink>
              </ButtonGroup>
            </>
          )}
        </Flex>
      </Box>
    </>
  );
};
export default Header;
