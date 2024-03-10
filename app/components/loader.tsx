import { Box } from "@radix-ui/themes";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

export function Loader() {
  return (
    <Box className="loader-container">
      <Box as="span">
        <DotsHorizontalIcon />
      </Box>
    </Box>
  );
}
