import API_BASE_URL from "../../config/config";
// services/authService.js
export const logout = async () => {
    try {
        await fetch(`${API_BASE_URL}/hrms/logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // Handle successful logout
    } catch (error) {
        console.error('Logout failed:', error);
        // Handle errors
    }
};
