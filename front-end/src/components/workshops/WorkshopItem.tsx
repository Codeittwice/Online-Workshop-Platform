import { PATHNAMES } from "@/utils/enums";
import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
  Image,
} from "@chakra-ui/react";
import NextLink from "next/link";

const WorkshopItem = (props: any) => {
  const { _id, title } = props.data;
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "250px" }}
        src={"https://picsum.photos/seed/" + _id + "/1000"}
        alt={title}
      />

      <Stack>
        <CardBody>
          <Heading size="md">{title}</Heading>
        </CardBody>

        <CardFooter>
          <NextLink href={PATHNAMES.WORKSHOPS + "/" + _id} passHref>
            <Button variant="solid" colorScheme="teal">
              Visit Workshop
            </Button>
          </NextLink>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default WorkshopItem;
