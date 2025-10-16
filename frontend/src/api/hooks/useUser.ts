import { getUser } from "@/api/requests";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
    const {data: user, isPending: isUserPending, error: userError} = useQuery({
        queryKey: ["user"],
        queryFn: () => getUser()
    })


    return {
        user,
        isUserPending,
        userError
    }
}