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
  const [user, setUser] = useState<any>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  /// COOKIES ARE UNDEFINED WHEN WINDOW IS UNDEFINED
  // console.log(typeof window);
  // console.log("Cookies: ");
  // console.log(Cookies.get());

  useEffect(() => {
    if (typeof window !== undefined) {
      if (Cookies.get("isLoggedIn") ? true : false) {
        setIsLoggedIn(true);
        setUser(JSON.parse(new String(Cookies.get("user")).toString()));
      } else {
        setIsLoggedIn(false);
      }
    } else {
      returnSpinner();
    }
  }, [typeof window, Cookies.get("isLoggedIn") === "true"]);

  /// insert code (*)

  ///LOGOUT
  const handleLogOut = async () => {
    await logOutUserRequest();
    setIsLoggedIn(false);

    Cookies.remove("isLoggedIn");
    Cookies.set("isAdmin", "false");
    Cookies.set("token", "");
    Cookies.set("user", "");

    /*
    Cookies.remove("isAdmin");
    Cookies.remove("token");
    Cookies.remove("user"); */
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

  const returnSpinner = () => {
    return <Spinner />;
  };
  // if (typeof window === "undefined") {
  //   return <Spinner />;
  // }
  // return <></>;
  // return <></>;

  return (
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

        {isLoggedIn && (
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
        )}
        <Spacer />

        {isLoggedIn && (
          <>
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
                  Acount
                  <Icon as={MdAccountCircle} marginLeft={"0.5rem"} />
                </MenuItem>

                <MenuItem>
                  Settings
                  <Icon as={MdSettings} marginLeft={"0.5rem"} />
                </MenuItem>
                <MenuItem>
                  <NextLink href={PATHNAMES.MY_ENROLLMENTS} passHref>
                    Enrollments
                    <Icon as={MdInventory} marginLeft={"0.5rem"} />
                  </NextLink>
                </MenuItem>
                <MenuItem>
                  <NextLink href={PATHNAMES.FEEDBACKS} passHref>
                    Feedbacks
                    <Icon as={MdFeedback} marginLeft={"0.5rem"} />
                  </NextLink>
                </MenuItem>
                <MenuItem color={"red"} onClick={handleLogOut}>
                  Log out
                  <Icon as={MdLogout} marginLeft={"0.5rem"} />
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
        {!isLoggedIn && (
          <>
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
  );
};
export default Header;

/// --->  (*)
//console.log(Cookies.get("isLoggedIn") === "true");
// useEffect(() => {
//   console.log("USEEFFECT");
//   if (isLoggedIn !== (Cookies.get("isLoggedIn") === "true")) {
//     console.log("SETLOGGEDIN");
//     setIsLoggedIn(Cookies.get("isLoggedIn") === "true");
//   }
//   if (
//     Cookies.get("isLoggedIn") === "true" &&
//     user !== JSON.parse(new String(Cookies.get("user")).toString())
//   ) {
//     console.log("SETUSER");
//     const _user = JSON.parse(new String(Cookies.get("user")).toString());

//     setUser(_user);
//   }
// }, [Cookies.get("isLoggedIn") === "true"]);
