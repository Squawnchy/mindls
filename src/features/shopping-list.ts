import { Router } from "express";
import { addItemHandler as addShoppingListItemHandler } from "../handler/shopping-lists/addItemHandler";
import { getAllListsHandler } from "../handler/shopping-lists/getAllListsHandler";
import { getListContentHandler } from "../handler/shopping-lists/getListContentHandler";
import Infrastructure from "../infrastructure/basic-feature";

export const shoppingLists: Infrastructure.Feature[] = [
  {
    featureRouter: {
      route: "/shopping-lists",
      router: Router()
        .get("/", getAllListsHandler)
        .get("/:id", getListContentHandler) 
        .post("/:id/purchase", addShoppingListItemHandler),
    },
  },
];
