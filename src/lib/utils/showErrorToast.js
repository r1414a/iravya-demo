import { toast } from "sonner";

export function showErrorToast(error){
    let message = "Something went wrong";

    if(typeof error === "string"){
        message = error;
    }else if(error?.data?.message){
        message = error.data.message;
    }else if(error?.message){
        message = error.message;
    }

    toast.error(message, {
        style: {
            color: 'red'
        }
    });
//     toast.error(message, 
//         {
//         style: {
//             color: 'green'
//         }
//     }
// )
}