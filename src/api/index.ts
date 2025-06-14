import app from "../app/app";
import serverless from "serverless-http";

export const handler = serverless(app);
