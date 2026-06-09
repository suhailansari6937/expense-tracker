import { useState } from "react";
import {
  createBudget,
  getBudgetStatus,
  updateBudget,
  deleteBudget,
} from "../../api/budgetApi";
import {
  CalendarDays,
  IndianRupee,
  PiggyBank,
  Search,
  RefreshCcw,
  Trash2,
  Wallet,
  TrendingUp,
} from "lucide-react";

function Budgets() {

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [updateMonth, setUpdateMonth] = useState("");
  const [updateYear, setUpdateYear] = useState("");
  const [updateAmount, setUpdateAmount] = useState("");

  const [deleteMonth, setDeleteMonth] = useState("");
  const [deleteYear, setDeleteYear] = useState("");

  const [createMonth, setCreateMonth] = useState("");
  const [createYear, setCreateYear] = useState("");
  const [amount, setAmount] = useState("");

  const [statusMonth, setStatusMonth] = useState("");
  const [statusYear, setStatusYear] = useState("");

  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  const handleCreateBudget = async (e) => {
    e.preventDefault();

    try {
      await createBudget({
        amount,
        month: createMonth,
        year: createYear,
      });

      setError("");
      alert("Budget created successfully");
    } catch (err) {
      setError("Failed to create budget");
    }
  };

  const handleCheckStatus = async () => {
    try {
      const data = await getBudgetStatus(
        statusMonth,
        statusYear
      );

      setStatus(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch budget status");
    }
  };

  const handleUpdateBudget = async () => {
    try {
      await updateBudget(
        updateMonth,
        updateYear,
        updateAmount
      );

      alert("Budget updated");
    } catch (err) {
      setError("Failed to update budget");
    }
  };

  const handleDeleteBudget = async () => {
    try {
      await deleteBudget(
        deleteMonth,
        deleteYear
      );

      alert("Budget deleted");
    } catch (err) {
      setError("Failed to delete budget");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-black px-4 py-6 sm:px-8">
      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(18px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .fade-up {
            animation: fadeUp 0.45s ease-out both;
          }
        `}
      </style>

      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur fade-up">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/20 text-emerald-300">
                <PiggyBank size={32} />
              </div>

              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-emerald-300">
                Budget Control
              </p>

              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                Budget Management
              </h1>

              <p className="mt-3 max-w-2xl text-slate-300">
                Create, update, check, and remove monthly budgets from one modern dashboard.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-5 py-4 text-white">
              <p className="text-sm text-slate-300">Budget Tools</p>
              <p className="mt-1 text-3xl font-bold">4</p>
            </div>
          </div>
        </div>
        {showDeleteConfirm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
        <Trash2 size={30} />
      </div>

      <h3 className="text-center text-2xl font-bold text-slate-900">
        Delete Budget?
      </h3>

      <p className="mt-3 text-center text-slate-500">
        Are you sure you want to delete this budget? This action cannot be undone.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setShowDeleteConfirm(false)}
          className="rounded-xl border border-slate-200 bg-white p-3 font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={() => {
            handleDeleteBudget();
            setShowDeleteConfirm(false);
          }}
          className="rounded-xl bg-red-600 p-3 font-semibold text-white shadow-lg shadow-red-600/25 transition hover:bg-red-700 active:scale-[0.98]"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-300/40 bg-red-500/10 px-5 py-4 text-red-200 fade-up">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-2xl fade-up">
            <div className="mb-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Wallet size={28} />
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                Create Budget
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Set a monthly spending limit for better financial tracking.
              </p>
            </div>

            <form onSubmit={handleCreateBudget} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Month
                </label>

                <div className="relative">
                  <CalendarDays
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="number"
                    placeholder="Month"
                    value={createMonth}
                    onChange={(e) =>
                      setCreateMonth(e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 pl-11 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Year
                </label>

                <input
                  type="number"
                  placeholder="Year"
                  value={createYear}
                  onChange={(e) =>
                    setCreateYear(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Amount
                </label>

                <div className="relative">
                  <IndianRupee
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 pl-11 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 p-3.5 font-semibold text-white shadow-lg shadow-emerald-600/25 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl active:scale-[0.99]"
              >
                <PiggyBank size={20} />
                Create Budget
              </button>
            </form>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-2xl fade-up">
            <div className="mb-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <Search size={28} />
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                Check Budget Status
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                View budget, spent amount, and remaining balance.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Month
                </label>

                <input
                  type="number"
                  placeholder="Month"
                  value={statusMonth}
                  onChange={(e) =>
                    setStatusMonth(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Year
                </label>

                <input
                  type="number"
                  placeholder="Year"
                  value={statusYear}
                  onChange={(e) =>
                    setStatusYear(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <button
                onClick={handleCheckStatus}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 p-3.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl active:scale-[0.99]"
              >
                <Search size={20} />
                Check Budget Status
              </button>

              {status && (
                <div className="rounded-2xl bg-slate-100 p-5">
                  <div className="mb-4 flex items-center gap-2 text-slate-900">
                    <TrendingUp size={22} />
                    <h3 className="text-xl font-bold">Budget Status</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between rounded-xl bg-white px-4 py-3">
                      <span className="font-medium text-slate-500">Budget</span>
                      <span className="font-bold text-slate-900">
                        ₹{status.budget}
                      </span>
                    </div>

                    <div className="flex justify-between rounded-xl bg-white px-4 py-3">
                      <span className="font-medium text-slate-500">Spent</span>
                      <span className="font-bold text-red-600">
                        ₹{status.spent}
                      </span>
                    </div>

                    <div className="flex justify-between rounded-xl bg-white px-4 py-3">
                      <span className="font-medium text-slate-500">Remaining</span>
                      <span className="font-bold text-emerald-600">
                        ₹{status.remaining}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-2xl fade-up">
            <div className="mb-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                <RefreshCcw size={28} />
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                Update Budget
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Change the budget amount for a selected month and year.
              </p>
            </div>

            <div className="space-y-5">
              <input
                type="number"
                placeholder="Month"
                value={updateMonth}
                onChange={(e) =>
                  setUpdateMonth(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />

              <input
                type="number"
                placeholder="Year"
                value={updateYear}
                onChange={(e) =>
                  setUpdateYear(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />

              <input
                type="number"
                placeholder="New Amount"
                value={updateAmount}
                onChange={(e) =>
                  setUpdateAmount(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />

              <button
                onClick={handleUpdateBudget}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 p-3.5 font-semibold text-white shadow-lg shadow-violet-600/25 transition duration-300 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl active:scale-[0.99]"
              >
                <RefreshCcw size={20} />
                Update Budget
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-2xl fade-up">
            <div className="mb-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                <Trash2 size={28} />
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                Delete Budget
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Remove a budget by selecting its month and year.
              </p>
            </div>

            <div className="space-y-5">
              <input
                type="number"
                placeholder="Month"
                value={deleteMonth}
                onChange={(e) =>
                  setDeleteMonth(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-slate-900 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
              />

              <input
                type="number"
                placeholder="Year"
                value={deleteYear}
                onChange={(e) =>
                  setDeleteYear(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-slate-900 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
              />

              <button
  onClick={() => setShowDeleteConfirm(true)}
  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 p-3.5 font-semibold text-white shadow-lg shadow-red-600/25 transition duration-300 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl active:scale-[0.99]"
>
  <Trash2 size={20} />
  Delete Budget
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budgets;