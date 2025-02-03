"use client"
import { useRouter } from 'next/navigation';
import API_BASE_URL from '../../../config/config';
const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/hrms/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include"
      });

      if (response.ok) {
        router.push('/'); // Redirect to login page
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
