import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function LoginForm({ userType }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert(`✅ ${userType} logged in successfully!`);
        navigate("/"); // Redirect to a protected route
      } else {
        setError(data.msg || "Something went wrong");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Server not reachable");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{userType} Login</h2>
      <form className="full-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
