import axios from "axios";

export const mailService = {
  post: async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/mail-send",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Mail Send Error:", error);
      throw error;
    }
  },
};
