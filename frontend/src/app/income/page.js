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
    item.Description.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return <div className="p-8 text-xl font-semibold">Loading Income...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  return (
    <>
      <div className="space-y-8 p-8">
        <PageHeader
          title="Income"
          subtitle="Manage all your income."
          buttonText="+ Add Income"
          onButtonClick={openModal}
        />

        <SearchIncome search={search} setSearch={setSearch} />

        <IncomeTable
          income={filteredIncome}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <IncomeModal
        isOpen={isModalOpen}
        title={selectedIncome ? "Edit Income" : "Add Income"}
        onClose={closeModal}
      >
        <IncomeForm income={selectedIncome} onSubmit={handleSubmit} />
      </IncomeModal>
    </>
  );
}
