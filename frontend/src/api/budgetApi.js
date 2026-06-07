import axiosInstance from "./axiosInstance";

export const createBudget = async (budgetData) => {
  const response = await axiosInstance.post(
    "/budget",
    budgetData
  );

  return response.data;
};

export const getBudgetStatus = async (month, year) => {
  const response = await axiosInstance.get(
    `/budget/status?month=${month}&year=${year}`
  );

  return response.data;
};

export const updateBudget = async (
  month,
  year,
  amount
) => {
  const response = await axiosInstance.put(
    `/budget?month=${month}&year=${year}`,
    {
      amount,
    }
  );

  return response.data;
};

export const deleteBudget = async (
  month,
  year
) => {
  const response = await axiosInstance.delete(
    `/budget?month=${month}&year=${year}`
  );

  return response.data;
};