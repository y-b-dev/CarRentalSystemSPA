
export interface ICarType {
    ID?: number,
    Manufactor: string,
    Model: string,
    DailyPrice: number,
    LatePrice: number,
    Year: number,
    Gear: number
}

export const GEAR: string[] = ["Automatic", "Manual", "CVT", "Semi-Auto"];