import { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import type { RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Controller, useFormContext } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';

const Step5DateRange = () => {
  const {
    control,
    formState: { errors },
    setValue,
    trigger,
    watch
  } = useFormContext();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const dateRangeValue = watch('dateRange');

  // Initialize with form values or empty dates
  const [selectionRange, setSelectionRange] = useState({
    startDate: dateRangeValue?.startDate ? new Date(dateRangeValue.startDate) : new Date(),
    endDate: dateRangeValue?.endDate ? new Date(dateRangeValue.endDate) : new Date(),
    key: 'selection',
  });

  // Update local state when form values change
  useEffect(() => {
    if (dateRangeValue?.startDate && dateRangeValue?.endDate) {
      setSelectionRange({
        startDate: new Date(dateRangeValue.startDate),
        endDate: new Date(dateRangeValue.endDate),
        key: 'selection',
      });
    }
  }, [dateRangeValue]);

  const handleSelect = (ranges: RangeKeyDict): void => {
    const { startDate, endDate } = ranges.selection;

    if (startDate && endDate) {
      // Set time to midnight to match your schema requirements
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);

      const end = new Date(endDate);
      end.setHours(0, 0, 0, 0);

      setSelectionRange({
        startDate: start,
        endDate: end,
        key: 'selection',
      });

      // Update form values
      setValue('dateRange', {
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      }, { shouldValidate: true });

      // Trigger validation
      trigger('dateRange');
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4"><span className='font-semibold'>Step 5: </span>Select Rental Dates</h2>

      <Controller
        name="dateRange"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col space-y-4">
            <div className="border rounded-md overflow-hidden">
              <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
                moveRangeOnFirstSelection={false}
                months={1}
                direction={isMobile ? 'vertical' : 'horizontal'}
                rangeColors={['#3b82f6']}
                className="w-full"
                showMonthAndYearPickers={!isMobile}
                showDateDisplay={!isMobile}
                editableDateInputs={true}
                showPreview={!isMobile}
                staticRanges={isMobile ? [] : undefined}
                inputRanges={isMobile ? [] : undefined}
                minDate={new Date()}
              />
            </div>

            <div className="text-sm text-gray-600">
              {field.value?.startDate && field.value?.endDate ? (
                `Selected: ${formatDate(new Date(field.value.startDate))} to ${formatDate(new Date(field.value.endDate))}`
              ) : (
                'Please select a date range'
              )}
            </div>
          </div>
        )}
      />

      {/* Error messages */}
      {errors.dateRange && (
        <div className="text-sm text-red-600 space-y-1 mt-1">
          {'startDate' in (errors.dateRange || {}) && (errors.dateRange as any).startDate?.message && (
            <p>{(errors.dateRange as any).startDate.message}</p>
          )}
          {'endDate' in (errors.dateRange || {}) && (errors.dateRange as any).endDate?.message && (
            <p>{(errors.dateRange as any).endDate.message}</p>
          )}
          {typeof errors.dateRange.message === 'string' && (
            <p>{errors.dateRange.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Step5DateRange;