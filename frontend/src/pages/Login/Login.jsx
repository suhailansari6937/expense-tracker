import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/authApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);

      localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

return (
  <div className="min-h-screen
flex
items-center
justify-center
bg-gradient-to-br
from-red-900
via-slate-800
to-black
"

>
    <div className="border border-gray-200 bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md min-h-[450px]">
    <div className="flex justify-center mb-4">
  <div className="w-18 h-16 rounded-full bg-white-600 flex items-center justify-center text-black text-5xl font-bold">
    ₹
  </div>
</div>
      <h1 className="
      shadow -lg
text-4xl
font-bold
text-center
text-black-600
mb-6
">
  Expense Tracker
</h1>
<p className="text-center text-gray-500 mb-6">
  Track your expenses and budgets effortlessly
</p>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
w-full
border
rounded-lg
p-3
focus:outline-none
focus:ring-1
focus:ring-blue-400
"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          className="
w-full
bg-blue-600
text-white
p-3
rounded-xl
font-semibold
hover:bg-blue-700
transition
duration-300
"
        >
          Login
        </button>

      </form>

      {error && (
        <p className="text-red-500 mt-4">
          {error}
        </p>
      )}

      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:underline"
        >
          Register
        </Link>
      </p>

    </div>
  </div>
);
}

export default Login;