import { Request, Response } from "express";
import UserContext from "../../infrastructure/user-context";

export const getListContentHandler = async (req: Request, res: Response) => {
  const { shoppingListProvider: provider } = UserContext.get(req) ?? {};
  const id = req.params.id;
  try {
    await provider?.connect();
    const shoppingListContent = await provider?.getShoppingListContent(id);
    res.status(200).json(shoppingListContent);
  } catch {
    res.status(500).send("an error occured");
  }
};
