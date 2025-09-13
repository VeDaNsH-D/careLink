import { useState } from "react";
import "./Register.css";

function DoctorRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    license: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Doctor registered:", form);
    alert("Doctor registration submitted!");
    // TODO: send to backend
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Doctor Registration</h2>
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
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="license"
          placeholder="License Number"
          value={form.license}
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

export default DoctorRegister;
