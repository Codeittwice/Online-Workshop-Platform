import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
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
