import express from "express";
import { shoppingLists } from "./features/shopping-list";
import Infrastructure from "./infrastructure/basic-feature";

const features: Infrastructure.Feature[] = [...shoppingLists];
const app = express();
app.use(express.json());
app.use(express.urlencoded());
features.forEach(({ featureRouter }) =>
  app.use(featureRouter.route, featureRouter.router)
);
app.listen(4001);
