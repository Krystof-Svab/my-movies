import "./globals.css";

export const metadata = {
  title: "Knihovna filmu",
  description: "Next.js aplikace pro spravu filmu v Supabase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
