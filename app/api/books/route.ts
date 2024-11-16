import { NextResponse } from "next/server";

type Book = {
  title: string;
  year: number;
};

let books: Book[] = [
  { title: "Rich Dad And Poor Dad", year: 1997 },
  { title: "Think and Grow Rich", year: 1973 },
  { title: "Dark Psychology", year: 2019 },
];

export async function GET() {
  return NextResponse.json(books);
}

export async function POST(request: Request) {
  const newBook: Book = await request.json();
  books.push(newBook);
  return NextResponse.json({ message: "Book added successfully!", books });
}

export async function DELETE(request: Request) {
  const { title } = await request.json();
  books = books.filter((book) => book.title !== title); 
  return NextResponse.json({ message: "Book deleted successfully!", books });
}

export async function PUT(request: Request) {
  const { oldTitle, updatedBook } = await request.json();
  books = books.map((book) =>
    book.title === oldTitle ? updatedBook : book
  );
  return NextResponse.json({ message: "Book updated successfully!", books });
}
