import moment from "moment";
export function prepareExpenseBarChartData(data = []) {
  console.log(data);
  const chartData = data.map((item) => ({
    month: moment(item?.date).format("DD MMM"),
    category: item?.category,
    amount: item?.amount,
  }));

  return chartData;
}

export const prepareIncomeBarChartData = (data = []) => {
  if (!data) return [];

  const chartData = data.map((item) => ({
    month: moment(item?.date).format("DD MMM"),
    amount: item?.amount,
    source: item?.source,
  }));

  return chartData;
};
