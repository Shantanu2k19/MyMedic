// Basic Imports
import React from "react";
import { useState } from 'react';
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
import LoginForm from "@/components/auth/LoginForm";


import Image from 'next/image';

const Hero: React.FunctionComponent = (props: any) => {

  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };


  return (
    <React.Fragment>
      <BaseBox position="relative"
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
               {/* <div className="login-form">
                  <h2>{showLogin ? 'Login' : 'Sign Up'}</h2>
                  <form>
                    <label>
                      Email:
                      <input type="email" placeholder="Enter your email" />
                    </label>
                    <label>
                      Password:
                      <input type="password" placeholder="Enter your password" />
                    </label>
                    {!showLogin && (
                      <label>
                        Confirm Password:
                        <input type="password" placeholder="Confirm your password" />
                      </label>
                    )}
                    <button type="submit">{showLogin ? 'Login' : 'Sign Up'}</button>
                  </form>
                  <p onClick={toggleForm}>
                    {showLogin ? 'Create an account' : 'Already have an account? Login'}
                  </p>
                </div> */}

              <LoginForm />
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
