import createClient from "openapi-fetch";
import {paths} from "~/lib/schema";


export type ClientType = ReturnType<typeof createClient<paths>>
export const useClient = (): ClientType => {
    const baseUrl = import.meta.env.VITE_API_URL
    return createClient<paths>({baseUrl})
}