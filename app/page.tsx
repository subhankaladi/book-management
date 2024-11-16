
'use client'
import { useEffect, useState } from "react";

type Book = {
  title: string;
  year: number;
};

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Book>({ title: "", year: 0 });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentBook, setCurrentBook] = useState<string>("");

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data: Book[]) => setBooks(data));
  }, []);

  const handleAddBook = async () => {
    const response = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });

    const result = await response.json();
    setBooks(result.books); 
    setNewBook({ title: "", year: 0 }); 
  };

  const handleDeleteBook = async (title: string) => {
    const response = await fetch("/api/books", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    const result = await response.json();
    setBooks(result.books); 
  };

  const handleUpdateBook = async () => {
    const response = await fetch("/api/books", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldTitle: currentBook, updatedBook: newBook }),
    });

    const result = await response.json();
    setBooks(result.books); 
    setEditMode(false); 
    setNewBook({ title: "", year: 0 }); 
  };

  
  const enterEditMode = (book: Book) => {
    setEditMode(true);
    setCurrentBook(book.title); 
    setNewBook(book); 
  };

  return (
    <main>
      <h1>Kaladi Books Management</h1>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <div>
              {book.title} ({book.year})
            </div>
            <div>
              <button onClick={() => enterEditMode(book)}>Update</button>
              <button onClick={() => handleDeleteBook(book.title)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <h2>{editMode ? "Update Book" : "Add a New Book"}</h2>
      <input
        type="text"
        placeholder="Title"
        value={newBook.title}
        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
      />
      <input
        type="number"
        placeholder="Year"
        value={newBook.year}
        onChange={(e) => setNewBook({ ...newBook, year: Number(e.target.value) })}
      />
      <button onClick={editMode ? handleUpdateBook : handleAddBook}>
        {editMode ? "Update Book" : "Add Book"}
      </button>
    </main>
  );
}
