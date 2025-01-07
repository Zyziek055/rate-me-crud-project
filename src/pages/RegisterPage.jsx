import React, { useState } from "react";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Sprawdzenie, czy hasła się zgadzają
    if (password !== passwordRepeat) {
      setError("Hasła się nie zgadzają");
      return; // Zatrzymujemy dalsze przetwarzanie formularza
    }
    
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        if (data.error && data.error === "Username already in use") {
          setError("Username already in use");
        } else {
          setError("Registration failed");
        }
        return;
      }
      
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.error("Registration error:", e);
    }
  
    console.log("Register attempt:", { username, password });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="p-6 bg-white shadow-md rounded w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Rejestracja</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Nazwa użytkownika</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Hasło</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Powtórz Haslo</label>
          <input
            type="password"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Zarejestruj sie
        </button>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage;