import { useQuery } from "@tanstack/react-query";

import { CONFIG } from "@/config/env";

const useRepositoryQuery = () => {
  return useQuery({
    queryKey: ["repository"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.github.com/users/andihaki/repos",
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
