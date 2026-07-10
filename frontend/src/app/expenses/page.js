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
    expense.Description.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return <div className="p-8 text-xl font-semibold">Loading Expenses...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  return (
    <>
      <div className="space-y-8 p-8">
        <PageHeader
          title="Expenses"
          subtitle="Manage all your expenses."
          buttonText="+ Add Expense"
          onButtonClick={openModal}
        />

        <SearchExpense search={search} setSearch={setSearch} />

        <ExpenseTable
          expenses={filteredExpenses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <ExpenseModal
        isOpen={isModalOpen}
        title={selectedExpense ? "Edit Expense" : "Add Expense"}
        onClose={closeModal}
      >
        <ExpenseForm expense={selectedExpense} onSubmit={handleSubmit} />
      </ExpenseModal>
    </>
  );
}
