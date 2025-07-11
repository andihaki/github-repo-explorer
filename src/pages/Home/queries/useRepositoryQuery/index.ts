import { useQuery } from "@tanstack/react-query";

import { CONFIG } from "@/config/env";
import type { IRepository } from "./types";

const useRepositoryQuery = (username: string) => {
  return useQuery<IRepository[]>({
    enabled: Boolean(username),
    queryKey: ["repository", username],
    queryFn: async () => {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`,
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

export default useRepositoryQuery;
