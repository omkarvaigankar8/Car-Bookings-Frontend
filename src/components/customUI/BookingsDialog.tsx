import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import StepForm from '@/components/form/StepForm';
import { useState } from 'react';

type BookingDialogProps = {
    refetch: () => void;
};

const BookingDialog = ({ refetch }: BookingDialogProps) => {
    const [open, setOpen] = useState(false);

    const handleComplete = () => {
        refetch();     // call parent refetch
        setOpen(false); // close the dialog
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Book a Vehicle</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-2xl ">
                <div className="px-2 sm:px-4">
                    <h2 className="text-lg font-semibold mb-4">Create Booking</h2>
                    <StepForm onComplete={handleComplete} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingDialog;
