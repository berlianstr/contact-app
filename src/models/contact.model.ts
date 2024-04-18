export interface IDefaultData {
  message: string;
  data: IContact[];
}
export interface IContact {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
}
