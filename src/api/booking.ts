import axiosInstance from "@/api/axiosInstance";
import type { BookingsResponse, UseBookingsParams } from "@/lib/types/bookings";
import { bookingsTransformer } from "@/utils/helperFunction";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { toast } from "sonner";

export const getVehicle = async (vehicleTypeId: number): Promise<[]> => {
    try {
        const response = await axiosInstance.get('/vehicles', {
            params: { vehicleTypeId },
        });
        return response.data?.vehicles || [];
    } catch (error) {
        console.error('Error fetching vehicle types:', error);
        throw error;
    }
}
export const createBooking = async (data: any) => {
    try {
        const newData = bookingsTransformer(data)
        const response = await axiosInstance.post('/bookings/create', newData)
        toast.success('Your is Done Booking Successfully')

        return response.data
    } catch (error: any) {
        toast.error(error?.response?.data.error)
        console.error('Error creating booking:', error);
        throw error;
    }
}
// export const getAllBookings = async ({
//     search = '',
//     sortBy = 'createdAt',
//     sortOrder = 'desc'
// }: {
//     search?: string;
//     sortBy?: string;
//     sortOrder?: 'asc' | 'desc';
// }) => {
//     const response = await axiosInstance.get('/bookings', {
//         params: { search, sortBy, sortOrder }
//     });
//     return response.data.bookings || [];
// };

export const useBookings = ({ search, sortBy, sortOrder, page, limit }: UseBookingsParams): UseQueryResult<BookingsResponse> => {
    return useQuery<BookingsResponse, Error, BookingsResponse>({
        queryKey: ['bookings', search, sortBy, sortOrder, page, limit],
        queryFn: async () => {
            const response = await axiosInstance.get('/bookings', {
                params: { search, sortBy, sortOrder, page, limit },
            });
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
    });
};