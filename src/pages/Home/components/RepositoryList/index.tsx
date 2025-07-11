import useRepositoryQuery from "@/pages/Home/queries/useRepositoryQuery";
import { Blockquote, Box, HStack, Icon, Span, Text } from "@chakra-ui/react";
import { HiStar } from "react-icons/hi";

import RepositoryLoading from "../RepositoryLoading";

const RepositoryList = ({ username }: { username: string }) => {
  const { data, isLoading, isError, isFetched } = useRepositoryQuery(username);

  if (isLoading)
    return Array.from({ length: 3 }).map((_, index) => (
      <RepositoryLoading key={index} />
    ));
  if (isError) return <div>Error fetching repositories.</div>;
  if (!isFetched || !data || data.length === 0) {
    return <div>No repositories found for this user.</div>;
  }

  return (
    <>
      {data.map((repo) => (
        <Box
          key={repo.id}
          backgroundColor="gray.700"
          p={2}
          borderRadius="md"
          mb={2}
          data-testid="repository"
        >
          <HStack gap={4} alignItems="center">
            <Span flex="1">
              <a href={repo.svn_url} target="_blank" rel="noopener noreferrer">
                <Text textStyle="xl">{repo.name}</Text>
              </a>
            </Span>
            <Span>
              <Icon>
                <HiStar />
              </Icon>
              {repo.stargazers_count}
            </Span>
          </HStack>
          <Blockquote.Root>
            <Blockquote.Content>{repo.description}</Blockquote.Content>
          </Blockquote.Root>
        </Box>
      ))}
    </>
  );
};

export default RepositoryList;
