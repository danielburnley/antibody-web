import React from "react";
import { NextPageContext } from "next";

export default () => <div />;

export const getServerSideProps = (context: NextPageContext) => {
  context.res.writeHead(301, {
    Location: "/test-run/checkYourKit",
  });
  context.res.end();
};
