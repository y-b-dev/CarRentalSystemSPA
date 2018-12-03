import { ICar } from "./car";

export interface ICarWithType extends ICar {
    Manufactor: string,
    Model: string,
    DailyPrice: number,
    LatePrice: number,
    Year: number,
    Gear: number
}