import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const ErrorItem = (props: any) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>{props.error.title}</AlertTitle>
      <AlertDescription>{props.error.msg.toString()}</AlertDescription>
    </Alert>
  );
};

export default ErrorItem;
