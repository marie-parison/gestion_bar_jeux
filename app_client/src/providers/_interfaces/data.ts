export interface ITableData {
  id?: number;
  number: number;
  nb_slot?: number;
  available: boolean;
}

export interface IAuthorData {
  id?: number;
  name?: string;
}

export interface IEditorData {
  id?: number;
  name?: string;
}

export interface IContentData {
  id?: number;
  content?: string;
}

export interface IMecanismData {
  id?: number;
  name?: string;
}

export interface ILanguageData {
  id?: number;
  name?: string;
}

export interface ICategoryData {
  id?: number;
  name?: string;
}

export interface IGamePictureData {
  small: string;
  thickbox: string;
  large: string;
}

export interface IGameData {
  id?: number;
  name: string;
  price: number;
  description_fr?: string;
  description_en?: string;
  player_min?: number;
  player_max?: number;
  age_min?: number;
  age_max?: number;
  duration_min?: number;
  duration_max?: number;
  game_pictures: IGamePictureData[];
  languages?: ILanguageData[];
  editors?: IEditorData[];
  authors?: IAuthorData[];
  contents?: IContentData[];
  categories?: ICategoryData[];
  mecanisms?: IMecanismData[];
}

export interface IBoardData {
  id?: number;
  id_game?: number;
  available?: boolean;
  condition?: string;
  game: IGameData;
  invoices: IInvoiceData[];
}

export interface ICustomerData {
  id?: number;
  firstname: string;
  lastname: string;
  birthdate?: Date; // pas sur!
  email?: string;
  gender?: string;
}

export interface IFoodData {
  id?: number;
  name: string;
  price: number;
  picture: string;
}

export interface IInvoiceData {
  id?: number;
  id_table: number;
  table: ITableData;
  start_at: Date;
  finish_at?: Date;
  is_paid?: boolean;
  sum_paid?: boolean;
  boards?: IBoardData[];
  foods?: IFoodData[];
  customers?: ICustomerData[];
  orders_bill?: number;
  boards_bill?: number;
}

