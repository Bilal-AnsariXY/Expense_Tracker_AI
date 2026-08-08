"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import expenseService from "../../services/expenseService";

import {
  expenseLoading,
  expenseError,
  setExpenses,
} from "../../store/slices/expenseSlice";

import PageHeader from "../../components/common/PageHeader";
import SearchExpense from "../../components/expenses/SearchExpense";
import ExpenseTable from "../../components/expenses/ExpenseTable";
import ExpenseModal from "../../components/expenses/ExpenseModal";
import ExpenseForm from "../../components/expenses/ExpenseForm";

export default function ExpensesPage() {
  const dispatch = useDispatch();

  const { expenses, loading, error } = useSelector((state) => state.expense);

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    try {
      dispatch(expenseLoading());

      const response = await expenseService.getExpenses();

      dispatch(setExpenses(response));
    } catch (error) {
      console.error(error);
      dispatch(expenseError(error.message));
    }
  }

  function openModal() {
    setSelectedExpense(null);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedExpense(null);
    setIsModalOpen(false);
  }

  async function handleSubmit(data) {
    try {
      if (selectedExpense) {
        await expenseService.updateExpense(selectedExpense.ExpenseId, data);
      } else {
        await expenseService.createExpense(data);
      }

      await loadExpenses();

      closeModal();
    } catch (error) {
      console.error(error);
    }
  }

  function handleEdit(expense) {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  }

  async function handleDelete(expense) {
    try {
      await expenseService.deleteExpense(expense.ExpenseId);

      await loadExpenses();
    } catch (error) {
      console.error(error);
    }
  }

  const filteredExpenses = expenses.filter((expense) =>
    expense.Description?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-500">Loading Expenses...</p>
      </div>
    );
  }

  if (error) {
    return <div className="rounded-xl bg-red-50 p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Expenses"
          description="Track and manage your expenses"
        />

        <button
          onClick={openModal}
          className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
        >
          + Add Expense
        </button>
      </div>

      {/* Search */}
      <div className="w-full">
        <SearchExpense search={search} setSearch={setSearch} />
      </div>

      {/* Expense Table */}
      <div className="w-full overflow-hidden rounded-2xl">
        <ExpenseTable
          expenses={filteredExpenses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Add/Edit Expense Modal */}
      <ExpenseModal
        isOpen={isModalOpen}
        title={selectedExpense ? "Edit Expense" : "Add Expense"}
        onClose={closeModal}
      >
        <ExpenseForm expense={selectedExpense} onSubmit={handleSubmit} />
      </ExpenseModal>
    </div>
  );
}
