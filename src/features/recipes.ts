import { Router } from "express";
import Infrastructure from "../infrastructure/basic-feature";

export const shoppingLists: Infrastructure.Feature[] = [
  {
    featureRouter: {
      route: "/recipes",
      router: Router()
    },
  },
];
