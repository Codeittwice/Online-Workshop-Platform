import { Box, Flex, SimpleGrid, Spinner, Heading } from "@chakra-ui/react";
import WorkshopItem from "./WorkshopItem";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import ErrorItem from "../ErrorItem";
import { useState } from "react";
import SearchBar from "../SearchBar";

const WorkshopGrid = () => {
  const [searchPrompt, setSearchPropmpt] = useState("");

  const { isLoading, error, data, refetch } = useQuery(
    "workshops",
    async () => {
      const responce = await fetch(
        "http://localhost:8000/workshops/" + searchPrompt,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authentication: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      return responce.json();
    }
  );

  const handleSearch = (_searchPrompt: string) => {
    setSearchPropmpt(_searchPrompt);

    refetch();
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (data.error) {
    return <ErrorItem error={data.error} />;
  }

  return (
    <>
      <Box width={"40%"} justifyContent={"center"} marginBottom={"4rem"}>
        <SearchBar onSubmit={handleSearch}></SearchBar>
      </Box>
      <Flex>
        <SimpleGrid columns={[2, null, 3]} spacing="40px">
          {data &&
            data.length > 0 &&
            data.map((workshop: any) => {
              console.log(workshop);
              return (
                <Box height="300px" key={workshop._id}>
                  <WorkshopItem data={workshop} />
                </Box>
              );
            })}
          {data.length === 0 && (
            <Heading mb={4} color="gray.600">
              Sorry, we couldn't find the workshop you were searching for...
            </Heading>
          )}
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default WorkshopGrid;
