interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: "center" | "left";
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  alignment = "center",
  light = false,
}: SectionHeadingProps) {
  const align = alignment === "center" ? "text-center" : "text-left";
  const titleColor = light ? "text-white" : "text-foreground";
  const subtitleColor = light ? "text-white/70" : "text-gray-medium";

  return (
    <div className={align}>
      <h2
        className={`font-heading uppercase tracking-[0.2em] text-2xl md:text-3xl font-extrabold ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`${subtitleColor} mt-4 text-lg max-w-2xl ${alignment === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
