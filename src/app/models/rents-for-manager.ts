import { IRent } from "./rent";

export interface IRentForManager extends IRent {
    Image: string,
    LastName: string,
    FirstName: string,
    UserName: string
}