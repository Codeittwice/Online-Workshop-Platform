import { Button, Heading, Spacer, Spinner } from "@chakra-ui/react";
import FeedbackForm from "../forms/FeedbackForm";
import Cookies from "js-cookie";
import ErrorItem from "../../ErrorItem";
import { useQuery } from "react-query";
import FeedbackSingle from "./FeedbackSingle";
import { PATHNAMES } from "@/utils/enums";
import { useRouter } from "next/router";

const NewFeedback = (props: any) => {
  const router = useRouter();
  //   const workshop_id = router.pathname
  //     .split("/feedback")[0]
  //     .split("/workshops")[1];
  //   console.log(workshop_id);
  const workshop_id = router.query._id;

  const handleSubmit = async (_values: any) => {
    const responce = await fetch(`http://localhost:8000/feedback/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify({
        user_id: _values.user_id,
        workshop_id: _values.workshop_id,
        feedback_text: _values.text,
        rating: _values.rating,
      }),
    });

    router.push(PATHNAMES.FEEDBACKS);
  };

  return (
    <FeedbackForm onSubmit={handleSubmit} defaultWorkshopId={workshop_id} />
  );
};
export default NewFeedback;
