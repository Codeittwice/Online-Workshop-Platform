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
  Box,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { useQuery } from "react-query";
import { useState } from "react";
import Cookies from "js-cookie";
import WorkshopItem from "../workshops/WorkshopItem";

const UserEnrollments = (props: any) => {
  const [workshops, setWorkshops] = useState<Array<any>>([]);

  const { isLoading, error, data } = useQuery("workshops", async () => {
    const user = JSON.parse(new String(Cookies.get("user")).toString());
    console.log(user);

    const responce = await fetch(
      "http://localhost:8000/myworkshops/" + user._id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //Authentication: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await responce.json();
    setWorkshops(data);
  });
  return (
    <>
      <Flex>
        <SimpleGrid columns={[2, null, 3]} spacing="40px">
          {workshops.map((workshop: any) => {
            return (
              <Box height="300px" key={workshop._id}>
                <WorkshopItem data={workshop} />
              </Box>
            );
          })}
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default UserEnrollments;
