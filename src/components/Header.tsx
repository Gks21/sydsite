"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { bookNav, nav, site } from "@/lib/config";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link className="wordmark" href="/" onClick={() => setOpen(false)}>
          {site.name}
          <span>Beauty lounge</span>
        </Link>
        <nav className="nav" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link className="book-btn" href={bookNav.href}>
            {bookNav.label}
          </Link>
        </nav>
        <button
          className="icon-btn menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <div id="mobile-nav" className={`wrap mobile-panel${open ? " open" : ""}`}>
        {nav.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link className="book-btn" href={bookNav.href} onClick={() => setOpen(false)} style={{ marginTop: "1rem" }}>
          Book
        </Link>
      </div>
    </header>
  );
}
