// api/login.js
import API_BASE_URL from "../../../config/config";
export const loginUser = async (loginInfo) => {
    const url = `${API_BASE_URL}/hrms/login`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(loginInfo),
    });
    return response.json();
};
