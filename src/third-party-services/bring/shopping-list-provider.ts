import Bring from "bring-shopping";
import { config } from "../../config";
import {
  ShoppingListDTO,
  ShoppingListEntryDTO,
  ShoppingListItemDTO,
  ShoppingListProvider,
  ShoppingListsDTO,
  ShopptingListContentDTO,
} from "../../types/shopping-lists/types";
import {
  BringItemsReponseEntry,
  BringItemsResponse,
  BringListsReponse,
} from "./types";

function __toShoppingListDTO(list: BringListsReponse): ShoppingListDTO {
  return { name: list.name, id: list.listUuid };
}

function __toShoppingListEntryDTO(
  entry: BringItemsReponseEntry
): ShoppingListEntryDTO {
  return {
    name: entry.name,
    specifications: entry.specification.split(","),
  };
}

function __toShoppingListDTOContentDTO(
  response: BringItemsResponse
): ShopptingListContentDTO {
  return {
    ...response,
    purchase: response.purchase.map(__toShoppingListEntryDTO),
    recently: response.recently?.map(__toShoppingListEntryDTO),
  };
}

export function getBringShoppingListProvider(): ShoppingListProvider {
  let _bringClient: Bring | undefined;

  const connect: () => Promise<void> = async () => {
    _bringClient = new Bring({
      mail: config.bring.mail,
      password: config.bring.password,
    });

    try {
      await _bringClient.login();
    } catch (bringLoginError: unknown) {
      console.error(`Error on Login: ${bringLoginError}`);
      throw bringLoginError;
    }
  };

  const disconnect: () => Promise<void> = async () => {
    _bringClient = undefined;
  };

  const getShoppingLists: () => Promise<ShoppingListsDTO> = async () => {
    try {
      const bringShoppingLists = await _bringClient?.loadLists();
      if (!bringShoppingLists) {
        throw new Error("bringShoppingList = undefined after fetching");
      }
      return bringShoppingLists.lists.map(__toShoppingListDTO);
    } catch (listLoadingError: unknown) {
      console.error(listLoadingError);
      throw listLoadingError;
    }
  };

  const getShoppingListContent: (
    id: string
  ) => Promise<ShopptingListContentDTO> = async (id: string) => {
    try {
      const bringListItems = await _bringClient?.getItems(id);
      if (!bringListItems) {
        throw new Error("bringListItems = undefined after fetching");
      }
      return __toShoppingListDTOContentDTO(bringListItems);
    } catch (getItemsError: unknown) {
      console.log(getItemsError);
      throw getItemsError;
    }
  };

  const addItemToShoppingList = async (shoppingListId: string, item: ShoppingListItemDTO) => {
    try {
      const result = await _bringClient?.saveItem(shoppingListId, item.name, item.specifiations.join(', '));
      if (!result) {
        throw new Error("result = undefined after saveItem is called");
      }
      return result;
    } catch (saveItemError: unknown) {
      console.error(saveItemError);
      throw saveItemError;
    }
  }

  return {
    connect,
    disconnect,
    getShoppingLists,
    getShoppingListContent,
    addItemToShoppingList
  };
}
