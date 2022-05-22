export type ShoppingListDTO = {
  id: string;
  name: string;
};

export type ShoppingListEntryDTO = {
  name: string;
  specifications: string[];
};

export type ShopptingListContentDTO = {
  uuid: string;
  status: string;
  purchase: ShoppingListEntryDTO[];
  recently: ShoppingListEntryDTO[];
};

export type ShoppingListsDTO = ShoppingListDTO[];

export type ShoppingListItemSpecifications = string[];

export type ShoppingListItemDTO = {
  name: string;
  specifiations: ShoppingListItemSpecifications;
}

export type ShoppingListProvider = {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  getShoppingLists: () => Promise<ShoppingListsDTO>;
  getShoppingListContent: (id: string) => Promise<ShopptingListContentDTO>;
  addItemToShoppingList: (shoppingListId: string, item: ShoppingListItemDTO) => Promise<string>;
};
