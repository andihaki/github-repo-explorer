import {
  Accordion,
  Box,
  CloseButton,
  Input,
  InputGroup,
  Stack,
} from "@chakra-ui/react";

import useHomeModels from "./useHomeModels";
import User from "./components/User";
import UserLoading from "@/components/Loading";

const Home = () => {
  const { users, isLoading, isError, isFetched, username, setUsername } =
    useHomeModels();
  const endElement = username ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setUsername("");
      }}
      me="-2"
    />
  ) : undefined;

  return (
    <Box maxW="md" mx="auto" p={4} position="relative" backgroundColor="black">
      <InputGroup
        endElement={endElement}
        top={0}
        position="sticky"
        zIndex={1}
        backgroundColor="black"
      >
        <Input
          placeholder="Search for a GitHub user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
      </InputGroup>
      {/* <Button
        style={{ marginBlock: "8px 4px", width: "100%" }}
        colorPalette="blue"
      >
        Search
      </Button> */}
      {isLoading &&
        Array.from({ length: 5 }).map((_, index) => (
          <UserLoading key={index} />
        ))}
      {isError && <Box color="red.500">Error fetching users.</Box>}
      {username && !users.length && !isLoading && !isError && isFetched && (
        <div>No users found</div>
      )}
      <Stack gap="4" position="relative">
        <Accordion.Root collapsible lazyMount multiple>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </Accordion.Root>
      </Stack>
    </Box>
  );
};

export default Home;
