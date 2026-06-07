import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExpenseSummary } from "../../api/expenseApi";
import { getBudgetStatus } from "../../api/budgetApi";
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
    <div>
      <h1>Dashboard</h1>

      {error && <p>{error}</p>}

{summary && (
  <div>
    <h3>Expense Summary</h3>

    <p>
      Total Expenses: {summary.totalExpenses}
    </p>

    <p>
      Total Amount: {summary.totalAmount}
    </p>
  </div>
)}
{budgetStatus ? (
  <div>
   <h3>
  Budget Status ({monthName} {currentYear})
</h3>

    <p>Budget: {budgetStatus.budget}</p>

    <p>Spent: {budgetStatus.spent}</p>

    <p>Remaining: {budgetStatus.remaining}</p>
  </div>
) : (
  <p>No budget set for current month</p>
)}


      <button onClick={handleLogout}>
        Logout
      </button>

      <br />
      <br />

      <Link to="/expenses">
        View Expenses
      </Link>
<br />
<br />
      
      <Link to="/budgets">
  View Budgets
</Link>
    </div>
  );
}

export default Dashboard;