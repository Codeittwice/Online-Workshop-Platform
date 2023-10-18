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
} from "@chakra-ui/react";
import NextLink from "next/link";

const WorkshopItem = (props: any) => {
  const { _id, title, description, date, instructor_name, capacity } =
    props.data;
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "250px" }}
        src="https://st3.depositphotos.com/12731704/19191/i/450/depositphotos_191919290-stock-photo-business-colleagues-conference-meeting-room.jpg"
        alt={title}
      />

      <Stack>
        <CardBody>
          <Heading size="md">{title}</Heading>

          {/* <Text py="2">
            
            {description}
          </Text>
          <Text py="2">{date}</Text>
          <Text py="2">{instructor_name}</Text>
          <Text py="2">{capacity}</Text> */}
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

/*<Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "250px" }}
        src="https://st3.depositphotos.com/12731704/19191/i/450/depositphotos_191919290-stock-photo-business-colleagues-conference-meeting-room.jpg"
        alt="JBoxers workshop"
      />

      <Stack>
        <CardBody>
          <Heading size="md">The JBoxers workshop</Heading>

          <Text py="2">
            Learn every interisting thing that work in JBoxers includes. We
            can't wait!
          </Text>
        </CardBody>

        <CardFooter>
          <Button variant="solid" colorScheme="blue" backgroundColor="teal.500">
            Visit Workshop
          </Button>
        </CardFooter>
      </Stack>
    </Card> */

/*<Card align="center">
      <CardBody>
        <Image
          src="https://st3.depositphotos.com/12731704/19191/i/450/depositphotos_191919290-stock-photo-business-colleagues-conference-meeting-room.jpg"
          alt="JBoxers workshop"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">The JBoxers workshop</Heading>
          <Text>
            Learn every interisting thing that work in JBoxers includes. We
            can't wait!
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue" backgroundColor="teal.500">
            Visit Workshop
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card> */
