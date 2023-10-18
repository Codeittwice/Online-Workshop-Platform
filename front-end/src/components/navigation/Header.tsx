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
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { PATHNAMES } from "@/utils/enums";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { logOutUserRequest } from "../userInteractions/Logout";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Header = (props: any) => {
  const router = useRouter();
  const [user, setUser] = useState<any>({ name: "Bobi Bobev" });
  //Cookies.set("isLoggedIn", "false");
  // Cookies.set("isLoggedIn", "flase");
  // Cookies.set("token", "");
  // Cookies.set("user", "");
  const [loggedIn, setLoggedIn] = useState<boolean>(
    Cookies.get("isLoggedIn") === "true"
  );
  const [shouldLogOut, setShouldLogOut] = useState<boolean>(false);

  //console.log(Cookies.get("isLoggedIn"));
  //console.log(Cookies.get("isLoggedIn") === "true");
  //console.log(loggedIn);
  //let user: any;

  useEffect(() => {
    //if (typeof window !== "undefined") {
    //setUser(JSON.parse(new String(localStorage.getItem("user")).toString()));
    if (loggedIn !== (Cookies.get("isLoggedIn") === "true")) {
      setLoggedIn(Cookies.get("isLoggedIn") === "true");
    }
    if (loggedIn) {
      const _user = JSON.parse(new String(Cookies.get("user")).toString());

      setUser(_user);
    }
  }, [loggedIn, Cookies.get("isLoggedIn") === "true"]);

  ///LOGOUT
  const handleLogOut = () => {
    //console.log("LOGGING OUT");
    setShouldLogOut(true);
    Cookies.set("isLoggedIn", "false");
    //console.log(Cookies.get("isLoggedIn"));
    setLoggedIn(false);
    Cookies.set("token", "");
    Cookies.set("user", "");
    router.push(PATHNAMES.HOME);
  };

  const logOutUserRequest = async () => {
    //if (!values) return;
    const responce = await fetch("http://localhost:8000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user,
        token: Cookies.get("token"),
      }),
    });
    const data = await responce.json();
    setShouldLogOut(false);
    return { data: data };
  };
  const { isLoading, isSuccess, error, data, refetch } = useQuery({
    queryKey: "logout",
    queryFn: logOutUserRequest,
    enabled: shouldLogOut,
  });
  //console.log("_______________________ : " + loggedIn);

  return (
    <>
      <Box
        borderRadius="md"
        backgroundColor="greyAlpha.100"
        px={10}
        py={2}
        h={20}
        shadow="lg"
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
                  <Button
                    colorScheme="whiteAlpha"
                    backgroundColor="white"
                    color="teal.500"
                  >
                    Browse Workshops
                  </Button>
                </NextLink>
              </ButtonGroup>
              <Spacer />
              <Text color="teal.500" textDecoration="underline">
                {user.name}
              </Text>
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost" /* rightIcon={<ChevronDownIcon />}*/
                >
                  <Avatar
                    size="sm"
                    name={user.name}
                    src="https://bit.ly/broken-link"
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Button variant="ghost" onClick={handleLogOut}>
                      Log out
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <NextLink href={PATHNAMES.MYWORKSHOPS} passHref>
                      <Button variant="ghost">My workshops</Button>
                    </NextLink>
                  </MenuItem>
                  <MenuItem>
                    <Button variant="ghost">Wishlist</Button>
                  </MenuItem>
                  <MenuItem>
                    <Button variant="ghost">Acount</Button>
                  </MenuItem>
                  <MenuItem>
                    <Button variant="ghost">Settings</Button>
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
