export const RestHttpHeaders = () => {
    const get = (): string => {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === "user-session") {
                const decodedCookie = decodeURIComponent(cookieValue);
                const cookieData = JSON.parse(decodedCookie);
                return `${(cookieData)?.token_type || "" } ${(cookieData)?.access_token || ""}`
            }
        }

        return "";
    }

    const remove = () => {
        document.cookie = `user-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    return { get, remove };
}