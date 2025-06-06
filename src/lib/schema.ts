import * as z from 'zod';

export const step1Schema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
});

export const step2Schema = z.object({
    wheels: z.coerce.number().refine((val) => val === 2 || val === 4, {
        message: 'Please select either 2 or 4 wheels',
    }),
});
export const step3Schema = z.object({
    vehicleType: z.coerce.number().refine((val) => val, {
        message: 'Please select a vehicle type',
    }),
});
export const step4Schema = z.object({
    vehicleTypeId: z.coerce.number().refine((val) => val, {
        message: 'Please select a Vehicle',
    }),
});
export const step5Schema = z.object({
    dateRange: z.object({
        startDate: z.string().datetime({ offset: true }).refine(val => {
            const date = new Date(val);
            return date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0;
        }, {
            message: "Time must be set to 12:00 AM",
        }),
        endDate: z.string().datetime({ offset: true }).refine(val => {
            const date = new Date(val);
            return date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0;
        }, {
            message: "Time must be set to 12:00 AM",
        }),
    }).refine((data) => {
        const start = new Date(data.startDate);
        const end = new Date(data.endDate);
        return end >= start;
    }, {
        message: "End date must be after start date",
        path: ["endDate"],
    })
});

export type Step1Type = z.infer<typeof step1Schema>;
export type Step2Type = z.infer<typeof step2Schema>;
export type Step3Type = z.infer<typeof step3Schema>;
export type Step4Type = z.infer<typeof step4Schema>;
export type Step5Type = z.infer<typeof step5Schema>;


