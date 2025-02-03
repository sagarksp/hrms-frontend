// api.js
import API_BASE_URL from "../../../../config/config";
export const fetchMessages = async () => {
    try {
      // const response = await fetch(`${API_BASE_URL}/hrms/messages`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  };
  
  export const deleteMessage = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hrms/messages/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete message');
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  };
  