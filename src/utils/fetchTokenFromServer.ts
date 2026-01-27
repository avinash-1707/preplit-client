import { api } from "@/lib/api";

let cachedToken: string | null = null;
let expiresAt = 0;
let inflight: Promise<string> | null = null;

async function fetchTokenFromServer(): Promise<string> {
    const now = Date.now();

    // ✅ reuse valid token
    if (cachedToken && now < expiresAt - 10_000) {
        return cachedToken;
    }

    // ✅ prevent parallel token requests
    if (inflight) {
        return inflight;
    }

    inflight = api
        .get(
            `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}/scribe-token`
        )
        .then((res) => {
            if (!res.data?.success) {
                throw new Error("Failed to fetch scribe token");
            }

            cachedToken = res.data.data.token;

            // 🔑 IMPORTANT: backend should return expiry
            expiresAt = res.data.data.expiresAt ?? Date.now() + 10 * 60 * 1000;

            inflight = null;
            return cachedToken!;
        })
        .catch((err) => {
            inflight = null;
            throw err;
        });

    return inflight;
}

export default fetchTokenFromServer;
