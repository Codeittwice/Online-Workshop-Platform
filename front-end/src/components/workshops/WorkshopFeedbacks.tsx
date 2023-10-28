import { Spinner } from "@chakra-ui/react";
import Cookies from "js-cookie";
import ErrorItem from "../ErrorItem";
import { useQuery } from "react-query";
import FeedbackSingle from "../userInteractions/feedbacks/FeedbackSingle";

const WorkshopFeedbacks = (props: any) => {
  const id = props.id;

  const { isLoading, error, data } = useQuery("feedbacks", async () => {
    console.log(JSON.parse(new String(Cookies.get("user")).toString())._id);
    const responce = await fetch("http://localhost:8000/feedbacks/" + id, {
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
      {data.map((feedback: any) => {
        return <FeedbackSingle data={feedback}></FeedbackSingle>;
      })}
    </>
  );
};
export default WorkshopFeedbacks;
