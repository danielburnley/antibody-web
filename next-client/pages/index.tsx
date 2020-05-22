import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Login from "../src/components/Login/Login";
import { Container } from "nhsuk-react-components";

export default () => {
  const router = useRouter();

  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <link
          rel="icon"
          href="/favicon.ico" />
      </Head>
      <Login
        formSubmit={async (signInId: string) => {
          const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ signInId }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            router.push("/test");
          }
        }}
      />
    </Container>
  );
};

export const getServerSideProps = () => {
  return { props: {} };
};
