import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

const useSignUp = () => {
    const { mutate: signUp, isLoading } = useMutation({
        mutationFn: signUpApi,
        onSuccess: ()=> {
            toast.success("Account successfully created, please check your email validation")
        },
        onError: () => {
            toast.error("Account cannot be created")
        }
    })
    return {
        signUp,
        isLoading
    }
}
 
export default useSignUp;