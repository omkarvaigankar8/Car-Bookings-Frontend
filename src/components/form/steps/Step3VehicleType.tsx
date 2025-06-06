import { getVehicleTypes } from "@/api/vehicle"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { VehicleType } from "@/lib/types/vehicle"
import { useCallback, useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"


// const Step3VehicleType = () => {
//     const {
//         setValue,
//         trigger,
//         watch,
//         formState: { errors },
//     } = useFormContext()
//     const [vehicles, setVehicles] = useState<VehicleType[]>([])
//     const wheels = watch('wheels')
//     const vehicleType = watch('vehicleType') // Watch the current value
//     const fetchVehicleTypes = useCallback(async (wheels: number) => {
//         if (!wheels) return

//         try {
//             const types = await getVehicleTypes(wheels)
//             setVehicles(types) // Store the result in form
//             // You might want to do something with these types
//         } catch (error) {
//             console.error("Failed to fetch vehicle types:", error)
//             // Consider adding error state handling here
//         }
//     }, [setValue])

//     useEffect(() => {
//         fetchVehicleTypes(wheels)
//         if (vehicles.length > 0 && !vehicleType) {
//             setValue('vehicleType', vehicles[0].id)
//         }
//     }, [wheels, fetchVehicleTypes])
//     return (
//         <div className="p-4">
//             <h2 className="text-xl mb-4"><span className='font-semibold'>Step 3: </span>Select the Vehicle of Your Choosing</h2>
//             {vehicles?.length > 0 && <RadioGroup
//                 defaultValue={`${vehicles[0].id}`}
//                 value={vehicleType ? `${vehicleType}` : undefined} // Controlled value
//                 // onValueChange={(value) => {
//                 //     const num = Number(value);
//                 //     if (!isNaN(num)) {
//                 //         setValue('vehicleType', num, { shouldValidate: true });
//                 //     }
//                 // }}
//                 onValueChange={async (value) => {
//                     const num = Number(value)
//                     setValue('vehicleType', num)
//                     await trigger('vehicleType') // Trigger validation after setting value
//                 }}
//                 className="mb-4 space-y-2 bg-transparent"
//             >
//                 {vehicles?.map((vehicle) => (

//                     <div key={vehicle?.id} className="flex items-center space-x-2">
//                         <RadioGroupItem value={`${vehicle?.id}`} id={`${vehicle?.id}`} className='bg-transparent' />
//                         <label htmlFor={`${vehicle?.id}`}>{vehicle?.name}</label>
//                     </div>))}
//                 {/* <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="4" id="4" className='bg-transparent' />
//                     <label htmlFor="4">4</label>
//                 </div> */}
//             </RadioGroup>}
//             {errors.wheels && typeof errors.wheels.message === 'string' && (
//                 <p className="text-red-500 text-sm mt-1">{errors.wheels.message}</p>
//             )}
//         </div>
//     )
// }

// export default Step3VehicleType
const Step3VehicleType = () => {
    const {
        setValue,
        watch,
        trigger,
        formState: { errors },
    } = useFormContext();
    const [vehicles, setVehicles] = useState<VehicleType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const wheels = watch('wheels');
    const vehicleType = watch('vehicleType');

    const fetchVehicleTypes = useCallback(async (wheels: number) => {
        if (!wheels) return;
        setIsLoading(true);
        try {
            const types = await getVehicleTypes(wheels);
            setVehicles(types);
            // Set initial value if not set
            if (types.length > 0 && !vehicleType) {
                setValue('vehicleType', types[0].id, { shouldValidate: true });
            }
        } catch (error) {
            console.error("Failed to fetch vehicle types:", error);
        } finally {
            setIsLoading(false);
        }
    }, [setValue]);

    useEffect(() => {
        fetchVehicleTypes(wheels);
    }, [wheels, fetchVehicleTypes]);

    if (isLoading) return <div>Loading vehicle types...</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl mb-4"><span className='font-semibold'>Step 3: </span>Select the Vehicle of Your Choosing</h2>
            {vehicles.length > 0 ? (
                <RadioGroup
                    value={vehicleType ? `${vehicleType}` : undefined}
                    onValueChange={async (value) => {
                        const num = Number(value);
                        setValue('vehicleType', num, { shouldValidate: true });
                        await trigger('vehicleType');
                    }}
                    className="mb-4 space-y-2 bg-transparent"
                >
                    {vehicles.map((vehicle) => (
                        <div key={vehicle.id} className="flex items-center space-x-2">
                            <RadioGroupItem
                                value={`${vehicle.id}`}
                                id={`${vehicle.id}`}
                                className='bg-transparent'
                            />
                            <label htmlFor={`${vehicle.id}`}>{vehicle.name}</label>
                        </div>
                    ))}
                </RadioGroup>
            ) : (
                <p>No vehicle types available</p>
            )}
            {errors.vehicleType?.message && (
                <p className="text-red-500 text-sm mt-1">{errors.vehicleType.message as string}</p>
            )}
        </div>
    );
};
export default Step3VehicleType
