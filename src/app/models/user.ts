export enum Gender {
    Male,
    Female,
    Indeterminate
}

export interface IUser {
    ID?: number,
    UserID?: number,
    FirstName?: string,
    LastName?: string,
    UserName?: string,
    Password?: string,
    BirthDate?: Date,
    Gender?: Gender,
    Email?: string,
    Image?: string
}