// components/bookings/columns.ts
import type { ColumnDef } from "@tanstack/react-table";
import type { Booking } from "@/lib/types/bookings";
import moment from 'moment'
export const columns: ColumnDef<Booking>[] = [
    {
        accessorKey: "id",
        header: "Booking ID",
    },
    {
        header: "Customer Name",
        cell: ({ row }) =>
            `${row.original.userFirstName} ${row.original.userLastName}`,
    },
    {
        header: "Vehicle Model",
        cell: ({ row }) => row.original.vehicle.model,
    },
    {
        header: "Vehicle Type",
        cell: ({ row }) => row.original.vehicle.vehicleType.name,
    },
    {
        header: "Wheels",
        cell: ({ row }) => row.original.vehicle.vehicleType.wheels,
    },
    {
        header: "Start Date",
        cell: ({ row }) =>
            // new Date(row.original.startDate).toLocaleString(),
            moment(row.original.startDate).format('ll')

    },
    {
        header: "End Date",
        cell: ({ row }) =>
            // new Date(row.original.endDate).toLocaleString(),
            moment(row.original.endDate).format('ll')
    },
];
