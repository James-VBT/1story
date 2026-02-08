"use client";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="flex gap-2 justify-center mt-10 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-6 py-2.5 text-sm uppercase tracking-wider font-medium transition-colors duration-200 ${
            activeCategory === cat
              ? "border-b-2 border-teal text-teal"
              : "border-b-2 border-transparent text-gray-medium hover:text-foreground"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
