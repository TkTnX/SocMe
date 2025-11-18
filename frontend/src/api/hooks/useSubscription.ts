import { getSubscription } from "@/api/requests";
import { useQuery } from "@tanstack/react-query";

export function useSubscription() {
    const getSubscriptionsQuery = () => useQuery({
        queryKey: ["subscriptions"],
        queryFn: () => getSubscription()
    })


    return {
        getSubscriptionsQuery
    }
}