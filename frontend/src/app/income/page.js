"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import incomeService from "../../services/incomeService";

import {
  incomeLoading,
  incomeError,
  setIncome,
} from "../../store/slices/incomeSlice";

import PageHeader from "../../components/common/PageHeader";
import SearchIncome from "../../components/income/SearchIncome";
import IncomeTable from "../../components/income/IncomeTable";
import IncomeModal from "../../components/income/IncomeModal";
import IncomeForm from "../../components/income/IncomeForm";

export default function IncomePage() {
  const dispatch = useDispatch();

  const { income, loading, error } = useSelector((state) => state.income);

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);

  useEffect(() => {
    loadIncome();
  }, []);

  async function loadIncome() {
    try {
      dispatch(incomeLoading());

      const response = await incomeService.getIncome();

      dispatch(setIncome(response));
    } catch (error) {
      console.error(error);
      dispatch(incomeError(error.message));
    }
  }

  function openModal() {
    setSelectedIncome(null);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedIncome(null);
    setIsModalOpen(false);
  }

  async function handleSubmit(data) {
    try {
      if (selectedIncome) {
        await incomeService.updateIncome(selectedIncome.IncomeId, data);
      } else {
        await incomeService.createIncome(data);
      }

      await loadIncome();

      closeModal();
    } catch (error) {
      console.error(error);
    }
  }

  function handleEdit(item) {
    setSelectedIncome(item);
    setIsModalOpen(true);
  }

  async function handleDelete(item) {
    try {
      await incomeService.deleteIncome(item.IncomeId);

      await loadIncome();
    } catch (error) {
      console.error(error);
    }
  }

  const filteredIncome = income.filter((item) =>
    item.Description?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-500">Loading Income...</p>
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
        <PageHeader title="Income" description="Track and manage your income" />

        <button
          onClick={openModal}
          className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
        >
          + Add Income
        </button>
      </div>

      {/* Search */}
      <div className="w-full">
        <SearchIncome search={search} setSearch={setSearch} />
      </div>

      {/* Income Table */}
      <div className="w-full overflow-hidden rounded-2xl">
        <IncomeTable
          income={filteredIncome}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Add/Edit Income Modal */}
      <IncomeModal
        isOpen={isModalOpen}
        title={selectedIncome ? "Edit Income" : "Add Income"}
        onClose={closeModal}
      >
        <IncomeForm income={selectedIncome} onSubmit={handleSubmit} />
      </IncomeModal>
    </div>
  );
}
