import { toast } from "sonner";

export function showSuccessToast(message){
    toast.success(message, {
        style: {
            color: 'green'
        }
    });
}