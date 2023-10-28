import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import StarRating from "../rating/StarRating";

const FeedbackSingle = (props: any) => {
  return (
    <>
      <Card margin={"1rem"}>
        <CardHeader>
          <Heading size="md">{props.data.workshop_title}</Heading>
        </CardHeader>

        <CardBody>
          <b>By: </b>
          <Text color={"teal.500"}>
            {props.data.user_name + " "}
            <Avatar
              size="xs"
              name={props.data.user_name}
              src="https://bit.ly/broken-link"
            />
          </Text>

          <Spacer />
          <b>Rating:</b>
          <StarRating rating={props.data.rating} />
        </CardBody>
        <CardFooter>
          <Text>
            <b>Description:</b> {props.data.feedback_text}
          </Text>
        </CardFooter>
      </Card>
    </>
  );
};
export default FeedbackSingle;
