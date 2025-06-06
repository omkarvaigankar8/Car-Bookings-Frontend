export const setToStartOfDay = (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
};

export const dateToISOString = (date: Date): string => {
    return setToStartOfDay(date).toISOString();
};