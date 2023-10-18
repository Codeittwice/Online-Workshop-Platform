import WorkshopDetails from "@/components/workshops/WorkshopDetails";
import { useRouter } from "next/router";

export default function WorkshopDetailsPage() {
  const router = useRouter();
  const id = router.query._id;
  return <WorkshopDetails id={id}></WorkshopDetails>;
}
