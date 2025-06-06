// components/bookings/types.ts
export type Booking = {
    id: number;
    vehicleId: number;
    userFirstName: string;
    userLastName: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    vehicle: {
        id: number;
        model: string;
        vehicleTypeId: number;
        isAvailable: boolean;
        vehicleType: {
            id: number;
            name: string;
            wheels: number;
        };
    };
};
export type BookingsResponse = {
    bookings: Booking[];
    total: number;
}
export interface UseBookingsParams {
    search: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    page: number;
    limit: number;
}