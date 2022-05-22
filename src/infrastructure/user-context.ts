import { Request } from "express";
import { ShoppingListProvider } from "../types/shopping-lists/types";

export default class UserContext {
  static _bindings = new WeakMap<Request, UserContext>();

  public shoppingListProvider?: ShoppingListProvider;

  constructor(shoppingListProvider?: ShoppingListProvider) {
    this.shoppingListProvider = shoppingListProvider;
  }

  static bind(req: Request, userContext: UserContext): void {
    UserContext._bindings.set(req, userContext);
  }

  static get(req: Request): UserContext | null {
    return UserContext._bindings.get(req) || null;
  }
}
