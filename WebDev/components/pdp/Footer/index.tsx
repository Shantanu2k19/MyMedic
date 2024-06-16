// Basic Imports
import React from "react";
import NextLink from "next/link";

import Image from 'next/image';

// Chakra UI Imports
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  HStack,
  Heading,
  Link,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

// Components Imports
import BaseBox from "@/components/pdp/Footer/BaseBox";
// import Logo from "@/common/components/Logo";
import { linkDetails } from "./__footerLinkDetails";

// Icons Imports
import { AiFillGithub } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";

const Footer: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <Box  bgColor={useColorModeValue("gray.50", "gray.700")}
        // position="fixed"
      >
        <BaseBox
          bgColor={useColorModeValue("gray.50", "gray.700")}
          mt="28"
          pt="10"
          py="10"
        >
          <Flex
            justify="space-between"
            flexDir={{
              base: "row",
              xl: "row",
              lg: "row",
              md: "column",
              sm: "column",
              xs: "column",
            }}
            rowGap="10"
          >
            <Box>
              <Stack
                flex={{ base: 1, md: 1 }}
                justify="space-between"
                direction="row"
                align="center"
                alignItems="start"
              >
                <NextLink href="/" passHref style={{ textDecoration: "none" }}>
                  <Flex
                    justify="start"
                    direction="row"
                    align="center"
                    cursor="pointer"
                    gap="2"
                  >
                    {/* <Logo /> */}
                    <Image 
                      src="/assets/icon3.png" // External URL
                      alt="Description of the image"
                      width={200} // Desired width in pixels
                      height={200} // Desired height in pixels
                    />
                    <Text
                      fontFamily="heading"
                      fontSize="2xl"
                      fontWeight="extrabold"
                      colorScheme="white"
                    >
                      MyMedic
                    </Text>
                  </Flex>
                </NextLink>
              </Stack>
              <Text my="1" fontWeight="500">
                hello lorem ipsum lorem ipsum
              </Text>
            </Box>
            <Box>
              <VStack mt="2.5" alignItems="start">
                <Heading fontSize="xl" mb="1">
                  Product
                </Heading>
                {linkDetails.map((item, index) => {
                  return (
                    <Link href={item.link} key={index}>
                      <Text fontSize="sm">{item.name}</Text>
                    </Link>
                  );
                })}
              </VStack>
            </Box>
            <Box>
              <VStack mt="2.5" alignItems="start">
                <Heading fontSize="xl" mb="1">
                  Support
                </Heading>
                <Link href="/help">
                  <Text fontSize="sm">Help Center</Text>
                </Link>
              </VStack>
            </Box>
            <Box>
              <VStack mt="2.5" alignItems="start">
                <Heading fontSize="xl" mb="1">
                  Community
                </Heading>
                <ButtonGroup>
                  <Button
                    variant="solid"
                    size="sm"
                    as="a"
                    href="https://github.com/Shantanu2k19/mymedic"
                    target="_blank"
                    colorScheme="purple"
                    boxShadow="base"
                    rightIcon={<AiFillGithub />}
                    _active={{ boxShadow: "outline" }}
                  >
                    Contribute
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    as="a"
                    href="https://github.com/Shantanu2k19/mymedic"
                    target="_blank"
                    colorScheme="purple"
                    boxShadow="base"
                    rightIcon={<AiFillStar />}
                    _active={{ boxShadow: "outline" }}
                  >
                    Star us on GitHub
                  </Button>
                </ButtonGroup>
              </VStack>
            </Box>
          </Flex>
        </BaseBox>

        <Divider w="full" my="4" />
        <Box py="4">
          <HStack alignItems="center" justify="center">
            <Text>lorem ipsum</Text>
            <Link href="https://github.com/Shantanu2k19/mymedic">
              <Text fontWeight="600">Mymedic |</Text>
            </Link>
            <Text>Open Source Software💜</Text>
          </HStack>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Footer;
