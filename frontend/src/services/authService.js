
import expressApi from "./expressApi";

const authService = {
  googleLogin: async (credential) => {
    const response = await expressApi.post("/auth/google", {
      credential,
    });

    return response.data;
  },

  getProfile: async () => {
    const response = await expressApi.get("/auth/profile");

    return response.data;
  },

  logout: async () => {
    const response = await expressApi.post("/auth/logout");

    return response.data;
  },
};

export default authService;
