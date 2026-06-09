import { useEffect, useState } from "react";
import {
  getMyExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
} from "../../api/expenseApi";
import {
  CalendarDays,
  IndianRupee,
  Pencil,
  PlusCircle,
  ReceiptText,
  Save,
  Tag,
  Trash2,
} from "lucide-react";

function Expenses() {

  const [showDeleteModal, setShowDeleteModal] = useState(false);
 const [expenseToDelete, setExpenseToDelete] = useState(null);
    
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchExpenses = async () => {
    try {
      const data = await getMyExpenses();
      setExpenses(data);
    } catch (err) {
      setError("Failed to load expenses");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

   try {
  if (editingId) {
    await updateExpense(editingId, {
      title,
      amount,
      category,
      expenseDate,
    });

    setEditingId(null);
  } else {
    await createExpense({
      title,
      amount,
      category,
      expenseDate,
    });
  }

  setTitle("");
  setAmount("");
  setCategory("");
  setExpenseDate("");

  fetchExpenses();
} catch (err) {
  setError("Operation failed");
}
  };

  const handleDelete = async (id) => {

  const confirmed = window.confirm(
    "Are you sure you want to delete this expense?"
  );

  if (!confirmed) return;

  try {
    await deleteExpense(id);
    fetchExpenses();
  } catch (err) {
    setError("Failed to delete expense");
  }
};

const confirmDelete = async () => {
  try {
    await deleteExpense(expenseToDelete);

    fetchExpenses();

    setShowDeleteModal(false);
    setExpenseToDelete(null);
  } catch (err) {
    setError("Failed to delete expense");
  }
};
const handleEdit = (expense) => {
  setEditingId(expense.id);

  setTitle(expense.title);
  setAmount(expense.amount);
  setCategory(expense.category);
  setExpenseDate(expense.expenseDate);
};
const handleCancelEdit = () => {
  setEditingId(null);
  setTitle("");
  setAmount("");
  setCategory("");
  setExpenseDate("");
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
                <ReceiptText size={30} />
              </div>

              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-emerald-300">
                Expense Manager
              </p>

              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                My Expenses
              </h1>

              <p className="mt-3 text-slate-300">
                Add, update, and manage your daily spending in one clean place.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-5 py-4 text-white">
              <p className="text-sm text-slate-300">Total Records</p>
              <p className="mt-1 text-3xl font-bold">{expenses.length}</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-300/40 bg-red-500/10 px-5 py-4 text-red-200 fade-up">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-2xl fade-up">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingId ? "Update Expense" : "Add Expense"}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Fill the details below to keep your spending organized.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Title
                </label>

                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 pl-11 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Category
                </label>

                <div className="relative">
                  <Tag
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 pl-11 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Date
                </label>

                <div className="relative">
                  <CalendarDays
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="date"
                    value={expenseDate}
                    onChange={(e) => setExpenseDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 pl-11 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
              </div>

              <div className="space-y-3">
  <button
    type="submit"
    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 p-3.5 font-semibold text-white shadow-lg shadow-emerald-600/25 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30 active:scale-[0.99]"
  >
    {editingId ? <Save size={20} /> : <PlusCircle size={20} />}
    {editingId ? "Save Changes" : "Add Expense"}
  </button>

  {editingId && (
    <button
      type="button"
      onClick={handleCancelEdit}
      className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white p-3.5 font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-[0.99]"
    >
      Cancel
    </button>
  )}
</div>
            </form>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur sm:p-6 fade-up">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Expense List
                </h2>

                <p className="mt-1 text-sm text-slate-300">
                  Recent expenses added by you.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="rounded-2xl bg-white p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {expense.title}
                      </h3>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                          <IndianRupee size={15} />
                          {expense.amount}
                        </span>

                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                          <Tag size={15} />
                          {expense.category}
                        </span>

                        <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-700">
                          <CalendarDays size={15} />
                          {expense.expenseDate}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(expense)}
                        className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 font-semibold text-slate-700 transition hover:bg-blue-100 hover:text-blue-700"
                      >
                        <Pencil size={16} />
                        Update
                      </button>

                      <button
                        onClick={() => {
                          setExpenseToDelete(expense.id);
                          setShowDeleteModal(true);
                          }}
                        className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 font-semibold text-slate-700 transition hover:bg-red-100 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {expenses.length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/10 p-8 text-center text-white">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/20 text-emerald-300">
                    <ReceiptText size={30} />
                  </div>

                  <p className="text-lg font-semibold">
                    No expenses yet
                  </p>

                  <p className="mt-2 text-sm text-slate-300">
                    Add your first expense to see it here.
                  </p>
                </div>
              )}

              {showDeleteModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
      
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
        <Trash2 className="text-red-600" size={28} />
      </div>

      <h2 className="text-2xl font-bold text-slate-800">
        Delete Expense?
      </h2>

      <p className="mt-2 text-slate-500">
        This action cannot be undone. The expense will be permanently removed
        from your records.
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => {
            setShowDeleteModal(false);
            setExpenseToDelete(null);
          }}
          className="rounded-xl border border-slate-200 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          onClick={confirmDelete}
          className="rounded-xl bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expenses;