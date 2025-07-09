import {
  Accordion,
  Box,
  Button,
  Input,
  Span,
  Spinner,
  Stack,
} from "@chakra-ui/react";

import useHomeModels from "./useHomeModels";

const Home = () => {
  const { users, isLoading, isError, username, setUsername } = useHomeModels();

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <Input
        placeholder="Search for a GitHub user"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 16, maxWidth: 400 }}
      />
      <Button>Search</Button>
      {isLoading && <Spinner mt={4} />}
      {isError && <Box color="red.500">Error fetching users.</Box>}
      {!users.length && !isLoading && <div>No users found</div>}
      <Stack gap="4" style={{ height: "100vh" }}>
        <Accordion.Root collapsible>
          {users.map((user) => (
            <Accordion.Item key={user.id} value={user.id.toString()}>
              <Accordion.ItemTrigger>
                <Span flex="1">{user.login}</Span>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>
                  <Box mt={4} p={2} borderWidth="1px" borderRadius="md">
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={user.avatar_url} alt={user.login} width="50" />
                      <div>View Profile</div>
                    </a>
                  </Box>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Stack>
    </Box>
  );
};

export default Home;
