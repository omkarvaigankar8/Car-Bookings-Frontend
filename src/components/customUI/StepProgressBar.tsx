import { CheckCircle, Circle, CircleDot } from 'lucide-react'; // or your icon lib

const StepProgressBar = ({ currentStep }: { currentStep: number }) => {
    const labels = ["Name", "Wheels", "Vehicle Type", "Vehicle", "Dates"];
    const totalSteps = labels.length;

    return (
        <div className=" sm:flex hidden flex-col sm:flex-row sm:items-center sm:justify-between w-full mb-6 sm:relative gap-y-6">
            {labels.map((label, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;

                return (
                    <div key={index} className="flex-1 flex flex-col items-center relative">
                        <div className="z-10 rounded-full bg-white">
                            {isCompleted ? (
                                <CheckCircle className="text-green-600 w-6 h-6" />
                            ) : isCurrent ? (
                                <CircleDot className="text-blue-600 w-6 h-6" />
                            ) : (
                                <Circle className="text-gray-400 w-6 h-6" />
                            )}
                        </div>

                        <span className="text-sm mt-1 text-center text-gray-700 w-[60px] sm:w-auto">
                            {label}
                        </span>

                        {/* connector line */}
                        {index < totalSteps - 1 && (
                            <div
                                className={`absolute top-[12px] left-1/2 sm:left-full  h-[2px] sm:h-1 w-[2px] sm:w-full -z-10 
                                    ${isCompleted ? 'bg-green-600' : 'bg-gray-300'}
                                `}
                                style={{
                                    transform: `translateX(-50%) ${index === 0 ? 'translateY(-50%)' : 'translateY(-50%)'}`,
                                }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default StepProgressBar;