import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "./db.js";

const app = express();
const PORT = 5000;
const JWT_SECRET = "your_jwt_secret"; // It's recommended to move this to an environment variable

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Doctor Registration
app.post("/api/register/doctor", async (req, res) => {
  const {
    doctor_name,
    email,
    password,
    phone_number,
    address,
    specialization,
    bachelor_degree,
    master_degree,
    fellowship,
    experience,
  } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newDoctor = await pool.query(
      "INSERT INTO doctors (doctor_name, email, password, phone_number, address, specialization, bachelor_degree, master_degree, fellowship, experience) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        doctor_name,
        email,
        hashedPassword,
        phone_number,
        address,
        specialization,
        bachelor_degree,
        master_degree,
        fellowship,
        experience,
      ]
    );

    res.status(201).json(newDoctor.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Worker Registration
app.post("/api/register/worker", async (req, res) => {
  const { worker_name, email, password, phone_number, address, occupation } =
    req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newWorker = await pool.query(
      "INSERT INTO workers (worker_name, email, password, phone_number, address, occupation) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [worker_name, email, hashedPassword, phone_number, address, occupation]
    );

    res.status(201).json(newWorker.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check in doctors table
    let user = await pool.query("SELECT * FROM doctors WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      // Check in workers table
      user = await pool.query("SELECT * FROM workers WHERE email = $1", [
        email,
      ]);
      if (user.rows.length === 0) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.rows[0].doctor_id || user.rows[0].worker_id,
        role: user.rows[0].doctor_id ? "doctor" : "worker",
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
