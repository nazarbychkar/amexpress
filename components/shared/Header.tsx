import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-gray-800 to-gray-700 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-center items-center py-4">
        <Link
          href="/"
          className="text-2xl font-extrabold bg-clip-text text-red-400 tracking-widest hover:scale-105 transition-all"
        >
          AmeXpress
        </Link>
      </div>
    </header>
  );
}
