import { Heading, Spinner } from "@chakra-ui/react";
import Cookies from "js-cookie";
import ErrorItem from "../../ErrorItem";
import { useQuery } from "react-query";
import FeedbackSingle from "./FeedbackSingle";
import { useRouter } from "next/router";

const Feedbacks = (props: any) => {
  const router = useRouter();

  const { isLoading, error, data } = useQuery("feedbacks", async () => {
    console.log(JSON.parse(new String(Cookies.get("user")).toString())._id);
    const responce = await fetch("http://localhost:8000/feedbacks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${Cookies.get("token")}`,
      },
    });

    return responce.json();
  });

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (data.error) {
    return <ErrorItem error={data.error} />;
  }

  return (
    <>
      <Heading mb={4} color="gray.600">
        My Feedbacks
      </Heading>
      {data.map((feedback: any) => {
        return <FeedbackSingle data={feedback}></FeedbackSingle>;
      })}
    </>
  );
};
export default Feedbacks;
