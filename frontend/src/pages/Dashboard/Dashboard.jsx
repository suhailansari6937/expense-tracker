import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={handleLogout}>
        Logout
      </button>

      <br />
      <br />

      <Link to="/expenses">
        View Expenses
      </Link>
    </div>
  );
}

export default Dashboard;