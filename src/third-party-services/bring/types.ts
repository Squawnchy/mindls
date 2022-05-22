export type BringItemsReponseEntry = {
  specification: string;
  name: string;
};

export type BringItemsResponse = {
  uuid: string;
  status: string;
  purchase: BringItemsReponseEntry[];
  recently: BringItemsReponseEntry[];
};

export type BringListsReponse = {
  listUuid: string;
  name: string;
};

