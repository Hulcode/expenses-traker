import DashBoardLayout from "../../componants/layouts/DashBoardLayout";
import ExpenseOverview from "../../componants/expense/ExpenseOverview";
import { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/getUserInfo";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/paths";
import Modal from "../../componants/Modal";
import AddExpenseForm from "../../componants/expense/AddExpenseForm";
import { toast } from "react-hot-toast";
import ExpenseList from "../../componants/expense/ExpenseList";
import DeleteAlert from "../../componants/DeleteAlert";

const Expenses = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  useUserAuth();

  async function fetchExpenseData() {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSE,
      );
      if (response.data) {
        setExpenseData(response.data);
        console.log(response);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteExpense(id) {
    if (loading) return;
    setLoading(true);
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseData();
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddExpense(expenseData) {
    const { icon, category, amount, date } = expenseData;

    if (!category) {
      toast.error("Please enter a category");
      return;
    }
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        icon,
        category,
        amount,
        date,
      });
      if (response.data) {
        toast.success("Expense added successfully");
        setOpenAddExpenseModal(false);
        fetchExpenseData();
      }
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDownloadExpenseExcel() {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        { responseType: "blob" },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error("Failed to download income details. Please try again");
    }
  }

  useEffect(() => {
    fetchExpenseData();
    return () => {};
  }, []);

  return (
    <DashBoardLayout activeMenu="Expense">
      <div className="my-auto mx-5">
        <div className="grid-cols-1 gap-6 grid">
          <div>
            <ExpenseOverview
              transaction={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>
          <ExpenseList
            transaction={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseExcel}
          />
        </div>

        <Modal
          title="Add Expense"
          onClose={() => setOpenAddExpenseModal(false)}
          isOpen={openAddExpenseModal}
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          title="Delete Expense"
          onClose={() => setOpenDeleteAlert({ data: null, show: false })}
          isOpen={openDeleteAlert.show}
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense?"
            onDelete={() => handleDeleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashBoardLayout>
  );
};

export default Expenses;
