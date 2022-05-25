import express, { request, response } from "express";
import { shoppingLists } from "./features/shopping-list";
import Infrastructure from "./infrastructure/basic-feature";
import UserContext from "./infrastructure/user-context";
import { getBringShoppingListProvider } from "./third-party-services/bring/shopping-list-provider";

const features: Infrastructure.Feature[] = [...shoppingLists];
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use("/shopping-lists", (request, _response, next) => {
  UserContext.bind(request, new UserContext(getBringShoppingListProvider()));
  next();
});
features.forEach(({ featureRouter }) =>
  app.use(featureRouter.route, featureRouter.router)
);
app.listen(4001);
