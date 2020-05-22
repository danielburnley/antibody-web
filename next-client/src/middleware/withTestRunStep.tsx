import React from "react";

import { Container, Row, Col, Label, ButtonLink } from "nhsuk-react-components";

const renderNext = (navigation) => {
  console.log("MEOW");
  console.log(navigation);
  if (navigation.next) {
    return (
      <Row>
        <Col width="one-third">
          <ButtonLink href={navigation.next}>Next</ButtonLink>
        </Col>
      </Row>
    );
  }
  return null;
};

export default (title, navigation, { Content, props }) => (
  <Container>
    <main className="nhsuk-main-wrapper">
      <Row>
        <Col width="full">
          <Label size="l">{title}</Label>
        </Col>
      </Row>
      <Content {...props} />
      {renderNext(navigation)}
    </main>
  </Container>
);
