import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut as logOutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

const useLogOut = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: logout, isLoading } = useMutation({
        mutationFn: logOutApi,
        onSuccess: ()=> {
            queryClient.removeQueries();
            navigate("/login", { replace: true });
        }
    })

    return {
        logout,
        isLoading
    }
}
 
export default useLogOut;