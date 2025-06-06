import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import StepForm from '@/components/form/StepForm';

type BookingDialogProps = {
    refetch: () => void;
};

const BookingDialog = ({ refetch }: BookingDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Book a Vehicle</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <h2 className="text-lg font-semibold mb-4">Create Booking</h2>
                <StepForm onComplete={refetch} />
            </DialogContent>
        </Dialog>
    );
};

export default BookingDialog;
