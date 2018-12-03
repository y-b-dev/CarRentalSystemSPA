export interface IRent {
    ID?: number
    StartDate: Date,
    EndDate: Date,
    ActualEndDate: Date,
    BranchID: number
    UserID: number,
    CarID: number
}