import React, { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login attempt:", {username, password});

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password})
      })

      if (!response.ok) {
        const data = await response.json();
        if (data.error && data.error === "Invalid username or password") {
          setError("Invalid username or password");
        } else {
          setError("Login failed");
        }
        return;
      }
      const data = await response.json();
      console.log(data);

      setError(""); 
    } catch (e) {
      console.error("Login error:", e);
      setError("An error occurred while trying to log in. Please try again.");
    }

    
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="p-6 bg-white shadow-md rounded w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Logowanie</h2>
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
        
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Zaloguj się
        </button>
      </form>
    </div>
  );
}

export default LoginPage;