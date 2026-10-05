"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileBookBar() {
  const pathname = usePathname();
  if (pathname === "/book") return null;
  return (
    <div className="mobile-book">
      <Link className="book-btn" href="/book">
        Book
      </Link>
    </div>
  );
}
