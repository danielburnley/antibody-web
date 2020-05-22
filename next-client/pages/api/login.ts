import { NextApiRequest, NextApiResponse } from "next";
import withContainer from "../../src/middleware/withContainer";

export default withContainer(
  async ({ body }: NextApiRequest, res: NextApiResponse, { container }) => {
    const login = container.getLogin();
    const loginResponse = login(body.signInId);

    if (loginResponse.successful) {
      res.writeHead(201, {
        "Set-Cookie": `login-token=yes; httpOnly; path=/`,
      });
    }
    res.statusCode = 201;
    res.end();
    return;
  }
);
