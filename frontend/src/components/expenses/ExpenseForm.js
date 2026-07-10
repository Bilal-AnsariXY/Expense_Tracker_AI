"use client";

import { useEffect, useState } from "react";
import categoryService from "../../services/categoryService";

export default function ExpenseForm({ expense = null, onSubmit }) {
  const [categories, setCategories] = useState([]);

  const emptyForm = {
    CategoryId: "",
    Amount: "",
    Description: "",
    ExpenseDate: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (expense) {
      setFormData({
        CategoryId: String(expense.CategoryId),
        Amount: String(expense.Amount),
        Description: expense.Description || "",
        ExpenseDate: expense.ExpenseDate
          ? expense.ExpenseDate.split("T")[0]
          : "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [expense]);

  async function loadCategories() {
    try {
      const data = await categoryService.getCategories();

      setCategories(
        data.filter((category) => category.CategoryType === "Expense"),
      );
    } catch (err) {
      console.error(err);
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
      !formData.ExpenseDate
    ) {
      alert("Please fill all fields.");
      return;
    }

    onSubmit({
      CategoryId: Number(formData.CategoryId),
      Amount: Number(formData.Amount),
      Description: formData.Description.trim(),
      ExpenseDate: formData.ExpenseDate,
    });
  }

  function handleReset() {
    if (expense) {
      setFormData({
        CategoryId: String(expense.CategoryId),
        Amount: String(expense.Amount),
        Description: expense.Description || "",
        ExpenseDate: expense.ExpenseDate
          ? expense.ExpenseDate.split("T")[0]
          : "",
      });
    } else {
      setFormData(emptyForm);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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

      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Expense Date
        </label>

        <input
          type="date"
          name="ExpenseDate"
          value={formData.ExpenseDate}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
        />
      </div>

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
          {expense ? "Update Expense" : "Save Expense"}
        </button>
      </div>
    </form>
  );
}
