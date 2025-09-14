import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 5000;
const JWT_SECRET = "your_jwt_secret_for_prototype"; // This is for prototyping only

// In-memory "database"
let doctors = [];
let workers = [];
let userIdCounter = 1;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running in prototype mode 🚀");
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
    // Check if user already exists
    if (doctors.find((d) => d.email === email) || workers.find((w) => w.email === email)) {
      return res.status(400).json({ msg: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newDoctor = {
      doctor_id: userIdCounter++,
      doctor_name,
      email,
      password: hashedPassword,
      phone_number,
      address,
      specialization,
      bachelor_degree,
      master_degree,
      fellowship,
      experience,
      created_at: new Date().toISOString(),
    };

    doctors.push(newDoctor);
    console.log("Doctors:", doctors);
    res.status(201).json(newDoctor);
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
    // Check if user already exists
    if (doctors.find((d) => d.email === email) || workers.find((w) => w.email === email)) {
        return res.status(400).json({ msg: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newWorker = {
      worker_id: userIdCounter++,
      worker_name,
      email,
      password: hashedPassword,
      phone_number,
      address,
      occupation,
      created_at: new Date().toISOString(),
    };

    workers.push(newWorker);
    console.log("Workers:", workers);
    res.status(201).json(newWorker);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = doctors.find((d) => d.email === email);
    let userType = "doctor";

    if (!user) {
      user = workers.find((w) => w.email === email);
      userType = "worker";
    }

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.doctor_id || user.worker_id,
        role: userType,
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
  console.log(`Server running in prototype mode on http://localhost:${PORT}`);
});
