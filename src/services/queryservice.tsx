import api from "./api";

export default {
    fetchQuery(domain: string, variable: string, Query: any) {
        return api().get(`${domain}?${variable}=${Query}`, {
            headers: { "content-type": "application/json" },
        });
    }
}