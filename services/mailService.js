import axios from "axios";

export const mailService = {
  post: async (data) => {
    try {
      const response = await axios.post(
        `https://port-folio-backend-two.vercel.app/mail-send`,
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
