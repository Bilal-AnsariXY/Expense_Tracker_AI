"use client";

import { useEffect, useState } from "react";
import categoryService from "../../services/categoryService";

export default function IncomeForm({ income = null, onSubmit }) {
  const [categories, setCategories] = useState([]);

  const emptyForm = {
    CategoryId: "",
    Amount: "",
    Description: "",
    IncomeDate: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (income) {
      setFormData({
        CategoryId: String(income.CategoryId),
        Amount: String(income.Amount),
        Description: income.Description || "",
        IncomeDate: income.IncomeDate ? income.IncomeDate.split("T")[0] : "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [income]);

  async function loadCategories() {
    try {
      const data = await categoryService.getCategories();

      setCategories(
        data.filter((category) => category.CategoryType === "Income"),
      );
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.CategoryId ||
      !formData.Amount ||
      !formData.Description ||
      !formData.IncomeDate
    ) {
      alert("Please fill all fields.");
      return;
    }

    onSubmit({
      CategoryId: Number(formData.CategoryId),
      Amount: Number(formData.Amount),
      Description: formData.Description.trim(),
      IncomeDate: formData.IncomeDate,
    });
  }

  function handleReset() {
    if (income) {
      setFormData({
        CategoryId: String(income.CategoryId),
        Amount: String(income.Amount),
        Description: income.Description || "",
        IncomeDate: income.IncomeDate ? income.IncomeDate.split("T")[0] : "",
      });
    } else {
      setFormData(emptyForm);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Category */}

      <div>
        <label className="mb-2 block font-medium text-gray-700">Category</label>

        <select
          name="CategoryId"
          value={formData.CategoryId}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category.CategoryId} value={category.CategoryId}>
              {category.CategoryName}
            </option>
          ))}
        </select>
      </div>

      {/* Amount */}

      <div>
        <label className="mb-2 block font-medium text-gray-700">Amount</label>

        <input
          type="number"
          name="Amount"
          value={formData.Amount}
          onChange={handleChange}
          placeholder="Enter Amount"
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Description */}

      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Description
        </label>

        <textarea
          rows={4}
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          placeholder="Enter Description"
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Income Date */}

      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Income Date
        </label>

        <input
          type="date"
          name="IncomeDate"
          value={formData.IncomeDate}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={handleReset}
          className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-100"
        >
          Reset
        </button>

        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          {income ? "Update Income" : "Save Income"}
        </button>
      </div>
    </form>
  );
}
