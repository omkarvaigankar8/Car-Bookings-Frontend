export const bookingsTransformer = (data: any) => {
    //console.log("bookingsTransformer", data)
    const transformed = {
        "userFirstName": data.firstName,
        "userLastName": data.lastName,
        "vehicleId": data?.vehicleTypeId,
        "startDate": data?.dateRange?.startDate,
        "endDate": data?.dateRange?.endDate
    }
    return transformed;
}