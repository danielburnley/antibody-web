import React from "react";
import { Route, Switch } from "react-router-dom";
import TestContainer from "components/TestContainer/TestContainer";
import CheckYourKit from "components/TestRun/ContentComponent/CheckYourKit";
import WashAndDryHands from "components/TestRun/ContentComponent/WashAndDryHands";
import SetUpTest from "components/TestRun/ContentComponent/SetUpTest";
import SelectAFinger from "components/TestRun/ContentComponent/SelectAFinger";
import PrickFinger from "components/TestRun/ContentComponent/PrickFinger";
import Wait from "components/TestRun/ContentComponent/Wait";
import ScanKit from "components/TestRun/ContentComponent/ScanKit";
import Results from "components/TestRun/ContentComponent/Results";
import { RouteProps } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import Caption from "components/ui/Caption";
import { Portal } from 'react-portal';
import WhatIsWrong from "components/TestRun/ContentComponent/WhatIsWrong";
import ReportKit from "components/TestRun/ContentComponent/ReportKit";
import ReorderKit from "components/TestRun/ContentComponent/ReorderKit";
import CollectBloodSample from "components/TestRun/ContentComponent/CollectBloodSample";
import CoverCut from "components/TestRun/ContentComponent/CoverCut";
import AddBloodSample from "components/TestRun/ContentComponent/AddBloodSample";
import TestBloodSample from "components/TestRun/ContentComponent/TestBloodSample";
import WhatDoYouSee from "components/TestRun/ContentComponent/WhatDoYouSee";
import { getAppConfig } from 'utils/AppConfig';
import _ from 'lodash';
export interface TestRouteProps extends RouteProps {
  component: any;
  caption?: React.ReactNode;
  step?: string | string[] | undefined;
  next?: string;
  canPreview?: boolean;
}


/* Set our page title using portals, so we don't have to pass huge amounts of callbacks down the tree */
const TestRoute = (props: TestRouteProps) => {
  const { component: Component, caption, ...other } = props;
  return (<>
    <Portal node={document.getElementById("portal-header")}><FormattedMessage id={`screens.${other.step}.title`} /></Portal>
    {caption && <Caption>{caption}</Caption>}
    <Component {...other} />

  </>
  );
};

const config = getAppConfig();

let testRoutes = [

  {
    component: WashAndDryHands,
    path: "washAndDryHands",
    next: "setUpTest",
    canPreview: true
  },
  {
    component: SetUpTest,
    path: "setUpTest",
    next: "selectAFinger",
    canPreview: true
  },
  {
    component: SelectAFinger,
    path: "selectAFinger",
    next: "prickFinger",
    canPreview: true
  },
  {
    component: PrickFinger,
    path: "prickFinger",
    next: "collectBloodSample",
    canPreview: true
  },
  {
    component: CollectBloodSample,
    path: "collectBloodSample",
    next: "coverCut",
    canPreview: true
  },
  {
    component: CoverCut,
    path: "coverCut",
    next: "addBloodSample",
    canPreview: true
  },
  {
    component: AddBloodSample,
    path: "addBloodSample",
    next: "testBloodSample",
    canPreview: true
  },
  {
    component: TestBloodSample,
    path: "testBloodSample",
    next: "wait",
    canPreview: true
  },
  {
    component: Wait,
    path: "wait",
    next: config.imageUpload ? "scanKit" : "whatDoYouSee"
  },
  {
    component: ScanKit,
    path: "scanKit",
    next: "whatDoYouSee"
  },
  {
    component: WhatDoYouSee,
    path: "whatDoYouSee",
    next: "results"
  }
];

// Our simple flow skips the scan kit step for now.
let simpleRoutes = _.cloneDeep(testRoutes);
_.remove(simpleRoutes, r => r.path === "scanKit");
const waitRoute = _.find(simpleRoutes, r => r.path === 'wait');
if (waitRoute) {
  waitRoute.next = "whatDoYouSee";
}

const supportRoutes = [
  // Routes without a step counter
  {
    component: CheckYourKit,
    path: "checkYourKit",
    next: "washAndDryHands",
  },
  {
    component: WhatIsWrong,
    path: "whatIsWrong"
  },
  {
    component: ReportKit,
    type: "Missing",
    path: "missing"
  },
  {
    component: ReportKit,
    type: "Broken",
    path: "damaged"
  },
  {
    component: ReorderKit,
    path: "reorder"
  },
  {
    component: Results,
    path: "results"
  }
];

const previewRoutes = () => (
  testRoutes.filter(({ canPreview }) => canPreview)
);

export const TestRoutes = () => (
  <Switch>
    {testRoutes.map(({ path, next, ...route }, index) => (
      <TestRoute
        path={`/test/${path}`}
        step={path}
        next={`/test/${next}`}
        caption={<FormattedMessage
          id="app.stepCount"
          values={{
            current: index + 1,
            total: testRoutes.length
          }} />}
        key={path}
        {...route} />
    ))}
    {supportRoutes.map(({ path, ...route }, index) => (
      <TestRoute
        path={`/test/${path}`}
        step={path}
        key={path}
        {...route} />
    ))}
  </Switch>
);

export default () => (
  <>
    <Route
      path="/test/:step?"
      render={({ match }) => (
        <TestContainer step={match.params.step}>
          <TestRoutes />
        </TestContainer>
      )}>
    </Route>
    <Route
      path="/preview/:step?"
      render={({ match }) => (
        <Switch>
          {previewRoutes().map(({ path, next, ...route }, index) => (
            <TestRoute
              path={`/preview/${path}`}
              step={path}
              next={index < previewRoutes.length - 1 ? `/preview/${next}` : undefined}
              caption={<FormattedMessage
                id="app.stepCount"
                values={{
                  current: index + 1,
                  total: testRoutes.length
                }} />}
              key={path}
              {...route} />
          ))}
        </Switch>
      )}>
    </Route>
  </>
);