import DashBoardLayout from "../../componants/layouts/DashBoardLayout";
import IncomeOverview from "../../componants/income/IncomeOverview";
import { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/getUserInfo";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/paths";
import Modal from "../../componants/Modal";
import AddIncomeForm from "../../componants/income/addIncomeForm";
import { toast } from "react-hot-toast";
import IncomeList from "../../componants/income/IncomeList";
import DeleteAlert from "../../componants/DeleteAlert";
const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  useUserAuth();
  async function fetchIncomeData() {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) {
        setIncomeData(response.data.incomes);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  }
  async function handleDeleteIncome(id) {
    if (loading) return;

    setLoading(true);
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({ show: false, data: null }); // 👈 close modal after delete
      toast.success("Income deleted successfully"); // 👈 feedback
      fetchIncomeData();
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  }
  async function handleAddIncome(incomeData) {
    const { icon, source, amount, date } = incomeData;

    if (!source) {
      toast.error("Please enter a source");
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
      const response = await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        icon,
        source,
        amount,
        date,
      });
      if (response.data) {
        toast.success("Income added successfully");
        setOpenAddIncomeModel(false); // ← close modal
        fetchIncomeData();
      }
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  }
  async function handleDownloadIncomeExcel() {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
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
    fetchIncomeData();
    return () => {};
  }, []);

  return (
    <DashBoardLayout activeMenu="Income">
      <div className="my-auto mx-5">
        <div className="grid-cols-1 gap-6  grid">
          <div>
            <IncomeOverview
              transaction={incomeData}
              onAddIncome={() => {
                setOpenAddIncomeModel(true);
              }}
            />
          </div>
          <IncomeList
            transaction={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncomeExcel}
          />
        </div>
        <Modal
          title="Add Income"
          onClose={() => setOpenAddIncomeModel(false)}
          isOpen={openAddIncomeModel}
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          title="Delete Income"
          onClose={() => setOpenDeleteAlert({ data: null, show: false })}
          isOpen={openDeleteAlert.show}
        >
          <DeleteAlert
            content="Are you sure you want to delete this income"
            onDelete={() => {
              handleDeleteIncome(openDeleteAlert.data);
            }}
          />
        </Modal>
      </div>
    </DashBoardLayout>
  );
};

export default Income;
