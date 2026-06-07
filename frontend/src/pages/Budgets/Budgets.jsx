import { useState } from "react";
import {
  createBudget,
  getBudgetStatus,
  updateBudget,
  deleteBudget,
} from "../../api/budgetApi";

function Budgets() {
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
    <div>
      <h1>Budget Management</h1>

      <h2>Create Budget</h2>

      <form onSubmit={handleCreateBudget}>
        <div>
          <input
            type="number"
            placeholder="Month"
            value={createMonth}
            onChange={(e) =>
              setCreateMonth(e.target.value)
            }
          />
        </div>

        <br />

        <div>
          <input
            type="number"
            placeholder="Year"
            value={createYear}
            onChange={(e) =>
              setCreateYear(e.target.value)
            }
          />
        </div>

        <br />

        <div>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />
        </div>

        <br />

        <button type="submit">
          Create Budget
        </button>
      </form>

      <hr />

      <h2>Check Budget Status</h2>

      <div>
        <input
          type="number"
          placeholder="Month"
          value={statusMonth}
          onChange={(e) =>
            setStatusMonth(e.target.value)
          }
        />
      </div>

      <br />

      <div>
        <input
          type="number"
          placeholder="Year"
          value={statusYear}
          onChange={(e) =>
            setStatusYear(e.target.value)
          }
        />
      </div>

      <br />

      <button onClick={handleCheckStatus}>
        Check Budget Status
      </button>

      <br />
      <br />

      {error && <p>{error}</p>}

      {status && (
        <div>
          <h3>Budget Status</h3>

          <p>Budget: {status.budget}</p>

          <p>Spent: {status.spent}</p>

          <p>Remaining: {status.remaining}</p>
        </div>
      )}

  <hr />

<h2>Update Budget</h2>

<input
  type="number"
  placeholder="Month"
  value={updateMonth}
  onChange={(e) =>
    setUpdateMonth(e.target.value)
  }
/>

<br /><br />

<input
  type="number"
  placeholder="Year"
  value={updateYear}
  onChange={(e) =>
    setUpdateYear(e.target.value)
  }
/>

<br /><br />

<input
  type="number"
  placeholder="New Amount"
  value={updateAmount}
  onChange={(e) =>
    setUpdateAmount(e.target.value)
  }
/>

<br /><br />

<button onClick={handleUpdateBudget}>
  Update Budget
</button>

<hr />

<h2>Delete Budget</h2>

<input
  type="number"
  placeholder="Month"
  value={deleteMonth}
  onChange={(e) =>
    setDeleteMonth(e.target.value)
  }
/>

<br /><br />

<input
  type="number"
  placeholder="Year"
  value={deleteYear}
  onChange={(e) =>
    setDeleteYear(e.target.value)
  }
/>

<br /><br />

<button onClick={handleDeleteBudget}>
  Delete Budget
</button>
    </div>
  );
}

export default Budgets;