const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Klucz tajny do podpisywania JWT (w rzeczywistych projektach powinien być przechowywany w .env)
const SECRET_KEY = "mysecretkey";

// Middleware do obsługi danych JSON
app.use(bodyParser.json());

// Ścieżka do pliku JSON z użytkownikami
const USERS_FILE = "./users.json";

// Funkcja pomocnicza: Wczytywanie użytkowników z pliku JSON
const loadUsers = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE, "utf-8");
  return JSON.parse(data);
};

// Funkcja pomocnicza: Zapis użytkowników do pliku JSON
const saveUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Endpoint: Rejestracja użytkownika
app.post("/register", async (req, res) => {
  const {password, username } = req.body;

  // Walidacja danych
  if (!password || !username) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const users = loadUsers();

  // Sprawdź, czy email już istnieje
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ error: "Username already in use" });
  }

  // Hashowanie hasła
  const hashedPassword = await bcrypt.hash(password, 10);

  // Dodaj nowego użytkownika
  const newUser = { id: Date.now(), username, passwordHash: hashedPassword };
  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: "User registered successfully" });
});

// Endpoint: Logowanie użytkownika
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Walidacja danych
  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const users = loadUsers();

  // Znajdź użytkownika po username
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // Porównaj hasło z hash
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid eusername or password" });
  }

  // Generuj token JWT
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });

  res.status(200).json({ token });
});

// Endpoint: Pobranie danych zalogowanego użytkownika
app.get("/user", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Weryfikacja tokena
    const decoded = jwt.verify(token, SECRET_KEY);
    const users = loadUsers();
    const user = users.find((u) => u.id === decoded.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ id: user.id, username: user.username });
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

// Start serwera
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
