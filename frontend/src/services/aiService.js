import flaskApi from "./flaskApi";

const aiService = {
  askQuestion: async (question) => {
    const response = await flaskApi.post("/ai/chat", {
      question,
    });

    return response.data;
  },
};

export default aiService;
