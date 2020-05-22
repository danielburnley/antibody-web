// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React from "react";
import { useCookies } from "react-cookie";
import Login from "../Login/Login";
// import { AppContext, withApp } from "components/App/context";

export const Home = () => {
  const setCookie = useCookies(["login-token"])[1];
  return (
    <div>
      <Login
        formSubmit={(signInId: string) => {
          if (signInId === "valid") {
            setCookie("login-token", "yes");
          }
        }}
      />
    </div>
  );
};

export default Home;
