import { serve, buildAssets } from "tux/server";
import Document from "react-document";
import app from "../app";
import express from "express";

export default ({ clientStats }) => {
  const expressApp = express();
  expressApp.use(
    serve({
      Document,
      assets: buildAssets(clientStats),
      app
    })
  );
  return expressApp;
};
