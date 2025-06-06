import { getVehicle, getVehicleTypes } from "@/api/vehicle"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { VehicleModel, VehicleType } from "@/lib/types/vehicle"
import { useCallback, useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"


const Step4Vehicle = () => {
    const {
        setValue,
        trigger,
        watch,
        formState: { errors },
    } = useFormContext()
    // alert("JDASdd")
    console.log("errots", errors)
    const [vehicles, setVehicles] = useState<VehicleModel[]>([])
    const vehicleTypeId = watch('vehicleType')
    const vehicle = watch('vehicleTypeId')
    console.log("vehicleTypeId", vehicleTypeId)
    console.log("vehicle", vehicle)
    const fetchVehicleTypes = useCallback(async (vehicleTypeId: number) => {
        if (!vehicleTypeId) return

        try {
            const types = await getVehicle(vehicleTypeId)
            setVehicles(types) // Store the result in form
            if (types.length > 0 && !vehicle) {
                setValue('vehicleTypeId', types[0].id, { shouldValidate: true });
            }

            // You might want to do something with these types
        } catch (error) {
            console.error("Failed to fetch vehicle types:", error)
            // Consider adding error state handling here
        }
    }, [setValue])

    useEffect(() => {
        fetchVehicleTypes(vehicleTypeId)
    }, [vehicleTypeId, fetchVehicleTypes])
    console.log("Vehicle", vehicles)
    return (
        <div className="p-4">
            <h2 className="text-xl mb-4"><span className='font-semibold'>Step 4: </span>Select the Vehicle</h2>
            {vehicles?.length > 0 && <RadioGroup
                defaultValue={`${vehicles[0].id}`}
                value={vehicle ? `${vehicle}` : undefined} // Controlled value

                onValueChange={async (value) => {
                    const num = Number(value)
                    setValue('vehicleTypeId', num);
                    await trigger(vehicleTypeId)
                    // setValue('vehicleTypeId', Number(value), { shouldValidate: true });
                }}
                className="mb-4 space-y-2 bg-transparent"
            >
                {vehicles?.map((vehicle) => (

                    <div key={vehicle?.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={`${vehicle?.id}`} id={`${vehicle?.id}`} className='bg-transparent' />
                        <label htmlFor={`${vehicle?.id}`}>{vehicle?.model}</label>
                    </div>))}
                {/* <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4" id="4" className='bg-transparent' />
                    <label htmlFor="4">4</label>
                </div> */}
            </RadioGroup>}
            {errors.wheels && typeof errors.wheels.message === 'string' && (
                <p className="text-red-500 text-sm mt-1">{errors.wheels.message}</p>
            )}
        </div>
    )
}

export default Step4Vehicle