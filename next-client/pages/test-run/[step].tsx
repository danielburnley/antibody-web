// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import { TESTRUN_STEPS, getNextDefaultStep } from "../../src/components/testRun/TestRunConstants";
import React from "react";
import { Container, Row, Col } from "nhsuk-react-components";

import TestRunHeader from "../../src/components/testRun/TestRunHeader";

/**
 * Test Kit Tutorial.
 * Each step might be just static information or contain form
 * preventing going to the next step until it is completed.
 */

export default ({ step }: { step: string }) => {
  const currentStepDescription = TESTRUN_STEPS[step];

  const nextDefaultStep = getNextDefaultStep({
    currentStepName: step,
  });

  const nextPath = nextDefaultStep ? `/test-run/${nextDefaultStep}` : undefined;

  return (
    <Container>
      <TestRunHeader
        stepDetails={currentStepDescription}
        step={step} />
      <currentStepDescription.ContentComponent
        setStepReady={null}
        submitUrl={nextPath}
        testRunUID={"meow"}
      />
      <Row>
        <Col width="full">
          <a href={nextPath}>Next</a>
        </Col>
      </Row>
    </Container>
  );
};

export const getServerSideProps = ({ query }) => {
  return { props: { step: query.step } };
};
