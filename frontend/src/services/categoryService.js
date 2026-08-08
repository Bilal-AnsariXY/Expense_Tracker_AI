import expressApi from "./expressApi";

const categoryService = {
  async getCategories() {
    const response = await expressApi.get("/categories");

    return response.data.data.map((category) => ({
      CategoryId: category.categoryid,
      CategoryName: category.categoryname,
      CategoryType: category.categorytype,
    }));
  },
};

export default categoryService;
