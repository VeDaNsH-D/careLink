import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function DoctorRegister() {
  const [form, setForm] = useState({
    doctor_name: "",
    email: "",
    password: "",
    phone_number: "",
    address: "",
    specialization: "",
    bachelor_degree: "",
    master_degree: "",
    fellowship: "",
    experience: "",
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
      const res = await axios.post(
        "http://localhost:5000/api/register/doctor",
        form
      );
      if (res.status === 201) {
        alert("Doctor registered successfully!");
        navigate("/login/doctor");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Doctor Registration</h2>
      <form className="full-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="doctor_name"
          placeholder="Full Name"
          value={form.doctor_name}
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
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={form.phone_number}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={form.specialization}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bachelor_degree"
          placeholder="Bachelor's Degree"
          value={form.bachelor_degree}
          onChange={handleChange}
        />
        <input
          type="text"
          name="master_degree"
          placeholder="Master's Degree"
          value={form.master_degree}
          onChange={handleChange}
        />
        <input
          type="text"
          name="fellowship"
          placeholder="Fellowship"
          value={form.fellowship}
          onChange={handleChange}
        />
        <input
          type="number"
          name="experience"
          placeholder="Years of Experience"
          value={form.experience}
          onChange={handleChange}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default DoctorRegister;
