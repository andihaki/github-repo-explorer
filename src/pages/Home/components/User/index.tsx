import { Accordion, Avatar, Box, Span } from "@chakra-ui/react";

import type { IUser } from "@/pages/Home/queries/userUsersQuery/types";
import RepositoryList from "../RepositoryList";

interface Props {
  user: IUser;
}

const User = ({ user }: Props) => {
  return (
    <Accordion.Item key={user.id} value={user.id.toString()}>
      <Accordion.ItemTrigger
        cursor="pointer"
        position="sticky"
        top={9}
        backgroundColor="black"
        zIndex={1}
      >
        <Span>
          <Avatar.Root size="lg">
            <Avatar.Fallback name={user.login} />
            <Avatar.Image src={user.avatar_url} />
          </Avatar.Root>
        </Span>
        <Span flex="1">{user.login}</Span>
        <Accordion.ItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody>
          <Box p={1} ml={4} borderWidth="1px" borderRadius="md">
            <RepositoryList username={user.login} />
          </Box>
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
};

export default User;
