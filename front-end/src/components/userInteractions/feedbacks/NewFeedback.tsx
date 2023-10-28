import FeedbackForm from "../forms/FeedbackForm";
import Cookies from "js-cookie";
import { PATHNAMES } from "@/utils/enums";
import { useRouter } from "next/router";

const NewFeedback = (props: any) => {
  const router = useRouter();
  const workshop_id = router.query._id;

  const handleSubmit = async (_values: any) => {
    await fetch(`http://localhost:8000/feedback/new`, {
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
