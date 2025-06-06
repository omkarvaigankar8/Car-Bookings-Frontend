import { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { Controller, useFormContext } from 'react-hook-form';
import 'react-day-picker/style.css';

const Step5DateRange = () => {
  const {
    control,
    formState: { errors, isSubmitted },
    trigger
  } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  console.log("errrr", errors)
  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        trigger("dateRange"); // Validate when closing without selection
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [trigger]);

  const setToStartOfDay = (date: Date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select Rental Dates</h2>
      <div ref={containerRef} className="relative inline-block">
        <Controller
          name="dateRange"
          control={control}
          render={({ field }) => {
            const hasError = errors.dateRange;
            const showError = isSubmitted || field.value?.startDate || field.value?.endDate;

            return (
              <>
                <input
                  type="text"
                  value={
                    field.value?.startDate && field.value?.endDate
                      ? `${new Date(field.value.startDate).toLocaleDateString()} - ${new Date(field.value.endDate).toLocaleDateString()}`
                      : field.value?.startDate
                        ? `${new Date(field.value.startDate).toLocaleDateString()} - ...`
                        : ""
                  }
                  readOnly
                  onClick={() => {
                    setIsOpen(true);
                    if (!field.value?.startDate && !field.value?.endDate) {
                      trigger("dateRange");
                    }
                  }}
                  placeholder="Select date range"
                  className={`w-64 px-3 py-2 border rounded-md cursor-pointer focus:outline-none focus:ring-2 ${hasError && showError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                    }`}
                />

                {isOpen && (
                  <div className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                    <DayPicker
                      mode="range"
                      selected={{
                        from: field.value?.startDate ? new Date(field.value.startDate) : undefined,
                        to: field.value?.endDate ? new Date(field.value.endDate) : undefined
                      }}
                      onSelect={(range) => {
                        if (range?.from) {
                          const newValue = {
                            startDate: setToStartOfDay(range.from).toISOString(),
                            endDate: range.to ? setToStartOfDay(range.to).toISOString() : undefined
                          };
                          field.onChange(newValue);
                          trigger("dateRange");
                          if (range.to) setIsOpen(false);
                        }
                      }}
                      numberOfMonths={2}
                      footer={
                        <div className="p-2 text-sm text-gray-600 border-t">
                          {field.value?.startDate ? (
                            field.value.endDate ? (
                              `Selected: ${new Date(field.value.startDate).toLocaleDateString()} to ${new Date(field.value.endDate).toLocaleDateString()}`
                            ) : (
                              `Select end date (${new Date(field.value.startDate).toLocaleDateString()} to ...)`
                            )
                          ) : (
                            "Pick a date range"
                          )}
                        </div>
                      }
                      className="border-0"
                    />
                  </div>
                )}
              </>
            );
          }}
        />
      </div>

      {/* Error messages */}
      {typeof errors.dateRange === 'object' && errors.dateRange !== null && (
        ('startDate' in errors.dateRange || 'endDate' in errors.dateRange || 'message' in errors.dateRange) && (
          <div className="text-sm text-red-600 space-y-1 mt-1">
            {'startDate' in errors.dateRange && (errors.dateRange as any).startDate?.message && (
              <p>{(errors.dateRange as any).startDate.message}</p>
            )}
            {'endDate' in errors.dateRange && (errors.dateRange as any).endDate?.message && (
              <p>{(errors.dateRange as any).endDate.message}</p>
            )}
            {'message' in errors.dateRange && typeof errors.dateRange.message === 'string' && (
              <p>{errors.dateRange.message}</p>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Step5DateRange;