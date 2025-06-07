import { useMemo, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '../ui/button';
import { step1Schema, step2Schema, step3Schema, step4Schema, step5Schema } from '@/lib/schema';
import { Step1Name } from '@/components/form/steps/Step1Name';
import { Step2Wheels } from '@/components/form/steps/Step2Wheels';
import Step3VehicleType from './steps/Step3VehicleType';
import Step4Vehicle from './steps/Step4Vehicle';
import Step5DateRange from './steps/Step5DateRange';
import { createBooking } from '@/api/booking';
import StepProgressBar from '../customUI/StepProgressBar';
interface StepFormProps {
    onComplete?: () => void;
}
// const combinedSchema = step1Schema.merge(step2Schema).merge(step3Schema);
const schemas = [step1Schema, step2Schema, step3Schema, step4Schema, step5Schema];
const steps = [Step1Name, Step2Wheels, Step3VehicleType, Step4Vehicle, Step5DateRange];
const StepForm = ({ onComplete }: StepFormProps) => {
    const [currentStep, setCurrentStep] = useState(0);
    // const currentSchema = useMemo(() => schemas[currentStep], [currentStep]);
    const StepComponent = useMemo(() => steps[currentStep], [currentStep]);

    const methods = useForm({
        // resolver: zodResolver(currentSchema),
        mode: 'onSubmit',
        defaultValues: {
            firstName: '',
            lastName: '',
            // wheels: 2, // Default value for wheels
            vehicleType: undefined, // Default value for vehicle type
            vehicleTypeId: undefined,
            dateRange: {
                startDate: '',
                endDate: ''
            }

        },
    });
    const onNext = async () => {
        const currentSchema = schemas[currentStep];
        const values = methods.getValues();
        methods.clearErrors();
        const result = currentSchema.safeParse(values);

        if (result.success) {
            setCurrentStep((step) => Math.min(step + 1, steps.length - 1));

        } else {
            // const formErrors = result.error.format();

            // Loop through top-level field errors
            const fieldErrors = result.error.flatten().fieldErrors;
            for (const [key, messages] of Object.entries(fieldErrors)) {
                if (messages && messages.length > 0) {
                    methods.setError(key as any, {
                        type: 'manual',
                        message: messages[0],
                    });
                }
            }
        }
    };



    const onBack = () => {
        setCurrentStep((step) => Math.max(step - 1, 0));
    };
    const onSubmit = async () => {
        const currentSchema = schemas[currentStep];
        const values = methods.getValues();
        const result = currentSchema.safeParse(values);

        if (result.success) {
            const allData = methods.getValues(); // now final data
            //console.log('Submitting', allData);
            await createBooking(allData)
            // //console.log("RESPONSE", response)
            if (onComplete) onComplete();
            // Call your backend API here
        } else {
            const fieldErrors = result.error.flatten().fieldErrors;
            for (const [key, messages] of Object.entries(fieldErrors)) {
                if (messages && messages.length > 0) {
                    methods.setError(key as any, {
                        type: 'manual',
                        message: messages[0],
                    });
                }
            }
        }
    };

    //console.log('Current step:', currentStep);
    return (
        <FormProvider{...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <StepProgressBar currentStep={currentStep} />
                <StepComponent />

                {/* Display errors for the current step */}
                <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
                    {currentStep > 0 && (
                        <Button type="button" onClick={onBack} className="w-full sm:w-auto">
                            Back
                        </Button>
                    )}
                    {currentStep < steps.length - 1 ? (
                        <Button type="button" onClick={onNext} className="w-full sm:w-auto">
                            Next
                        </Button>
                    ) : (
                        <Button type="button" onClick={onSubmit} className="w-full sm:w-auto">
                            Submit
                        </Button>
                    )}
                </div>
            </form>
        </FormProvider>
    )
}

export default StepForm