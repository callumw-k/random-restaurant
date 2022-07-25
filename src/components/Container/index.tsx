import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <Box maxW="xl">{children}</Box>;
};

export default Container;
