import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Books Management",
  description: "Manage your books easily",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <Link href="/">Home</Link> | <Link href="/add-book">Add Book</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
