import { CheckCircle, Circle, CircleDot } from 'lucide-react'; // or your icon lib

const StepProgressBar = ({ currentStep }: { currentStep: number }) => {
    const labels = ["Name", "Wheels", "Vehicle Type", "Vehicle", "Dates"];
    const totalSteps = labels.length;

    return (
        <div className="flex items-center justify-between w-full mb-6 relative">
            {labels.map((label, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;

                return (
                    <div key={index} className="flex-1 flex flex-col items-center relative">
                        <div className={`z-10 rounded-full bg-white`}>
                            {isCompleted ? (
                                <CheckCircle className="text-green-600 w-6 h-6" />
                            ) : isCurrent ? (
                                <CircleDot className="text-blue-600 w-6 h-6" />
                            ) : (
                                <Circle className="text-gray-400 w-6 h-6" />
                            )}
                        </div>
                        <span className="text-sm mt-1 text-center text-gray-700">{label}</span>

                        {/* connector line */}
                        {index < totalSteps - 1 && (
                            <div
                                className={`
                   top-[50%] left-[0px] h-1 w-full z-1 absolute translate-y-[-14px]
                  ${isCompleted ? 'bg-green-600' : 'bg-gray-300'}
                  -z-10
                `}
                                style={{ transform: 'translateX(50%)', width: '100%' }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};
export default StepProgressBar;