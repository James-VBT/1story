"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";

interface HeaderProps {
  navigation: { label: string; href: string }[];
  siteTitle: string;
  siteTagline: string;
}

export default function Header({ navigation, siteTitle, siteTagline }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-heading uppercase tracking-[0.15em] text-lg font-extrabold text-foreground block leading-tight">
              {siteTitle}
            </span>
            <span className="text-xs text-gray-medium tracking-wider uppercase">
              {siteTagline}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm uppercase tracking-wider font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-teal"
                    : "text-gray-dark hover:text-teal"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <HiOutlineXMark size={24} />
            ) : (
              <HiOutlineBars3 size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {navigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 px-4 text-sm uppercase tracking-wider font-medium transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-teal bg-teal-light"
                  : "text-gray-dark hover:text-teal hover:bg-gray-light"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
