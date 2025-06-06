export type VehicleType = {
    id: number;
    name: string;
    wheels: number;
}
export type VehicleModel = {
    id: number
    isAvailable: boolean;
    model: string;
    vehicleTypeId: number
}