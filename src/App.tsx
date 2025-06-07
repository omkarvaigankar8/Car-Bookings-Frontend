import './App.css';
import { useEffect, useState } from 'react';
import { useBookings } from '@/api/booking';
import { DataTable } from "@/components/BookingsDataTable";
import { columns } from "@/components/BookingColumns";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce';
import BookingsDialog from './components/customUI/BookingsDialog';


function App() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const limit = 5;
  const stableSearch = debouncedSearch.trim();


  const { data: bookings, refetch } = useBookings({
    search: stableSearch || '',
    sortBy,
    sortOrder,
    page,
    limit
  });
  //console.log("bookings", bookings)
  const total = bookings?.total || 0;
  const totalPages = Math.ceil(total / limit);
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sortBy, sortOrder]);
  return (
    <div className="">
      <h1 className='font-semibold text-3xl my-8'>Car Booking Frontend</h1>
      {(bookings?.bookings?.length ?? 0) > 0 ? <div className="flex flex-col gap-4">
        <div className="flex sm:flex-nowrap flex-wrap gap-4 items-center justify-start  sm:justify-between w-full">
          {/* <div className=" flex gap-4 flex-wrap w-full"> */}
          <Input
            placeholder="Search by name or vehicle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-[250px]"
          />
          <div className="flex flex-row gap-4 justify-between flex-wrap w-full">
            <div className="flex gap-2 justify-between sm:justify-start w-full sm:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px] !bg-gray-100 ">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Created At</SelectItem>
                  <SelectItem value="startDate">Start Date</SelectItem>
                  <SelectItem value="userFirstName">First Name</SelectItem>
                  <SelectItem value="userLastName">Last Name</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as 'asc' | 'desc')}>
                <SelectTrigger className="w-[150px] !bg-gray-100 ">
                  <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* </div> */}
            <div className="flex w-full sm:w-auto  justify-end">
              <BookingsDialog refetch={() => refetch()} />
            </div>
          </div>
        </div>
        <div className="table">
          <DataTable columns={columns} data={bookings?.bookings ?? []} />
          <div className="flex flex-wrap justify-between items-center mt-4">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                disabled={page <= 1}
                className={`${page <= 1 && '!cursor-not-allowed'}`}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <Button
                className=''
                disabled={page >= totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div> : (
        <div>
          <h4 className='mb-4'>No Bookings Found create a Booking  by clicking on the Button below</h4>
          <BookingsDialog refetch={() => refetch()} />
        </div>
      )}
    </div>
  );
}

export default App;
