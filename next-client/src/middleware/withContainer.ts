import { NextApiRequest, NextApiResponse } from "next";
import login from "../usecases/login";

export default (handler) => (
  req: NextApiRequest,
  res: NextApiResponse,
  context
) => {
  context = context || {};
  context.container = { getLogin: () => login() };
  return handler(req, res, context);
};
