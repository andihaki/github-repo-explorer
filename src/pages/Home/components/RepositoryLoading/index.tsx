import { Skeleton, Stack } from "@chakra-ui/react";

const RepositoryLoading = () => {
  return (
    <Stack gap={2}>
      <Skeleton height="5" />
      <Skeleton height="9" mb={3} />
    </Stack>
  );
};
export default RepositoryLoading;
