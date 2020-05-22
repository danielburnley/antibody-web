import React from "react";
import Router from "next/router";

export default () => <div />;

export const getServerSideProps = () => {
  Router.replace("/testRun/checkYourKit");
};
