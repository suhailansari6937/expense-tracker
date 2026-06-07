import { useEffect, useState } from "react";
import {
  getMyExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
} from "../../api/expenseApi";

function Expenses() {
    
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
  try {
    await deleteExpense(id);

    fetchExpenses();
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

  return (
    <div>
      <h1>My Expenses</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <br />

        <div>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <br />

        <div>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <br />

        <div>
          <input
            type="date"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
          />
        </div>

        <br />

       <button type="submit">
  {editingId ? "Save Changes" : "Add Expense"}
</button>
      </form>

      <hr />

      {error && <p>{error}</p>}

      {expenses.map((expense) => (
        <div key={expense.id}>
          <h3>{expense.title}</h3>

          <p>Amount: {expense.amount}</p>

          <p>Category: {expense.category}</p>

          <p>Date: {expense.expenseDate}</p>

          <button
  onClick={() => handleEdit(expense)}
>
  Update
</button>

{" "}

          <button
  onClick={() => handleDelete(expense.id)}
>
  Delete
</button>

          <hr />
        </div>
      ))}
    </div>
  );
}


export default Expenses;