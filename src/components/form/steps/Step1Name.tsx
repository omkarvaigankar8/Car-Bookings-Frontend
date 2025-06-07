import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
export function Step1Name() {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    //console.log("errors", errors);
    return (
        <div className="p-4">
            <h2 className="text-xl mb-4"><span className='font-semibold'>Step 1: </span>What is your name?</h2>
            <div className="mb-4">
                <Input
                    {...register('firstName', { required: 'First name is required' })}
                    placeholder="First Name"
                // className="border p-2 rounded w-full"
                />
                {errors.firstName?.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName.message as string}</p>
                )}
            </div>
            <div className="mb-4">
                <Input
                    {...register('lastName', { required: 'Last name is required' })}
                    placeholder="Last Name"
                // className="border p-2 rounded w-full"
                />
                {errors.lastName?.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName.message as string}</p>
                )}
            </div>
        </div>
    );
}