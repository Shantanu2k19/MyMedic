// Basic Imports
import React from "react";

// Chakra UI Imports
import {
  Box,
  Button,
  Grid,
  GridItem,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

// Components Imports
import BaseBox from "@/components/pdp/Hero/base/BaseBox";
import BaseBackgroundGradientRadial from "@/components/pdp/Hero/base/BaseGradientRadix";
import BaseMotionFallInPlace from "@/components/pdp/Hero/base/BaseMotionFallInPlace";
import StargazerBanner from "@/components/pdp/Hero/base/StargazerBanner";
// import MainHeroImage from "./MainHeroImage";

import Image from 'next/image';

const Hero: React.FunctionComponent = (props: any) => {
  return (
    <React.Fragment>
      <BaseBox position="relative"
       border="5px solid"
       borderColor="red"
       >
        <BaseBackgroundGradientRadial
          top="-1000px"
          height="500px"
          opacity="0.3"
          _dark={{ opacity: "0.7" }}
        />
        <StargazerBanner {...props} />

        <BaseMotionFallInPlace initialInView translateY="30px">
          <Grid
            display={{
              base: "grid",
              xl: "grid",
              lg: "grid",
              md: "block",
              sm: "block",
              xs: "block",
            }}
            gap="0"
            templateColumns="1.2fr 0.8fr"
            rowGap="10"
            columnGap="10"
          >
            <Box>
              <Text
                bgColor={useColorModeValue("black", "white")}
                bgClip="text"
                fontSize={{
                  base: "6xl",
                  lg: "6xl",
                  md: "5xl",
                  sm: "4xl",
                  xs: "4xl",
                }}
                fontWeight="900"
                lineHeight={{
                  base: "72px",
                  lg: "72px",
                  md: "60px",
                  sm: "40px",
                  xs: "40px",
                }}
                pr={{ lg: 4, md: 0, sm: 0, xs: 0 }}
                textAlign={{
                  base: "left",
                  lg: "left",
                  md: "center",
                  sm: "center",
                  xs: "center",
                }}
              >
                {/* {props?.heroSection?.heading} */}
                "mymedic helps you with your prescription"
              </Text>
              <VStack
                alignItems={{
                  base: "start",
                  lg: "start",
                  md: "center",
                  sm: "center",
                  xs: "center",
                }}
              >
                <Text
                  fontSize={{
                    base: "lg",
                    lg: "lg",
                    md: "lg",
                    sm: "md",
                    xs: "md",
                  }}
                  textAlign={{
                    base: "left",
                    lg: "left",
                    md: "center",
                    sm: "center",
                    xs: "center",
                  }}
                  colorScheme="white"
                  my="5"
                >
                  {/* {props?.heroSection?.description} */}
                  "upload your prescription and get your medicine described by ai ",
                </Text>
                <Button
                  my="2"
                  size={{ base: "lg", lg: "lg", md: "lg" }}
                  variant="solid"
                  boxShadow="base"
                  cursor="pointer"
                  _active={{ boxShadow: "outline" }}
                  _hover={{ boxShadow: "xl" }}
                  colorScheme="blue"
                >
                  {/* {props?.heroSection?.buttonText} */}
                  "Get started haha"
                </Button>
              </VStack>
            </Box>
            <GridItem>
              {/* <MainHeroImage /> */}
              <Image
              src="/assets/profile.svg"
              alt="Hero"
              height={500}
              width={500}
            />
            </GridItem>
          </Grid>
        </BaseMotionFallInPlace>
      </BaseBox>
    </React.Fragment>
  );
};

export default Hero;
