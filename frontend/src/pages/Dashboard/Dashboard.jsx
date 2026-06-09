import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExpenseSummary } from "../../api/expenseApi";
import { getBudgetStatus } from "../../api/budgetApi";
import {
  Wallet,
  ReceiptText,
  PiggyBank,
  TrendingUp,
  LogOut,
  ArrowRight,
  IndianRupee,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const [budgetStatus, setBudgetStatus] = useState(null);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const currentDate = new Date();

  const monthName =
    currentDate.toLocaleString(
      "default",
      { month: "long" }
    );

  const currentYear =
    currentDate.getFullYear();

  useEffect(() => {
    const fetchDashboardData = async () => {

      try {
        const data =
          await getExpenseSummary();

        setSummary(data);
      } catch (err) {
        setError("Failed to load expense summary");
      }

      try {
        const currentDate = new Date();

        const month =
          currentDate.getMonth() + 1;

        const year =
          currentDate.getFullYear();

        const budgetData =
          await getBudgetStatus(
            month,
            year
          );

        setBudgetStatus(budgetData);

      } catch (err) {
        console.log(
          "No budget found for current month"
        );
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-black px-4 py-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between lg:p-8">
            <div>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/20 text-emerald-300">
                <TrendingUp size={30} />
              </div>

              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-emerald-300">
                Expense Tracker
              </p>

              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                Dashboard
              </h1>

              <p className="mt-3 max-w-xl text-slate-300">
                Your financial overview for {monthName} {currentYear}
              </p>
            </div>

            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <img
                src="/dashboard-illustration.png"
                alt="Dashboard illustration"
                className="hidden w-48 object-contain md:block lg:w-60"
              />

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white px-5 py-3 font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100 active:scale-[0.98]"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-300/40 bg-red-500/10 px-5 py-4 text-red-200">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {summary && (
            <>
              <div className="rounded-3xl border border-white/10 bg-white p-6 shadow-xl">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <IndianRupee size={28} />
                </div>

                <h3 className="text-lg font-semibold text-slate-500">
                  Total Amount
                </h3>

                <p className="mt-3 text-4xl font-bold text-slate-900">
                  ₹{summary.totalAmount}
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  Total money spent across your expenses.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white p-6 shadow-xl">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <ReceiptText size={28} />
                </div>

                <h3 className="text-lg font-semibold text-slate-500">
                  Total Expenses
                </h3>

                <p className="mt-3 text-4xl font-bold text-slate-900">
                  {summary.totalExpenses}
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  Number of expense records added.
                </p>
              </div>
            </>
          )}

          <div className="rounded-3xl border border-white/10 bg-white p-6 shadow-xl lg:col-span-1">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Budget Status
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {monthName} {currentYear}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                <PiggyBank size={28} />
              </div>
            </div>

            {budgetStatus ? (
              <div className="space-y-5">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-500">Budget</span>
                    <span className="font-bold text-slate-900">
                      ₹{budgetStatus.budget}
                    </span>
                  </div>

                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-500">Spent</span>
                    <span className="font-bold text-red-600">
                      ₹{budgetStatus.spent}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-500">Remaining</span>
                    <span className="font-bold text-emerald-600">
                      ₹{budgetStatus.remaining}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-100 p-4">
                  <p className="text-sm font-medium text-slate-500">
                    Available Balance
                  </p>

                  <p className="mt-2 text-3xl font-bold text-emerald-600">
                    ₹{budgetStatus.remaining}
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-slate-100 p-5 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                  <Wallet size={26} />
                </div>

                <p className="font-semibold text-slate-700">
                  No budget set for current month
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Create a budget to track monthly spending.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            to="/expenses"
            className="group rounded-3xl border border-white/10 bg-white/10 p-6 text-white shadow-xl backdrop-blur transition hover:bg-white/15 hover:shadow-2xl"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/20 text-emerald-300">
              <ReceiptText size={26} />
            </div>

            <p className="text-sm font-medium uppercase tracking-wider text-emerald-300">
              Manage
            </p>

            <h3 className="mt-2 flex items-center gap-2 text-2xl font-bold">
              View Expenses
              <ArrowRight
                size={22}
                className="transition group-hover:translate-x-1"
              />
            </h3>

            <p className="mt-2 text-slate-300">
              Add, review, and organize all your expenses.
            </p>
          </Link>

          <Link
            to="/budgets"
            className="group rounded-3xl border border-white/10 bg-white/10 p-6 text-white shadow-xl backdrop-blur transition hover:bg-white/15 hover:shadow-2xl"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-400/20 text-violet-300">
              <PiggyBank size={26} />
            </div>

            <p className="text-sm font-medium uppercase tracking-wider text-emerald-300">
              Plan
            </p>

            <h3 className="mt-2 flex items-center gap-2 text-2xl font-bold">
              View Budgets
              <ArrowRight
                size={22}
                className="transition group-hover:translate-x-1"
              />
            </h3>

            <p className="mt-2 text-slate-300">
              Set limits and monitor your monthly budget.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;