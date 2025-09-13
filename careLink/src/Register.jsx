import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  return (
    <div className="register-choice-container">
      <h1 className="register-title">Choose Registration Type</h1>
      <div className="register-cards">
        <Link to="/register/doctor" className="register-card">
          <h2>Doctor</h2>
          <p>Register as a verified medical professional</p>
        </Link>
        <Link to="/register/worker" className="register-card">
          <h2>Worker</h2>
          <p>Register to access your digital health card</p>
        </Link>
      </div>
    </div>
  );
}

export default Register;
