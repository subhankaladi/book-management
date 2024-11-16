"use client";

import { useState } from "react";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newBook = { title, year: parseInt(year) };

    const response = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });

    if (response.ok) {
      alert("Book added successfully!");
      setTitle("");
      setYear("");
    } else {
      alert("Failed to add book!");
    }
  };

  return (
    <main>
      <h1>Add a New Book</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
            required
          />
        </label>
        <label>
          Year:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Enter year"
            required
          />
        </label>
        <button type="submit">Add Book</button>
      </form>
    </main>
  );
}
