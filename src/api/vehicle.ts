import axiosInstance from "@/api/axiosInstance";
import type { VehicleModel, VehicleType } from "@/lib/types/vehicle";

export const getVehicleTypes = async (wheels: number): Promise<VehicleType[]> => {
    console.log("axiosInstance", axiosInstance);
    try {
        const response = await axiosInstance.get('/vehicles/types', {
            params: { wheels },
        });
        console.log("Vehicle Types Response", response.data);
        return response.data?.vehicleTypes || [];
    } catch (error) {
        console.error('Error fetching vehicle types:', error);
        throw error;
    }
}
export const getVehicle = async (vehicleTypeId: number): Promise<VehicleModel[]> => {
    console.log("axiosInstance", axiosInstance);
    try {
        const response = await axiosInstance.get('/vehicles', {
            params: { vehicleTypeId },
        });
        console.log("Vehicle Types Response", response.data);
        return response.data?.vehicles || [];
    } catch (error) {
        console.error('Error fetching vehicle types:', error);
        throw error;
    }
}
export const getVehicleWheels = async (): Promise<Number[]> => {
    try {
        const response = await axiosInstance.get('/vehicles/wheels');
        console.log("Vehicle Wheels Response", response.data);
        return response.data?.wheels || [];
    } catch (error) {
        console.error('Error fetching vehicle wheels:', error);
        throw error;
    }
}