import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-700 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-center items-center py-4">
        <Link
          href="/"
          className="text-2xl font-bold text-red-400 tracking-wide hover:text-red-600 transition-colors"
        >
          Amexpress
        </Link>
      </div>
    </header>
  );
}
