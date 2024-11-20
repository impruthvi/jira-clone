import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface UseGetProjectProps {
  projectId: string;
}

export const useGetProjectAnalytics = ({ projectId }: UseGetProjectProps) => {
  const query = useQuery({
    queryKey: ["project-analytics", projectId],
    queryFn: async () => {
      const response = await client.api.projects[":projectId"][
        "analytics"
      ].$get({
        param: { projectId },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch project analytics");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
