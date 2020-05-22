import "./global.scss";
import React from "react";
import { CookiesProvider } from "react-cookie";
import { Header, Container } from "nhsuk-react-components";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({
  Component,
  pageProps,
}: {
  Component: React.ComponentClass | React.FunctionComponent;
  pageProps: object;
}) {
  return (
    <CookiesProvider>
      <Header transactional>
        <Header.Container>
          <Header.Logo href="/" />
          <Header.ServiceName href="/">
            <span data-testid="service-name">
              Take an COVID-19 Antibody Test
            </span>
          </Header.ServiceName>
        </Header.Container>
      </Header>
      <Container>
        <Component {...pageProps} />
      </Container>
    </CookiesProvider>
  );
}
