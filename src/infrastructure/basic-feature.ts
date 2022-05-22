import { IRouter } from "express";

declare namespace e {
  type FeatureRouter = { route: string; router: IRouter };
  type Feature = {
    featureRouter: FeatureRouter;
  };
}

export default e;
