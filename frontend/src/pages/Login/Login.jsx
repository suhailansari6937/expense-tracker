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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-emerald-950 to-black px-4 py-8">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl grid md:grid-cols-2">
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-950 p-10 text-white">
          <div>
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-4xl font-bold backdrop-blur">
              ₹
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Expense Tracker
            </h1>

            <p className="mt-4 text-lg text-emerald-50">
              Track spending, manage budgets, and stay in control of your money.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <p className="text-2xl font-bold">Smart</p>
              <p className="text-sm text-emerald-50">Budget insights</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <p className="text-2xl font-bold">Fast</p>
              <p className="text-sm text-emerald-50">Expense tracking</p>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="mb-8 text-center md:text-left">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-4xl font-bold text-emerald-700 md:hidden">
              ₹
            </div>

            <h2 className="text-3xl font-bold text-slate-900">
              Welcome back
            </h2>

            <p className="mt-2 text-slate-500">
              Login to continue managing your expenses.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email address
              </label>

              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            {error && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 p-3.5 font-semibold text-white shadow-lg shadow-emerald-600/25 transition duration-300 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30 active:scale-[0.99]"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;