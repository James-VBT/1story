import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  href?: string;
  className?: string;
  type?: "button" | "submit";
}

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
  type = "button",
}: ButtonProps) {
  const base =
    "inline-block px-8 py-3 font-semibold text-sm uppercase tracking-wider transition-colors duration-200 text-center";
  const variants = {
    primary: "bg-teal text-white hover:bg-teal-dark",
    outline: "border-2 border-teal text-teal hover:bg-teal hover:text-white",
  };
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
