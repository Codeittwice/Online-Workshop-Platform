import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import WorkshopFeedbacks from "../WorkshopFeedbacks";

const AdminButtons = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        View user feedback
      </Button>
      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen} size={"xl"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Heading mb={4} color="gray.600">
              User Feedback
            </Heading>
          </DrawerHeader>
          <DrawerBody>
            <WorkshopFeedbacks
              id={props._id}
              windowName={"User Feedback"}
            ></WorkshopFeedbacks>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default AdminButtons;
