import { api } from "@/lib/api";

async function fetchTokenFromServer() {
    const res = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}/scribe-token`
    );

    if (!res.data?.success) {
        throw new Error("Failed to fetch scribe token");
    }

    return res.data.data.token;
}

export default fetchTokenFromServer