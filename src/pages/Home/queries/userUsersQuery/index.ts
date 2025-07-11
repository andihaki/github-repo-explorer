import { useQuery } from "@tanstack/react-query";

import { CONFIG } from "@/config/env";
import type { UsersResponse } from "./types";

const useUsersQuery = (username: string) => {
  return useQuery<UsersResponse>({
    enabled: Boolean(username),
    queryKey: ["users", username],
    queryFn: async () => {
      const params = new URLSearchParams({
        q: username,
        per_page: "5",
        page: "1",
      });
      const response = await fetch(
        `https://api.github.com/search/users?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${CONFIG.GITHUB_TOKEN}`,
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
};

export default useUsersQuery;
