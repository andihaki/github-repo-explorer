import { useState } from "react";

import useUsersQuery from "../queries/userUsersQuery";
import { useDebounce } from "@/helpers/useDebounce";

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
