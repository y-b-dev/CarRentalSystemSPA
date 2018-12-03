import { IUser } from "./user";

export interface IEmployee extends IUser {
    BranchID: number,
    IsManager: boolean
}