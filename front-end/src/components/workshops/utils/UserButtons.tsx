import { PATHNAMES } from "@/utils/enums";
import { Button } from "@chakra-ui/react";
import NextLink from "next/link";

const UserButtons = (props: any) => {
  return (
    <>
      <Button
        onClick={props.handleEnrollClick}
        variant="solid"
        colorScheme="teal"
      >
        Enroll
      </Button>
      <NextLink href={PATHNAMES.WORKSHOP_FEEDBACK + "/" + props._id} passHref>
        <Button colorScheme="teal" variant={"ghost"}>
          Give feedback
        </Button>
      </NextLink>
    </>
  );
};
export default UserButtons;
