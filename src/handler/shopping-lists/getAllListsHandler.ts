import { Request, Response } from "express";
import UserContext from "../../infrastructure/user-context";

export const getAllListsHandler = async (req: Request, res: Response) => {
  const { shoppingListProvider } = UserContext.get(req) ?? {};
  try {
    const shoppingLists = await shoppingListProvider?.getShoppingLists();
    res.status(200).json(shoppingLists);
  } catch {
    res.status(500).send("an error occured");
  }
};
