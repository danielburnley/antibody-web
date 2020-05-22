import React from "react";
import withTestRunStep from "../../src/middleware/withTestRunStep";
import testRunSteps from "../../config/testRunSteps";
import { Row, Col, Details, BodyText } from "nhsuk-react-components";

const selectAFinger = () => (
  <Row>
    <Col width="full">
      <img
        src="select-a-finger.png"
        alt="Image showing arrows pointing to the middle and ring finger"
        width={325}
        height={201}
      />
      <ul className="nhsuk-list nhsuk-list--bullet">
        <li>Choose a finger on the hand you do not write with</li>
        <li>
          The 3rd or 4th (middle or ring) finger are usually less sensitive
        </li>
        <li>
          Get blood flowing into finger - hold hand below waist and gently
          squeeze along finger from knuckle to tip for 10 seconds
        </li>
      </ul>
      <Details>
        <Details.Summary>
          If you’ve had a mastectomy (breast removal)
        </Details.Summary>
        <Details.Text>
          <BodyText>
            You must not prick a finger on the same side of your body as the
            operation. If you’re worried, speak to your doctor.
          </BodyText>
        </Details.Text>
      </Details>
    </Col>
  </Row>
);

export default (props) =>
  withTestRunStep("Select a finger", props.navigation, {
    Content: selectAFinger,
    props,
  });

export const getServerSideProps = () => {
  const step = testRunSteps["select-a-finger"];
  const navigation = {};

  if (step.nav.next) {
    navigation.next = `/test-run/${step.nav.next}`;
  }

  return { props: { navigation } };
};
