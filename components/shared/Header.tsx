import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md bg-white/80 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-center items-center py-3">
        <Link
          href="/"
          className="flex items-center hover:scale-105 transition-all"
        >
          <Image
            src="/logo1199.svg"
            alt="AmeXpress"
            width={180}
            height={60}
            className="h-12 w-auto"
            priority
          />
        </Link>
      </div>
    </header>
  );
}
