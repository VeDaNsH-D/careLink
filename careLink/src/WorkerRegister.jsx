import { useState } from "react";
import "./Register.css";

function WorkerRegister() {
  const [form, setForm] = useState({
    name: "",
    workerId: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Worker registered:", form);
    alert("Worker registration submitted!");
    // TODO: send to backend
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Worker Registration</h2>
      <form className="full-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="workerId"
          placeholder="Worker ID"
          value={form.workerId}
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default WorkerRegister;
