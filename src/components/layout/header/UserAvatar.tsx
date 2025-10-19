/** @format */

import { Box, Text } from "@chakra-ui/react";
import type { UserAvatarProps } from "./types";

const UserAvatar = ({ initials, size = "sm" }: UserAvatarProps) => {
  const dimensions = size === "sm" ? "32px" : "40px";
  const fontSize = size === "sm" ? "14px" : "16px";

  return (
    <Box
      background='linear-gradient(to bottom right, #5C6670 2.33%, #131316 96.28%)'
      w={dimensions}
      h={dimensions}
      borderRadius='full'
      display='flex'
      alignItems='center'
      justifyContent='center'>
      <Text color='white' fontSize={fontSize} fontWeight='normal'>
        {initials}
      </Text>
    </Box>
  );
};

export default UserAvatar;
