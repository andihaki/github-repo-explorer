import { useState } from "react";

import { useDebounce } from "@/helpers/useDebounce";
import useUsersQuery from "./queries/userUsersQuery";

const useHomeModels = () => {
  const [username, setUsername] = useState("");
  const debouncedUsername = useDebounce(username);
  const { data, ...rest } = useUsersQuery(debouncedUsername);

  return {
    username,
    setUsername,
    users: data?.items || [],
    ...rest,
  };
};
export default useHomeModels;
