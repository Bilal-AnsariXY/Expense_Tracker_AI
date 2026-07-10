import expressApi from "./expressApi";

const categoryService = {
  async getCategories() {
    const response = await expressApi.get("/categories");
    return response.data.data;
  },
};

export default categoryService;
