// Basic Imports
import React from "react";
// import { useRouter } from "next/router";

// Chakra UI Imports
import { Box, BoxProps } from "@chakra-ui/react";

const BaseBox: React.FunctionComponent<BoxProps> = ({ children, ...props }) => {
  // const router = useRouter();

  return (
    <React.Fragment>
      <Box
        px={{ base: 6, md: 6, lg: 20, sm: 10, xl: 28 }
        }
        pt={{ base: 8, sm: 16, md: 20 }
        }
        ml={{}
        }
        my={{}
        }
        mb={{}
        }
        pb="0"
        {...props}
      >
        {children}
      </Box>
    </React.Fragment>
  );
};

export default BaseBox;
