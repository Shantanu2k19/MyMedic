// Basic Imports
import React from "react";
import Head from "next/head";

// Types Imports
// import { SeoType } from "@/common/types/components/base-seo";

interface SeoType {
  title?: string | string[];
}
const BaseSeo: React.FunctionComponent<SeoType> = (props) => {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="mymedic project" />
        <meta name="author" content="shantanu singh" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta property="og:site_name" content="MyMedic" />
        <meta name="og:title" content="MyMedic" />
        <meta property="og:type" content="website" />
        <title>
          {["MyMedic", props.title].flat().filter(Boolean).join(" - ")}
        </title>
      </Head>
    </React.Fragment>
  );
};

export default BaseSeo;
