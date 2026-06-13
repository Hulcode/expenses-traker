import { useEffect, useState } from "react";

import DashBoardLayout from "../../componants/layouts/DashBoardLayout";
import { useUserAuth } from "../../hooks/getUserInfo";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/paths";
import { IoMdCard } from "react-icons/io";
import { LuHandCoins } from "react-icons/lu";
import { IoMdWallet } from "react-icons/io";
import InfoCard from "../../componants/cards/InfoCard";
import RecentTransactions from "../../componants/cards/RecentTransactions";
import FinanceOverview from "../../componants/cards/FinanceOverview";
import ExpenseTransaction from "../../componants/cards/ExpenseTransaction";
import Last30DaysExpenses from "../../componants/cards/Last30DaysExpenses";
import RecentIncomeWithChart from "../../componants/cards/RecentIncomeWithChart";
import RecentIncome from "../../componants/cards/RecentIncome";
function Home() {
  useUserAuth();
  const navigate = useNavigate();

  const [dashBoardDate, setDashBoardDate] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchDashBoardDate() {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashBoardDate(response.data);
      }
    } catch (err) {
      console.log("Something went wrong. Please try again", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashBoardDate();
    return () => {};
  }, []);

  return (
    <DashBoardLayout activeMenu="Dashboard">
      <div className="mx-auto my-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={new Intl.NumberFormat("en-US").format(
              dashBoardDate?.totalBalance || 0,
            )}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Income"
            value={new Intl.NumberFormat("en-US").format(
              dashBoardDate?.totalIncome || 0,
            )}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<IoMdWallet />}
            label="Total Expense"
            value={new Intl.NumberFormat("en-US").format(
              dashBoardDate?.totalExpenses || 0,
            )}
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            RecentTransactions={dashBoardDate?.recentTransactions}
            onSeeMore={() => {
              navigate("/expense");
            }}
          ></RecentTransactions>

          <FinanceOverview
            totalBalance={dashBoardDate?.totalBalance}
            totalIncome={dashBoardDate?.totalIncome}
            totalExpense={dashBoardDate?.totalExpenses}
          ></FinanceOverview>

          <ExpenseTransaction
            transactions={dashBoardDate?.ExpenceLast30Days?.transactions}
            onSeeMore={() => {
              navigate("/expense");
            }}
          />

          <Last30DaysExpenses
            data={dashBoardDate?.ExpenceLast30Days?.transactions}
          />

          <RecentIncomeWithChart
            data={
              dashBoardDate?.IncomeLast60Days?.transactions?.slice(0, 4) || []
            }
            totalIncome={dashBoardDate?.IncomeLast60Days?.total || 0}
          />
          <RecentIncome
            transactions={dashBoardDate?.IncomeLast60Days?.transactions}
            onSeeMore={() => {
              navigate("/income");
            }}
          />
        </div>
      </div>
    </DashBoardLayout>
  );
}

export default Home;
