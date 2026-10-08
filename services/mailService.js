import axios from "axios";

const BACKEND_BASE = import.meta.env.VITE_BACKEND || import.meta.env.VITE_API_URL || "http://localhost:4000";

export const mailService = {
  post: async (data) => {
    try {
      // Primary route: /api/contact
      const response = await axios.post(
        `${BACKEND_BASE}/api/contact`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      // Fallback route: /mail-send
      try {
        const fallbackRes = await axios.post(
          `${BACKEND_BASE}/mail-send`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return fallbackRes.data;
      } catch (fallbackError) {
        console.error("Mail Send Error:", error);
        throw error;
      }
    }
  },
};
