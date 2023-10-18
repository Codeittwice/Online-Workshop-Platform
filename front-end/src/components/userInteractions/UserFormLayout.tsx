import { PATHNAMES, USER_FORM_TYPE } from "@/utils/enums";
import { Flex, Heading, Box, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";
import { log } from "console";

const UserFormLayout = (props: any) => {
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [linkRef, setLinkRef] = useState("");
  const [buttonText, setButtonText] = useState("");

  const showLogin = props.formType === USER_FORM_TYPE.LOGIN ? true : false;

  useEffect(() => {
    switch (props.formType) {
      case USER_FORM_TYPE.LOGIN:
        setHeading("Log in");
        setText("Don't have an account?");
        setLink("Sign up");
        setButtonText("Log in");
        setLinkRef(PATHNAMES.SIGNUP);
        break;

      case USER_FORM_TYPE.SIGNUP:
        setHeading("Create an account");
        setText("Already have an account?");
        setLink("Log in");
        setButtonText("Create account");
        setLinkRef(PATHNAMES.LOGIN);
        break;
    }
  }, []);

  const handleSubmit = (_values: any) => {
    console.log(_values);

    props.onSubmit(_values);
  };

  return (
    <>
      {" "}
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
            {heading}
          </Heading>
          <Text>
            {text}{" "}
            <Link href={linkRef} color="teal.500">
              {link}
            </Link>
          </Text>
          <Box position="relative" padding="5"></Box>

          {showLogin && (
            <LoginForm buttonText={buttonText} onSubmit={handleSubmit} />
          )}
          {!showLogin && (
            <SignupForm buttonText={buttonText} onSubmit={handleSubmit} />
          )}
        </Box>
      </Flex>
    </>
  );
};

export default UserFormLayout;
