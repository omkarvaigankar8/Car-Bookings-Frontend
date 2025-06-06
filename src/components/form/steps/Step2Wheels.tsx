import { useFormContext } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCallback, useEffect, useState } from 'react';
import { getVehicleWheels } from '@/api/vehicle';

export function Step2Wheels() {
    const {
        setValue,
        // trigger,
        watch,
        formState: { errors },
    } = useFormContext();
    const wheels = watch('wheels');
    const [vehiclesWheels, setVehiclesWheels] = useState<Number[]>([]);
    // const [isLoading, setIsLoading] = useState(false);
    const fetchVehicleWheels = useCallback(async () => {
        // setIsLoading(true);
        try {
            const types = await getVehicleWheels();
            setValue('wheels', types[0], { shouldValidate: true })
            setVehiclesWheels(types);
            console.log("types", types)
            // Set initial value if not set
        } catch (error) {
            console.error("Failed to fetch vehicle types:", error);
        } finally {
            // setIsLoading(false);
        }
    }, [setValue]);
    console.log("Wheels", wheels)
    useEffect(() => {
        fetchVehicleWheels();
    }, [fetchVehicleWheels]);

    return (
        <div className="p-4">
            <h2 className="text-xl mb-4"><span className='font-semibold'>Step 2: </span>Number of Wheels</h2>
            {vehiclesWheels?.length > 0 && <RadioGroup
                defaultValue={`${wheels}`}
                onValueChange={(value) => {
                    setValue('wheels', value, { shouldValidate: true });
                }}
                className="mb-4 space-y-2 bg-transparent"
            >
                {/* <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="2" className='bg-transparent' />
                    <label htmlFor="2">2</label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4" id="4" className='bg-transparent' />
                    <label htmlFor="4">4</label>
                </div> */}
                {vehiclesWheels?.map((vehicleWheel) => (
                    <div key={`${vehicleWheel}`} className="flex items-center space-x-2">
                        <RadioGroupItem value={`${vehicleWheel}`} id={`${vehicleWheel}`} className='bg-transparent' />
                        <label htmlFor={`${vehicleWheel}`}>{`${vehicleWheel}`}</label>
                    </div>
                ))}
            </RadioGroup>}
            {errors.wheels && typeof errors.wheels.message === 'string' && (
                <p className="text-red-500 text-sm mt-1">{errors.wheels.message}</p>
            )}
        </div>
    );
}